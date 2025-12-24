"""
Database Connection and Session Management
"""
from sqlmodel import Session, create_engine, SQLModel
from src.config import settings

# Create database engine
engine = create_engine(
    settings.database_url,
    echo=True,  # Log SQL queries (disable in production)
    pool_pre_ping=True,  # Test connections before using
)


def create_db_and_tables():
    """Create database tables if they don't exist"""
    SQLModel.metadata.create_all(engine)


def get_session():
    """
    Dependency for getting database session
    Use this in FastAPI route dependencies
    """
    with Session(engine) as session:
        yield session
