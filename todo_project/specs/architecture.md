# Todo Project - System Architecture

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Principles](#architecture-principles)
3. [Evolutionary Architecture](#evolutionary-architecture)
4. [Phase 1: Console Application](#phase-1-console-application)
5. [Phase 2: Full-Stack Web Application](#phase-2-full-stack-web-application)
6. [Phase 3: AI Chatbot Integration](#phase-3-ai-chatbot-integration)
7. [Phase 4: Kubernetes & Event-Driven Architecture](#phase-4-kubernetes--event-driven-architecture)
8. [Phase 5: Cloud Production Deployment](#phase-5-cloud-production-deployment)
9. [Data Architecture](#data-architecture)
10. [Security Architecture](#security-architecture)
11. [Scalability & Performance](#scalability--performance)
12. [Integration Patterns](#integration-patterns)
13. [Deployment Architecture](#deployment-architecture)

---

## System Overview

The Todo Project is an evolutionary task management system that progresses from a simple console application to a cloud-native, AI-enhanced, event-driven microservices platform. The architecture is designed to evolve incrementally through five distinct phases, each building upon the previous foundation.

### Core Capabilities
- **Task Management**: Create, read, update, delete, and complete tasks
- **User Management**: Multi-user support with authentication and authorization
- **AI Integration**: Natural language task management via chatbot
- **Event-Driven Features**: Recurring tasks, reminders, and asynchronous processing
- **Cloud-Native**: Kubernetes-based deployment with auto-scaling and monitoring

---

## Architecture Principles

### 1. Iterative Development
- Build incrementally, delivering value at each phase
- Each phase is independently deployable and testable
- Backward compatibility maintained where possible

### 2. Modularity & Loose Coupling
- Components are independently deployable
- Clear separation of concerns
- Well-defined interfaces between components

### 3. Automation First
- Automated testing at all levels
- CI/CD pipelines for deployment
- Infrastructure as Code (IaC) approach

### 4. Security by Design
- Authentication and authorization from Phase 2
- Secure secrets management
- Input validation and sanitization
- HTTPS/TLS for all external communications

### 5. Observability
- Comprehensive logging
- Metrics collection
- Distributed tracing (Phase 4+)
- Health checks and monitoring

### 6. Scalability
- Stateless services where possible
- Horizontal scaling support
- Event-driven architecture for async processing
- Database connection pooling

---

## Evolutionary Architecture

The system evolves through five phases:

```
Phase 1: Console App (JSON Storage)
    ↓
Phase 2: Web App (REST API + PostgreSQL)
    ↓
Phase 3: AI Integration (MCP Tools + Chatbot)
    ↓
Phase 4: K8s + Event-Driven (Dapr + Kafka)
    ↓
Phase 5: Cloud Production (DOKS + CI/CD + Monitoring)
```

Each phase introduces new capabilities while maintaining core functionality.

---

## Phase 1: Console Application

### Architecture Overview
**Status**: ✅ Implemented

A standalone Python console application with local JSON file storage.

### Components

```
┌─────────────────────────────────────┐
│         Console Interface           │
│         (main.py)                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Task Manager (tasks.py)        │
│  - Task CRUD operations             │
│  - Search, filter, sort             │
│  - Priority, tags, due dates        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Storage Layer (storage.py)     │
│  - JSON file persistence            │
│  - Load/save operations             │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│         tasks.json                  │
│    (Local file storage)             │
└─────────────────────────────────────┘
```

### Technology Stack
- **Language**: Python 3.13
- **Storage**: JSON file (`tasks.json`)
- **Testing**: pytest
- **Dependencies**: Standard library only

### Data Model
```python
Task {
    id: int
    description: str
    status: str  # "pending" | "completed"
    priority: str  # "high" | "medium" | "low"
    tags: List[str]
    due_date: Optional[str]  # ISO format
    created_at: str  # ISO timestamp
}
```

### Key Features
- Add, update, delete tasks
- Mark tasks as complete
- Priority management (high/medium/low)
- Tag management
- Due date tracking
- Search by keyword
- Filter by status, priority, tag
- Sort by various criteria

### Limitations
- Single-user only
- No authentication
- Local file storage (not scalable)
- No concurrent access support

---

## Phase 2: Full-Stack Web Application

### Architecture Overview
**Status**: Planned

A modern web application with REST API backend and React frontend, supporting multi-user authentication and PostgreSQL persistence.

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Layer                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Next.js 16 Application                        │  │
│  │  - TypeScript                                        │  │
│  │  - Tailwind CSS                                      │  │
│  │  - Server Components                                 │  │
│  │  - Client Components                                 │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 │                                           │
│  ┌──────────────▼───────────────────────────────────────┐  │
│  │         API Client Library (api.ts)                  │  │
│  │  - HTTP client                                       │  │
│  │  - JWT token management                              │  │
│  │  - Request/response interceptors                     │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS/REST API
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    Backend Layer                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              FastAPI Application                      │  │
│  │  ┌────────────────┐  ┌──────────────────────────┐   │  │
│  │  │  Auth Routes   │  │    Task Routes           │   │  │
│  │  │  - /register   │  │    - GET /tasks          │   │  │
│  │  │  - /login      │  │    - POST /tasks         │   │  │
│  │  │  - /logout     │  │    - PUT /tasks/{id}     │   │  │
│  │  │                │  │    - DELETE /tasks/{id}  │   │  │
│  │  └────────────────┘  └──────────────────────────┘   │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 │                                           │
│  ┌──────────────▼───────────────────────────────────────┐  │
│  │         Business Logic Layer                         │  │
│  │  - Task service                                      │  │
│  │  - User service                                      │  │
│  │  - Authentication service                            │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 │                                           │
│  ┌──────────────▼───────────────────────────────────────┐  │
│  │         Data Access Layer (SQLModel)                │  │
│  │  - ORM models                                        │  │
│  │  - Database queries                                  │  │
│  │  - Migrations (Alembic)                              │  │
│  └──────────────┬───────────────────────────────────────┘  │
└─────────────────┼───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              Neon PostgreSQL Database                        │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │   users table    │  │   tasks table    │                │
│  │  - id            │  │  - id            │                │
│  │  - email (unique)│  │  - user_id (FK)  │                │
│  │  - password_hash │  │  - description   │                │
│  │  - created_at    │  │  - status        │                │
│  └──────────────────┘  │  - priority      │                │
│                        │  - tags          │                │
│                        │  - due_date      │                │
│                        │  - created_at    │                │
│                        │  - updated_at    │                │
│                        └──────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Server Components + Client Components
- **HTTP Client**: Fetch API / Axios
- **Authentication**: JWT tokens (stored in httpOnly cookies or localStorage)
- **Hosting**: Vercel

#### Backend
- **Framework**: FastAPI
- **Language**: Python 3.13
- **ORM**: SQLModel (built on SQLAlchemy + Pydantic)
- **Database**: Neon PostgreSQL (serverless)
- **Authentication**: Better Auth (JWT-based)
- **Migrations**: Alembic
- **API Documentation**: OpenAPI/Swagger (auto-generated)
- **Hosting**: Fly.io or DigitalOcean App Platform

### Data Model

#### User Entity
```python
class User(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    email: str = Field(unique=True, index=True)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    tasks: List["Task"] = Relationship(back_populates="user")
```

#### Task Entity
```python
class Task(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    description: str
    status: str = Field(default="pending")  # "pending" | "completed"
    priority: str = Field(default="medium")  # "high" | "medium" | "low"
    tags: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    due_date: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user: User = Relationship(back_populates="tasks")
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (returns JWT)
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

#### Tasks
- `GET /api/tasks` - List user's tasks (with filtering, sorting, pagination)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/{id}` - Get task by ID
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `PATCH /api/tasks/{id}/complete` - Mark task as complete

### Security Features
- JWT-based authentication
- Password hashing (bcrypt/argon2)
- CORS configuration
- Input validation (Pydantic models)
- SQL injection prevention (ORM)
- Rate limiting (optional)
- HTTPS/TLS enforcement

### Deployment Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   Vercel CDN    │────────▶│  Next.js App    │
│   (Frontend)    │         │   (Frontend)    │
└─────────────────┘         └─────────────────┘
                                      │
                                      │ HTTPS
                                      ▼
                            ┌─────────────────┐
                            │  FastAPI Backend│
                            │  (Fly.io/DO)    │
                            └────────┬────────┘
                                     │
                                     │ Connection Pool
                                     ▼
                            ┌─────────────────┐
                            │  Neon PostgreSQL│
                            │   (Serverless)  │
                            └─────────────────┘
```

---

## Phase 3: AI Chatbot Integration

### Architecture Overview
**Status**: Planned

Integration of AI chatbot interface using OpenAI Agents SDK and MCP (Model Context Protocol) tools for natural language task management.

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Next.js Application                          │  │
│  │  ┌──────────────────┐  ┌────────────────────────┐   │  │
│  │  │  Task UI         │  │   Chatbot UI           │   │  │
│  │  │  (Existing)      │  │   (OpenAI ChatKit)    │   │  │
│  │  └──────────────────┘  └────────────────────────┘   │  │
│  └──────────────────┬───────────────────────────────────┘  │
└─────────────────────┼───────────────────────────────────────┘
                      │
                      │ WebSocket / HTTP
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend Layer                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         FastAPI Application                          │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │         MCP Server                           │   │  │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │   │  │
│  │  │  │add_task  │  │list_tasks│  │update_   │  │   │  │
│  │  │  │  tool    │  │  tool    │  │  task    │  │   │  │
│  │  │  └──────────┘  └──────────┘  └──────────┘  │   │  │
│  │  │  ┌──────────┐  ┌──────────┐                │   │  │
│  │  │  │delete_   │  │complete_ │                │   │  │
│  │  │  │  task    │  │  task    │                │   │  │
│  │  │  └──────────┘  └──────────┘                │   │  │
│  │  └──────────────┬──────────────────────────────┘   │  │
│  └─────────────────┼───────────────────────────────────┘  │
│                    │                                       │
│  ┌─────────────────▼───────────────────────────────────┐  │
│  │         OpenAI Agents SDK                           │  │
│  │  - Natural language processing                      │  │
│  │  - Intent recognition                               │  │
│  │  - Tool orchestration                               │  │
│  │  - Context management                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                    │                                       │
│  ┌─────────────────▼───────────────────────────────────┐  │
│  │         Task Service Layer                          │  │
│  │  (Same as Phase 2)                                 │  │
│  └─────────────────┬───────────────────────────────────┘  │
└────────────────────┼───────────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   PostgreSQL Database  │
         │      (Phase 2)         │
         └───────────────────────┘
```

### Technology Stack
- **Chatbot UI**: OpenAI ChatKit (React component)
- **AI Agent**: OpenAI Agents SDK
- **MCP Protocol**: Official MCP SDK
- **Backend**: FastAPI (extended from Phase 2)
- **Tool Integration**: MCP tools exposed as FastAPI endpoints

### MCP Tools

#### 1. add_task
```python
{
    "name": "add_task",
    "description": "Add a new task to the user's todo list",
    "parameters": {
        "description": "string (required)",
        "priority": "string (optional: high/medium/low)",
        "tags": "array[string] (optional)",
        "due_date": "string (optional: ISO format)"
    }
}
```

#### 2. list_tasks
```python
{
    "name": "list_tasks",
    "description": "List user's tasks with optional filtering",
    "parameters": {
        "status": "string (optional: pending/completed)",
        "priority": "string (optional: high/medium/low)",
        "tag": "string (optional)"
    }
}
```

#### 3. update_task
```python
{
    "name": "update_task",
    "description": "Update an existing task",
    "parameters": {
        "task_id": "integer (required)",
        "description": "string (optional)",
        "priority": "string (optional)",
        "tags": "array[string] (optional)",
        "due_date": "string (optional)"
    }
}
```

#### 4. delete_task
```python
{
    "name": "delete_task",
    "description": "Delete a task from the user's todo list",
    "parameters": {
        "task_id": "integer (required)"
    }
}
```

#### 5. complete_task
```python
{
    "name": "complete_task",
    "description": "Mark a task as completed",
    "parameters": {
        "task_id": "integer (required)"
    }
}
```

### AI Agent Flow

```
User Input (Natural Language)
    ↓
OpenAI Agents SDK
    ↓
Intent Recognition & Parsing
    ↓
Tool Selection (MCP Tools)
    ↓
Tool Execution (FastAPI Backend)
    ↓
Database Operation
    ↓
Response Generation
    ↓
Chatbot UI Display
```

### Example Interactions
- "Add a task to buy groceries with high priority"
- "Show me all pending tasks"
- "Mark task 5 as complete"
- "Update task 3 to say 'Call dentist'"
- "Delete the task about groceries"

---

## Phase 4: Kubernetes & Event-Driven Architecture

### Architecture Overview
**Status**: Planned

Containerized microservices architecture deployed on Kubernetes (Minikube) with Dapr sidecars for state management, pub/sub messaging, and event-driven features like recurring tasks and reminders.

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster (Minikube)                 │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Frontend Deployment                          │  │
│  │  ┌──────────────┐  ┌──────────────┐                     │  │
│  │  │ Next.js Pod  │  │  Dapr Sidecar │                     │  │
│  │  └──────────────┘  └──────────────┘                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          │                                       │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            Frontend Service (ClusterIP)                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          │                                       │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Backend Deployment                           │  │
│  │  ┌──────────────┐  ┌──────────────┐                     │  │
│  │  │ FastAPI Pod  │  │  Dapr Sidecar │                     │  │
│  │  └──────────────┘  └──────────────┘                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          │                                       │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            Backend Service (ClusterIP)                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          │                                       │
│  ┌───────────────────────┼───────────────────────────────────┐  │
│  │                       │                                   │  │
│  │  ┌────────────────────▼──────────────────────────────┐  │  │
│  │  │         Dapr Components                            │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐              │  │  │
│  │  │  │ State Store  │  │   Pub/Sub     │              │  │  │
│  │  │  │  (Redis)     │  │   (Kafka)     │              │  │  │
│  │  │  └──────────────┘  └──────────────┘              │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐              │  │  │
│  │  │  │ Cron Binding │  │ Secret Store │              │  │  │
│  │  │  └──────────────┘  └──────────────┘              │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          │                                       │
│  ┌───────────────────────┼───────────────────────────────────┐  │
│  │                       │                                   │  │
│  │  ┌────────────────────▼──────────────────────────────┐  │  │
│  │  │         Event Processing Service                   │  │  │
│  │  │  - Recurring task generator                        │  │  │
│  │  │  - Reminder service                                │  │  │
│  │  │  - Notification handler                            │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          │                                       │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         PostgreSQL Deployment (StatefulSet)              │  │
│  │  ┌──────────────┐  ┌──────────────┐                     │  │
│  │  │  Postgres    │  │  Dapr Sidecar │                     │  │
│  │  │    Pod       │  └──────────────┘                     │  │
│  │  └──────────────┘                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          │                                       │
│  ┌───────────────────────┼───────────────────────────────────┐  │
│  │                       │                                   │  │
│  │  ┌────────────────────▼──────────────────────────────┐  │  │
│  │  │         Kafka/Redpanda Deployment                  │  │  │
│  │  │  - Topics: task-events, reminders, notifications   │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack
- **Container Runtime**: Docker / Nerdctl
- **Orchestration**: Kubernetes (Minikube)
- **Service Mesh**: Dapr (Distributed Application Runtime)
- **Message Broker**: Kafka / Redpanda (local)
- **State Store**: Redis (via Dapr)
- **Database**: PostgreSQL (containerized)
- **Config Management**: Kubernetes ConfigMaps & Secrets
- **Service Discovery**: Kubernetes DNS

### Dapr Components

#### 1. State Store (Redis)
```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: statestore
spec:
  type: state.redis
  version: v1
  metadata:
    - name: redisHost
      value: redis:6379
    - name: redisPassword
      secretKeyRef:
        name: redis-secret
        key: password
```

**Usage**: Caching frequently accessed tasks, session storage

#### 2. Pub/Sub (Kafka)
```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: pubsub
spec:
  type: pubsub.kafka
  version: v1
  metadata:
    - name: brokers
      value: kafka:9092
```

**Topics**:
- `task-created`
- `task-updated`
- `task-completed`
- `task-deleted`
- `reminder-due`
- `recurring-task-generated`

#### 3. Cron Binding
```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: cron-binding
spec:
  type: bindings.cron
  version: v1
  metadata:
    - name: schedule
      value: "0 * * * *"  # Every hour
```

**Usage**: Trigger recurring task generation, check for due reminders

#### 4. Secret Store
```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: secretstore
spec:
  type: secretstores.kubernetes
  version: v1
```

**Usage**: Secure access to database credentials, API keys

### Event-Driven Features

#### Recurring Tasks
```
Cron Binding (Hourly)
    ↓
Event: "check-recurring-tasks"
    ↓
Backend Service (Subscriber)
    ↓
Query tasks with recurrence pattern
    ↓
Generate new task instances
    ↓
Publish: "task-created" event
    ↓
Notification Service (Subscriber)
    ↓
Send notification to user
```

#### Reminders
```
Task Created/Updated with due_date
    ↓
Publish: "reminder-scheduled" event
    ↓
Reminder Service (Subscriber)
    ↓
Store reminder in Dapr State Store
    ↓
Cron Binding (Every minute)
    ↓
Check due reminders
    ↓
Publish: "reminder-due" event
    ↓
Notification Service
    ↓
Send reminder notification
```

### Kubernetes Manifests Structure

```
phase4-k8s/
├── k8s/
│   ├── namespace.yaml
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── configmap.yaml
│   ├── backend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── configmap.yaml
│   ├── database/
│   │   ├── statefulset.yaml
│   │   ├── service.yaml
│   │   └── pvc.yaml
│   ├── dapr/
│   │   ├── statestore.yaml
│   │   ├── pubsub.yaml
│   │   ├── cron-binding.yaml
│   │   └── secrets.yaml
│   └── kafka/
│       ├── redpanda.yaml
│       └── topics.yaml
```

### Data Flow Example: Task Creation

```
1. User creates task via Frontend
   ↓
2. Frontend → Backend API (HTTP)
   ↓
3. Backend validates & saves to PostgreSQL
   ↓
4. Backend publishes "task-created" event via Dapr Pub/Sub
   ↓
5. Event Processing Service subscribes to event
   ↓
6. If task has recurrence pattern:
   - Store recurrence metadata in Dapr State Store
   ↓
7. If task has due_date:
   - Publish "reminder-scheduled" event
   ↓
8. Notification Service subscribes to events
   - Sends confirmation to user
```

---

## Phase 5: Cloud Production Deployment

### Architecture Overview
**Status**: Planned

Production deployment on DigitalOcean Kubernetes Service (DOKS) with managed Kafka (Redpanda Cloud), CI/CD pipelines, monitoring, and auto-scaling.

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    DigitalOcean Kubernetes (DOKS)                 │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Ingress Controller                     │  │
│  │              (NGINX / Traefik)                           │  │
│  └───────────────────────┬──────────────────────────────────┘  │
│                          │                                       │
│  ┌───────────────────────┼───────────────────────────────────┐  │
│  │                       │                                   │  │
│  │  ┌────────────────────▼──────────────────────────────┐  │  │
│  │  │         Frontend Deployment (HPA)                 │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐              │  │  │
│  │  │  │ Next.js Pods │  │  Dapr Sidecar│              │  │  │
│  │  │  │ (Auto-scaled)│  └──────────────┘              │  │  │
│  │  │  └──────────────┘                                │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          │                                       │
│  ┌───────────────────────┼───────────────────────────────────┐  │
│  │                       │                                   │  │
│  │  ┌────────────────────▼──────────────────────────────┐  │  │
│  │  │         Backend Deployment (HPA)                   │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐              │  │  │
│  │  │  │ FastAPI Pods │  │  Dapr Sidecar│              │  │  │
│  │  │  │ (Auto-scaled)│  └──────────────┘              │  │  │
│  │  │  └──────────────┘                                │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          │                                       │
│  ┌───────────────────────┼───────────────────────────────────┐  │
│  │                       │                                   │  │
│  │  ┌────────────────────▼──────────────────────────────┐  │  │
│  │  │         Managed PostgreSQL                         │  │  │
│  │  │         (DigitalOcean Managed DB)                  │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          │                                       │
│  ┌───────────────────────┼───────────────────────────────────┐  │
│  │                       │                                   │  │
│  │  ┌────────────────────▼──────────────────────────────┐  │  │
│  │  │         Redpanda Cloud (Managed Kafka)            │  │  │
│  │  │  - High availability                              │  │  │
│  │  │  - Auto-scaling                                   │  │  │
│  │  │  - Multi-region support                           │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          │                                       │
│  ┌───────────────────────┼───────────────────────────────────┐  │
│  │                       │                                   │  │
│  │  ┌────────────────────▼──────────────────────────────┐  │  │
│  │  │         Monitoring Stack                          │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐              │  │  │
│  │  │  │ Prometheus   │  │   Grafana    │              │  │  │
│  │  │  │ (Metrics)    │  │ (Dashboards) │              │  │  │
│  │  │  └──────────────┘  └──────────────┘              │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                          │
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                    CI/CD Pipeline (GitHub Actions)                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  1. Code Push → Trigger Workflow                        │  │
│  │  2. Run Tests (Unit, Integration, E2E)                   │  │
│  │  3. Build Docker Images                                  │  │
│  │  4. Push to Container Registry                           │  │
│  │  5. Deploy to Staging Environment                        │  │
│  │  6. Run Smoke Tests                                      │  │
│  │  7. Deploy to Production (Manual Approval)               │  │
│  │  8. Run Health Checks                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack
- **Kubernetes**: DigitalOcean Kubernetes Service (DOKS)
- **Container Registry**: DigitalOcean Container Registry or Docker Hub
- **Message Broker**: Redpanda Cloud (managed Kafka)
- **Database**: DigitalOcean Managed PostgreSQL or Neon PostgreSQL
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Logging**: Centralized logging (Loki or cloud provider logs)
- **Ingress**: NGINX Ingress Controller or Traefik
- **Auto-scaling**: Kubernetes HPA (Horizontal Pod Autoscaler)
- **Secrets**: Kubernetes Secrets + Dapr Secret Store

### CI/CD Pipeline

#### Workflow Stages

1. **Build Stage**
   - Checkout code
   - Set up Node.js and Python environments
   - Install dependencies
   - Run linters (ESLint, Pylint, Black)

2. **Test Stage**
   - Run unit tests (pytest, Jest)
   - Run integration tests
   - Run E2E tests (Playwright/Cypress)
   - Generate test coverage reports

3. **Build Images Stage**
   - Build Docker images for frontend and backend
   - Tag images with commit SHA and branch name
   - Push to container registry

4. **Deploy Staging Stage**
   - Deploy to staging Kubernetes cluster
   - Run database migrations
   - Run smoke tests
   - Verify deployment health

5. **Deploy Production Stage** (Manual Approval)
   - Deploy to production Kubernetes cluster
   - Run database migrations
   - Run health checks
   - Monitor for errors

### Monitoring & Observability

#### Metrics Collected
- **Application Metrics**
  - Request rate (requests/second)
  - Response time (p50, p95, p99)
  - Error rate (4xx, 5xx)
  - Active users
  - Task creation/completion rate

- **Infrastructure Metrics**
  - CPU usage per pod
  - Memory usage per pod
  - Network I/O
  - Disk I/O
  - Database connection pool usage

- **Business Metrics**
  - Total tasks created
  - Tasks completed per day
  - Average tasks per user
  - AI chatbot usage rate

#### Grafana Dashboards
- **System Overview**: Overall health, request rates, error rates
- **Application Performance**: Response times, throughput
- **Infrastructure**: CPU, memory, network usage
- **Business Metrics**: User activity, task statistics
- **Error Tracking**: Error rates, error types, trends

#### Alerting Rules
- High error rate (> 5% for 5 minutes)
- High response time (p95 > 2 seconds)
- Pod crash loop
- Database connection pool exhaustion
- Disk space low (< 20%)
- High CPU usage (> 80% for 10 minutes)

### Auto-Scaling Configuration

#### Horizontal Pod Autoscaler (HPA)

**Frontend HPA**:
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: frontend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: frontend
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

**Backend HPA**:
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Pods
      pods:
        metric:
          name: http_requests_per_second
        target:
          type: AverageValue
          averageValue: "100"
```

### Security Enhancements

- **Network Policies**: Restrict pod-to-pod communication
- **Pod Security Standards**: Enforce security contexts
- **Secrets Management**: Kubernetes Secrets + Dapr Secret Store
- **TLS/SSL**: Cert-manager for automatic certificate management
- **RBAC**: Role-based access control for Kubernetes resources
- **Image Scanning**: Scan Docker images for vulnerabilities
- **WAF**: Web Application Firewall at ingress level

---

## Data Architecture

### Data Flow Across Phases

```
Phase 1: JSON File (Local)
    ↓
Phase 2: PostgreSQL (Single Database)
    ↓
Phase 3: PostgreSQL + Redis Cache (via Dapr)
    ↓
Phase 4: PostgreSQL + Redis + Kafka Events
    ↓
Phase 5: Managed PostgreSQL + Redis + Managed Kafka + Monitoring DB
```

### Database Schema Evolution

#### Phase 1 → Phase 2
- Add `users` table
- Add `user_id` foreign key to `tasks` table
- Add `created_at` and `updated_at` timestamps
- Add indexes on `user_id`, `status`, `priority`

#### Phase 2 → Phase 4
- Add `recurrence_pattern` field to `tasks` table
- Add `reminders` table for scheduled reminders
- Add `events` table for event sourcing (optional)

### Data Consistency

- **Phase 1-2**: ACID transactions (PostgreSQL)
- **Phase 4-5**: Eventual consistency for event-driven features
- **Caching Strategy**: Redis cache with TTL, cache invalidation on updates
- **Database Migrations**: Alembic for schema versioning

---

## Security Architecture

### Authentication & Authorization

#### Phase 2+
- **Authentication**: JWT tokens (Better Auth)
- **Password Storage**: Bcrypt/Argon2 hashing
- **Token Expiration**: Access tokens (15 min), Refresh tokens (7 days)
- **Authorization**: User-based task isolation (user_id filtering)

#### Phase 4+
- **Service-to-Service**: mTLS via Dapr
- **API Keys**: For external service integration
- **RBAC**: Kubernetes role-based access control

### Data Protection

- **Encryption at Rest**: Database encryption, volume encryption
- **Encryption in Transit**: TLS 1.3 for all communications
- **Secrets Management**: Kubernetes Secrets + Dapr Secret Store
- **Input Validation**: Pydantic models, SQL injection prevention
- **Rate Limiting**: API rate limiting to prevent abuse

### Network Security

- **Network Policies**: Kubernetes network policies for pod isolation
- **Ingress Security**: WAF, DDoS protection
- **Private Networking**: Private database access, internal service communication

---

## Scalability & Performance

### Horizontal Scaling

- **Frontend**: Stateless Next.js app, scales horizontally
- **Backend**: Stateless FastAPI app, scales horizontally
- **Database**: Read replicas for read-heavy workloads
- **Message Broker**: Kafka partitions for parallel processing

### Performance Optimizations

- **Caching**: Redis cache for frequently accessed tasks
- **Database Indexing**: Indexes on user_id, status, priority, due_date
- **Connection Pooling**: SQLAlchemy connection pooling
- **CDN**: Vercel CDN for frontend static assets
- **Lazy Loading**: Frontend lazy loading for task lists
- **Pagination**: API pagination for large task lists

### Capacity Planning

- **Expected Load**: 10,000 active users, 100,000 tasks
- **Peak Traffic**: 1,000 requests/second
- **Database Size**: ~10GB initial, growing at 1GB/month
- **Storage**: 50GB for container images, logs, backups

---

## Integration Patterns

### API Integration

- **REST API**: Standard REST endpoints for CRUD operations
- **WebSocket**: Real-time updates (optional, Phase 3+)
- **GraphQL**: Alternative API layer (optional, Phase 3+)

### Event-Driven Integration

- **Pub/Sub Pattern**: Kafka for asynchronous event processing
- **Event Sourcing**: Store events for audit trail (optional)
- **CQRS**: Separate read/write models (optional, Phase 5)

### External Service Integration

- **AI Services**: OpenAI API for chatbot functionality
- **Email Service**: SendGrid/AWS SES for notifications
- **SMS Service**: Twilio for SMS reminders (optional)
- **Push Notifications**: Firebase Cloud Messaging (optional)

---

## Deployment Architecture

### Environment Strategy

- **Development**: Local development (Phase 1)
- **Staging**: Kubernetes cluster for testing (Phase 4+)
- **Production**: DigitalOcean Kubernetes (Phase 5)

### Deployment Strategy

- **Blue-Green Deployment**: Zero-downtime deployments
- **Rolling Updates**: Gradual pod replacement
- **Canary Releases**: Gradual traffic shift to new version
- **Database Migrations**: Alembic migrations run before deployment

### Disaster Recovery

- **Database Backups**: Daily automated backups, 30-day retention
- **Container Images**: Tagged versions in container registry
- **Configuration**: Version-controlled Kubernetes manifests
- **Recovery Time Objective (RTO)**: 1 hour
- **Recovery Point Objective (RPO)**: 24 hours

---

## Future Considerations

### Potential Enhancements

1. **Multi-tenancy**: Support for organizations/teams
2. **Real-time Collaboration**: WebSocket-based real-time updates
3. **Mobile Apps**: React Native or Flutter mobile applications
4. **Advanced AI**: Task prioritization suggestions, smart scheduling
5. **Integrations**: Calendar sync, email integration, Slack bot
6. **Analytics**: User behavior analytics, task completion insights
7. **Internationalization**: Multi-language support (Urdu, etc.)

### Technical Debt Management

- Regular dependency updates
- Code refactoring cycles
- Performance profiling and optimization
- Security audits and penetration testing

---

## Conclusion

This architecture document provides a comprehensive overview of the Todo Project's evolution from a simple console application to a cloud-native, AI-enhanced, event-driven microservices platform. Each phase builds upon the previous foundation, introducing new capabilities while maintaining backward compatibility and system reliability.

The architecture emphasizes:
- **Modularity**: Independent, deployable components
- **Scalability**: Horizontal scaling and performance optimization
- **Security**: Multi-layered security approach
- **Observability**: Comprehensive monitoring and logging
- **Automation**: CI/CD and infrastructure as code

This evolutionary approach allows for incremental development, testing, and deployment while minimizing risk and maximizing value delivery at each phase.

