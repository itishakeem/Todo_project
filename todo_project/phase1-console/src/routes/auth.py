"""
Authentication API Routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from src.database import get_session
from src.models import User, UserCreate, UserResponse, LoginRequest, AuthResponse
from src.auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["authentication"])


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, session: Session = Depends(get_session)):
    """
    Register a new user

    - Creates a new user account
    - Hashes the password
    - Returns JWT token and user info
    """
    # Check if user already exists
    statement = select(User).where(User.email == user_data.email)
    existing_user = session.exec(statement).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    hashed_password = hash_password(user_data.password)
    new_user = User(
        email=user_data.email,
        password_hash=hashed_password,
        first_name=user_data.first_name,
        last_name=user_data.last_name
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    # Generate JWT token
    access_token = create_access_token(new_user.id, new_user.email)

    return AuthResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=new_user.id,
            email=new_user.email,
            first_name=new_user.first_name,
            last_name=new_user.last_name,
            created_at=new_user.created_at
        )
    )


@router.post("/login", response_model=AuthResponse)
async def login(login_data: LoginRequest, session: Session = Depends(get_session)):
    """
    Login user

    - Validates email and password
    - Returns JWT token and user info
    """
    # Find user by email
    statement = select(User).where(User.email == login_data.email)
    user = session.exec(statement).first()

    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Generate JWT token
    access_token = create_access_token(user.id, user.email)

    return AuthResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=user.id,
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            created_at=user.created_at
        )
    )


@router.post("/logout")
async def logout(user: User = Depends(get_current_user)):
    """
    Logout user

    Note: With JWT, logout is primarily handled client-side by removing the token.
    This endpoint is provided for consistency with the API spec.
    """
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(user: User = Depends(get_current_user)):
    """
    Get current authenticated user information

    Requires valid JWT token in Authorization header
    """
    return UserResponse(
        id=user.id,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        created_at=user.created_at
    )
