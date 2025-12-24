# Quick Start Guide - Todo Full-Stack Application

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Python 3.12+
- Node.js 18+

### Step 1: Start Backend

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Backend is pre-configured with .env file
# Uses SQLite database for local development

# Start the server
python -m src.main
```

✅ Backend running at: **http://localhost:8000**
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

### Step 2: Start Frontend

Open a **new terminal**:

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies (if not already installed)
npm install

# Frontend is pre-configured with .env.local file

# Start the development server
npm run dev
```

✅ Frontend running at: **http://localhost:3000** (or 3002 if 3000 is busy)

### Step 3: Use the Application

1. **Open your browser** → http://localhost:3000

2. **Sign Up** → Create a new account
   - Click "Sign Up" or navigate to `/signup`
   - Enter email and password
   - Click "Sign Up" button
   - You'll be automatically logged in and redirected to dashboard

3. **Create Tasks** → Add your first todo items
   - Enter task description
   - Set priority (high/medium/low)
   - Add tags (optional)
   - Click "Add Task"

4. **Manage Tasks**
   - ✅ Mark tasks as complete/incomplete
   - ✏️ Edit task details
   - 🗑️ Delete tasks
   - 🔍 Filter by status or priority

5. **Test Multi-User**
   - Open incognito/private window
   - Create a different account
   - Verify you only see your own tasks

## 🎯 What You Get

### Working Features
- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Secure task management (user-isolated data)
- ✅ Full CRUD operations
- ✅ Task filtering and organization
- ✅ Responsive design
- ✅ Real-time updates

### Architecture
- **Frontend:** Next.js 16 + React + TypeScript + Tailwind CSS
- **Backend:** FastAPI + SQLModel + JWT
- **Database:** SQLite (local) / PostgreSQL (production-ready)
- **Security:** Bcrypt password hashing + JWT tokens

## 🔧 Configuration

Both backend and frontend are **pre-configured** with development settings:

### Backend (.env)
- Database: SQLite (./todo.db)
- JWT Secret: `dev-secret-key-change-in-production-12345678`
- CORS: Allows localhost:3000

### Frontend (.env.local)
- API URL: http://localhost:8000
- Same JWT secret as backend

## 🧪 Test the API

### Register a user
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### Get API documentation
Visit http://localhost:8000/docs for interactive Swagger documentation

## 🐛 Troubleshooting

### Backend won't start
- Check if port 8000 is available
- Verify Python dependencies: `pip install -r requirements.txt`

### Frontend won't start
- Check if port 3000 is available (will auto-use 3002 if not)
- Run `npm install` to ensure dependencies are installed
- Clear cache: `rm -rf .next` and retry

### Can't login
- Verify backend is running at http://localhost:8000
- Check browser console for errors
- Ensure .env.local has correct API_BASE_URL

### Tasks not loading
- Open browser DevTools → Network tab
- Look for failed API calls
- Verify JWT token is being sent (Authorization header)

## 📚 More Information

- Full Documentation: [PHASE2_COMPLETE.md](PHASE2_COMPLETE.md)
- Backend README: [backend/README.md](backend/README.md)
- Frontend README: [frontend/README.md](frontend/README.md)
- Architecture: [specs/architecture.md](specs/architecture.md)

## 🎉 Success!

You now have a fully functional todo application with:
- Secure user authentication
- Private task management
- Modern web interface
- RESTful API backend
- Type-safe frontend

**Next:** Phase 3 - AI Integration with chatbot and MCP tools!

---

**Need Help?** Check [PHASE2_COMPLETE.md](PHASE2_COMPLETE.md) for detailed documentation.
