PHASE I — Console Todo App (Core Features)
Goal: Basic Todo functionality in terminal.
Features

Add Task

Delete Task

Update Task

View Tasks

Mark Complete

Tech Stack

Python 3.13

SpecifyPlus (spec workflow)

Claude Code (code generation)

pytest

optional: JSON for persistence

✅ PHASE II — Full-Stack Web App
Goal: REST API + UI + Database + Auth.
Features

REST API CRUD

User-based tasks

UI to manage tasks

Authentication (JWT)

PostgreSQL persistence

Tech Stack

Frontend: Next.js 16, TypeScript, Tailwind

Backend: FastAPI, SQLModel

Database: Neon PostgreSQL

Authentication: Better Auth

Hosting: Vercel (frontend) / Fly.io or DO App Platform (backend)

✅ PHASE III — AI Chatbot Integration
Goal: Manage Todo list via natural language.
Features

Chatbot UI

Natural-language commands

MCP tools (add_task, list_tasks, complete_task, update_task, delete_task)

Agents orchestrating user requests

Tech Stack

OpenAI ChatKit (frontend chat)

OpenAI Agents SDK

Official MCP SDK

FastAPI backend exposes MCP tools

✅ PHASE IV — Local Cloud Deployment (Minikube)
Goal: Run full system locally on Kubernetes.
Requirements

Containerize backend + frontend

Deploy on Minikube

Add event-driven architecture: recurring tasks, reminders

Use Dapr runtime sidecars

Use Kafka for pub/sub events

Tech Stack

Minikube

Kubernetes manifests / Helm

Dapr Components: State store, Pub/Sub, Cron, Secrets

Kafka / Redpanda (local)

Docker or Nerdctl

✅ PHASE V — Cloud Deployment (DigitalOcean Kubernetes)
Goal: Deploy production version on cloud.
Requirements

Full deployment on DOKS

Cloud Kafka (Redpanda Cloud)

CI/CD

Monitoring + Logging

Tech Stack

DigitalOcean Kubernetes (DOKS)

Redpanda Cloud Kafka

GitHub Actions (CI/CD)

Prometheus + Grafana (optional)

K8s Secrets + Dapr Secret Store

📌 Rules

✔ Every feature must have its own Markdown Spec.

✔ Implementation must be generated using Claude Code.

✔ You must refine specs until generated code is correct.

✔ No manual code writing.

✔ Each phase must be completed in order.