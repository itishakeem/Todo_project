"""
FastAPI Todo Application - Main Entry Point

This is the FastAPI web API for Phase 2.
Phase 1 console functionality remains in main.py
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from src.config import settings
from src.database import create_db_and_tables
from src.routes import auth, tasks


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events
    """
    # Startup
    print("Starting FastAPI application...")
    print(f"Database URL: {settings.database_url}")
    create_db_and_tables()
    print("Database tables created successfully")

    yield

    # Shutdown
    print("Shutting down FastAPI application...")


# Create FastAPI app
app = FastAPI(
    title="Todo API",
    description="FastAPI backend for Todo Full-Stack Application",
    version="2.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(auth.router)
app.include_router(tasks.router)


@app.get("/")
async def root():
    """Root endpoint - API information"""
    return {
        "message": "Todo API",
        "version": "2.0.0",
        "docs": "/docs",
        "health": "/health"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "version": "2.0.0"
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "src.api:app",
        host=settings.host,
        port=settings.port,
        reload=True  # Enable auto-reload in development
    )
