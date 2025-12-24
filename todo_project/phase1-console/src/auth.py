"""
Authentication and JWT Token Management
"""
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials
from sqlmodel import Session, select
from src.config import settings
from src.models import User
from src.database import get_session

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# HTTP Bearer token scheme
security = HTTPBearer()


def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(user_id: int, email: str) -> str:
    """
    Create JWT access token

    Token payload includes:
    - sub: user_id (subject)
    - email: user email
    - exp: expiration timestamp
    """
    expires_delta = timedelta(minutes=settings.jwt_expiration_minutes)
    expire = datetime.utcnow() + expires_delta

    to_encode = {
        "sub": str(user_id),
        "email": email,
        "exp": expire,
    }

    encoded_jwt = jwt.encode(
        to_encode,
        settings.better_auth_secret,
        algorithm=settings.jwt_algorithm
    )

    return encoded_jwt


def decode_token(token: str) -> dict:
    """
    Decode and verify JWT token

    Returns:
        dict with user_id and email

    Raises:
        HTTPException if token is invalid or expired
    """
    try:
        payload = jwt.decode(
            token,
            settings.better_auth_secret,
            algorithms=[settings.jwt_algorithm]
        )
        user_id: str = payload.get("sub")
        email: str = payload.get("email")

        if user_id is None or email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return {"user_id": int(user_id), "email": email}

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: Session = Depends(get_session)
) -> User:
    """
    Dependency to get current authenticated user from JWT token

    Extracts token from Authorization header, verifies it,
    and returns the user object from database.

    Use this as a dependency in protected routes:
    @app.get("/api/protected")
    async def protected_route(user: User = Depends(get_current_user)):
        ...
    """
    token = credentials.credentials
    token_data = decode_token(token)

    # Get user from database
    user = session.get(User, token_data["user_id"])

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user


def verify_user_access(user: User, resource_user_id: int):
    """
    Verify that the authenticated user has access to the resource

    Args:
        user: Authenticated user from JWT token
        resource_user_id: User ID from URL parameter

    Raises:
        HTTPException 403 if user IDs don't match
    """
    if user.id != resource_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: You can only access your own resources"
        )
