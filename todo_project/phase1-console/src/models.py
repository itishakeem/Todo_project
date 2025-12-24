"""
Database Models using SQLModel
"""
from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship, Column, JSON


class User(SQLModel, table=True):
    """User model for authentication and task ownership"""
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    password_hash: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to tasks
    tasks: List["Task"] = Relationship(back_populates="user")


class Task(SQLModel, table=True):
    """Task model for todo items"""
    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", index=True)
    title: str
    description: Optional[str] = None
    status: str = Field(default="pending")  # "pending" | "completed"
    priority: str = Field(default="medium")  # "high" | "medium" | "low"
    tags: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    due_date: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to user
    user: Optional[User] = Relationship(back_populates="tasks")


# Pydantic models for API requests/responses

class UserCreate(SQLModel):
    """User registration request"""
    email: str
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class UserResponse(SQLModel):
    """User response (without password)"""
    id: int
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    created_at: datetime


class TaskCreate(SQLModel):
    """Task creation request"""
    title: str
    description: Optional[str] = None
    priority: Optional[str] = "medium"
    tags: Optional[List[str]] = []
    due_date: Optional[datetime] = None


class TaskUpdate(SQLModel):
    """Task update request"""
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    tags: Optional[List[str]] = None
    due_date: Optional[datetime] = None
    status: Optional[str] = None


class TaskResponse(SQLModel):
    """Task response"""
    id: int
    user_id: int
    title: str
    description: Optional[str]
    status: str
    priority: str
    tags: List[str]
    due_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime


class LoginRequest(SQLModel):
    """Login request"""
    email: str
    password: str


class AuthResponse(SQLModel):
    """Authentication response with JWT token"""
    access_token: str
    token_type: str
    user: UserResponse
