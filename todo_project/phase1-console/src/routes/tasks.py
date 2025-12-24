"""
Task CRUD API Routes
"""
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select
from src.database import get_session
from src.models import Task, TaskCreate, TaskUpdate, TaskResponse, User
from src.auth import get_current_user, verify_user_access

router = APIRouter(prefix="/api", tags=["tasks"])


@router.get("/{user_id}/tasks", response_model=List[TaskResponse])
async def get_tasks(
    user_id: int,
    status_filter: Optional[str] = Query(None, alias="status"),
    priority_filter: Optional[str] = Query(None, alias="priority"),
    tag_filter: Optional[str] = Query(None, alias="tag"),
    limit: Optional[int] = Query(100, ge=1, le=1000),
    offset: Optional[int] = Query(0, ge=0),
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get all tasks for the authenticated user

    Supports filtering by:
    - status: "pending" or "completed"
    - priority: "high", "medium", or "low"
    - tag: filter by tag name
    - limit: max number of results (default 100)
    - offset: pagination offset (default 0)
    """
    # Verify user has access to this resource
    verify_user_access(user, user_id)

    # Build query
    statement = select(Task).where(Task.user_id == user_id)

    # Apply filters
    if status_filter:
        statement = statement.where(Task.status == status_filter)

    if priority_filter:
        statement = statement.where(Task.priority == priority_filter)

    if tag_filter:
        # SQLModel/SQLAlchemy JSON contains query
        statement = statement.where(Task.tags.contains([tag_filter]))

    # Apply pagination
    statement = statement.offset(offset).limit(limit)

    # Execute query
    tasks = session.exec(statement).all()

    return [TaskResponse.model_validate(task) for task in tasks]


@router.post("/{user_id}/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    user_id: int,
    task_data: TaskCreate,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the authenticated user

    Required fields:
    - description: Task description

    Optional fields:
    - priority: "high", "medium", or "low" (default: "medium")
    - tags: List of tags
    - due_date: ISO datetime string
    """
    # Verify user has access to this resource
    verify_user_access(user, user_id)

    # Validate priority
    if task_data.priority and task_data.priority not in ["high", "medium", "low"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Priority must be 'high', 'medium', or 'low'"
        )

    # Create new task
    new_task = Task(
        user_id=user_id,
        title=task_data.title,
        description=task_data.description,
        priority=task_data.priority or "medium",
        tags=task_data.tags or [],
        due_date=task_data.due_date,
    )

    session.add(new_task)
    session.commit()
    session.refresh(new_task)

    return TaskResponse.model_validate(new_task)


@router.get("/{user_id}/tasks/{task_id}", response_model=TaskResponse)
async def get_task(
    user_id: int,
    task_id: int,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get a single task by ID

    Verifies that the task belongs to the authenticated user
    """
    # Verify user has access to this resource
    verify_user_access(user, user_id)

    # Get task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify task belongs to user
    if task.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Task does not belong to you"
        )

    return TaskResponse.model_validate(task)


@router.put("/{user_id}/tasks/{task_id}", response_model=TaskResponse)
async def update_task(
    user_id: int,
    task_id: int,
    task_data: TaskUpdate,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update an existing task

    All fields are optional. Only provided fields will be updated.

    Fields:
    - description: Task description
    - status: "pending" or "completed"
    - priority: "high", "medium", or "low"
    - tags: List of tags
    - due_date: ISO datetime string (null to remove)
    """
    # Verify user has access to this resource
    verify_user_access(user, user_id)

    # Get task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify task belongs to user
    if task.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Task does not belong to you"
        )

    # Validate status if provided
    if task_data.status and task_data.status not in ["pending", "completed"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Status must be 'pending' or 'completed'"
        )

    # Validate priority if provided
    if task_data.priority and task_data.priority not in ["high", "medium", "low"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Priority must be 'high', 'medium', or 'low'"
        )

    # Update task fields
    if task_data.title is not None:
        task.title = task_data.title

    if task_data.description is not None:
        task.description = task_data.description

    if task_data.status is not None:
        task.status = task_data.status

    if task_data.priority is not None:
        task.priority = task_data.priority

    if task_data.tags is not None:
        task.tags = task_data.tags

    if task_data.due_date is not None:
        task.due_date = task_data.due_date

    # Update timestamp
    task.updated_at = datetime.utcnow()

    session.add(task)
    session.commit()
    session.refresh(task)

    return TaskResponse.model_validate(task)


@router.delete("/{user_id}/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    user_id: int,
    task_id: int,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete a task

    Permanently removes the task from the database
    """
    # Verify user has access to this resource
    verify_user_access(user, user_id)

    # Get task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify task belongs to user
    if task.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Task does not belong to you"
        )

    # Delete task
    session.delete(task)
    session.commit()

    return None


@router.patch("/{user_id}/tasks/{task_id}/complete", response_model=TaskResponse)
async def toggle_task_complete(
    user_id: int,
    task_id: int,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Toggle task completion status

    - If task is pending, marks it as completed
    - If task is completed, marks it as pending
    """
    # Verify user has access to this resource
    verify_user_access(user, user_id)

    # Get task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify task belongs to user
    if task.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Task does not belong to you"
        )

    # Toggle status
    task.status = "completed" if task.status == "pending" else "pending"
    task.updated_at = datetime.utcnow()

    session.add(task)
    session.commit()
    session.refresh(task)

    return TaskResponse.model_validate(task)
