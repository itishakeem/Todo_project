# Phase 1 Console + Phase 2 API

This directory contains both Phase 1 (console application) and Phase 2 (FastAPI web backend).

## Directory Structure

```
phase1-console/
├── src/
│   ├── main.py           # Phase 1: Console CLI application
│   ├── tasks.py          # Phase 1: Task management logic
│   ├── storage.py        # Phase 1: JSON file storage
│   ├── api.py            # Phase 2: FastAPI web application
│   ├── models.py         # Phase 2: Database models
│   ├── auth.py           # Phase 2: JWT authentication
│   ├── database.py       # Phase 2: Database connection
│   ├── config.py         # Phase 2: Configuration
│   └── routes/
│       ├── auth.py       # Phase 2: Auth endpoints
│       └── tasks.py      # Phase 2: Task CRUD endpoints
├── requirements.txt      # Python dependencies for both phases
├── .env                  # Environment variables
└── README.md            # Phase 1 documentation
```

## Phase 1: Console Application

Run the console CLI:
```bash
python -m src.main
```

See [README.md](README.md) for Phase 1 documentation.

## Phase 2: FastAPI Backend

### Quick Start

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment:**
   - `.env` file already exists with development settings
   - Uses SQLite database by default

3. **Run the API server:**
   ```bash
   python -m src.api
   ```

4. **Access the API:**
   - API: http://localhost:8000
   - Interactive docs: http://localhost:8000/docs
   - Health check: http://localhost:8000/health

### API Endpoints

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (returns JWT)
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

**Tasks (JWT required):**
- `GET /api/{user_id}/tasks` - List user's tasks
- `POST /api/{user_id}/tasks` - Create task
- `GET /api/{user_id}/tasks/{id}` - Get task
- `PUT /api/{user_id}/tasks/{id}` - Update task
- `DELETE /api/{user_id}/tasks/{id}` - Delete task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle completion

### Environment Variables

See `.env` file:
- `DATABASE_URL` - Database connection (default: SQLite)
- `BETTER_AUTH_SECRET` - JWT secret (must match frontend)
- `ALLOWED_ORIGINS` - CORS allowed origins

### Frontend Connection

The frontend in `../frontend` connects to this API at http://localhost:8000

Make sure both are running:
1. Backend: `cd phase1-console && python -m src.api`
2. Frontend: `cd frontend && npm run dev`

## Testing

Both Phase 1 and Phase 2 can be tested:

```bash
# Test Phase 1 console app
pytest tests/

# Test Phase 2 API (manual testing via curl or browser)
curl http://localhost:8000/health
```

See [../QUICKSTART.md](../QUICKSTART.md) for full testing instructions.
