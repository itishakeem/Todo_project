# Todo Evolution Project

A full-stack todo application that evolves through 5 phases, from a simple console app to a cloud-native, AI-powered task management system.

## 🎯 Project Status

- ✅ **Phase 1: Console Application** - COMPLETE
- ✅ **Phase 2: Web Application** - COMPLETE ⭐
- 📋 **Phase 3: AI Integration** - Planned
- 📋 **Phase 4: Containerization** - Planned
- 📋 **Phase 5: Cloud Deployment** - Planned

## 🚀 Quick Start

**Get the app running in 5 minutes:**

1. **Start Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   python -m src.main
   ```
   Backend: http://localhost:8000

2. **Start Frontend** (new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend: http://localhost:3000

3. **Use the App**
   - Sign up at http://localhost:3000/signup
   - Create and manage tasks
   - Everything works locally!

📖 See [QUICKSTART.md](QUICKSTART.md) for detailed instructions.

## 📚 Current Phase: Phase 2 - Web Application

### What's Working Now

✅ **Full-Stack Architecture**
- Modern React frontend (Next.js 16 + TypeScript + Tailwind)
- FastAPI backend with SQLModel ORM
- PostgreSQL/SQLite database

✅ **Authentication & Security**
- JWT-based user authentication
- Bcrypt password hashing
- User-isolated data access
- Protected API endpoints

✅ **Task Management**
- Create, read, update, delete tasks
- Task priorities (high/medium/low)
- Tags and due dates
- Filter and search
- Toggle completion status

✅ **Modern UX**
- Responsive design
- Real-time updates
- Loading/empty/error states
- Type-safe API communication

### Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Better Auth

**Backend:**
- Python 3.12
- FastAPI
- SQLModel (SQLAlchemy + Pydantic)
- PostgreSQL / SQLite
- JWT (python-jose)
- Bcrypt password hashing

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

Interactive API docs: http://localhost:8000/docs

## 📁 Project Structure

```
todo_project/
├── backend/              # FastAPI backend
│   ├── src/
│   │   ├── main.py      # App entry point
│   │   ├── models.py    # Database models
│   │   ├── auth.py      # JWT authentication
│   │   └── routes/      # API endpoints
│   ├── requirements.txt
│   └── README.md
│
├── frontend/            # Next.js frontend
│   ├── app/            # Pages (App Router)
│   ├── components/     # React components
│   ├── lib/           # API client & utilities
│   ├── package.json
│   └── README.md
│
├── phase1-console/     # Phase 1 CLI app
├── specs/             # Specifications
├── QUICKSTART.md      # Quick start guide
└── PHASE2_COMPLETE.md # Phase 2 documentation
```

## 🔒 Security

- **JWT Authentication:** Secure token-based auth
- **Password Hashing:** Bcrypt with salt
- **User Isolation:** Users can only access their own tasks
- **CORS Protection:** Configured allowed origins
- **Input Validation:** Pydantic models validate all inputs
- **SQL Injection Prevention:** SQLModel ORM protects queries

## 📖 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[PHASE2_COMPLETE.md](PHASE2_COMPLETE.md)** - Complete Phase 2 documentation
- **[backend/README.md](backend/README.md)** - Backend documentation
- **[frontend/README.md](frontend/README.md)** - Frontend documentation
- **[specs/architecture.md](specs/architecture.md)** - System architecture
- **[specs/overview.md](specs/overview.md)** - Project overview

## 🎯 Phases Overview

### Phase 1: Console Application ✅
**Status:** Complete
**Features:** Command-line todo app with JSON storage

### Phase 2: Web Application ✅
**Status:** Complete
**Features:** Full-stack app with auth, CRUD, and modern UI

### Phase 3: AI Integration 📋
**Planned Features:**
- OpenAI chatbot interface
- Natural language task creation
- MCP tools for task management
- AI-powered suggestions

### Phase 4: Containerization 📋
**Planned Features:**
- Kubernetes deployment
- Dapr sidecars
- Event-driven architecture
- Kafka messaging

### Phase 5: Cloud Deployment 📋
**Planned Features:**
- DigitalOcean Kubernetes
- CI/CD with GitHub Actions
- Monitoring with Prometheus/Grafana
- Production deployment

## 🧪 Testing

### Manual Testing
1. Open http://localhost:3000
2. Sign up with email/password
3. Create tasks
4. Test all CRUD operations
5. Logout and login
6. Test with multiple users (incognito window)

### API Testing
```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Create task (use token from login)
curl -X POST http://localhost:8000/api/1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"description": "Test task", "priority": "high"}'
```

## 🤝 Development

### Backend Development
```bash
cd backend
pip install -r requirements.txt
python -m src.main  # Auto-reload enabled
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev  # Auto-reload enabled
```

### Code Quality
- Backend: Python with type hints, FastAPI best practices
- Frontend: TypeScript strict mode, ESLint
- Both: Clean separation of concerns, SOLID principles

## 🐛 Troubleshooting

**Backend won't start:**
- Check port 8000 availability
- Verify Python dependencies installed
- Check .env configuration

**Frontend won't start:**
- Check port 3000 availability
- Run `npm install`
- Verify .env.local configuration

**Can't login:**
- Ensure backend is running
- Check browser console for errors
- Verify JWT secret matches in both apps

**Tasks not loading:**
- Check Network tab in browser DevTools
- Verify JWT token in requests
- Ensure user is authenticated

## 🎉 Success Criteria

Phase 2 is complete with all requirements met:

- ✅ User registration and authentication
- ✅ JWT token-based security
- ✅ Protected API endpoints
- ✅ Full task CRUD operations
- ✅ User-isolated data access
- ✅ Modern responsive UI
- ✅ Type-safe API communication
- ✅ Local development ready
- ✅ Production-ready architecture

## 📝 License

This project is part of a hackathon demonstration.

## 🙏 Acknowledgments

Built with:
- [FastAPI](https://fastapi.tiangolo.com/)
- [Next.js](https://nextjs.org/)
- [SQLModel](https://sqlmodel.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Better Auth](https://www.better-auth.com/)

---

**Current Status:** Phase 2 Complete ✅
**Next Up:** Phase 3 - AI Integration with chatbot and MCP tools

For detailed setup and usage, see [QUICKSTART.md](QUICKSTART.md)
