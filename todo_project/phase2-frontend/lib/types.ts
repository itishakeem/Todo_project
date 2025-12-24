/**
 * API Type Definitions
 * Based on Phase 2 architecture specification
 */

// Task status enum
export type TaskStatus = "pending" | "completed";

// Task priority enum
export type TaskPriority = "high" | "medium" | "low";

// Task entity (matches backend SQLModel)
export interface Task {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  tags: string[];
  due_date: string | null; // ISO datetime string
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

// Task creation request
export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority?: TaskPriority;
  tags?: string[];
  due_date?: string; // ISO datetime string
}

// Task update request
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  tags?: string[];
  due_date?: string | null; // ISO datetime string
  status?: TaskStatus;
}

// User entity
export interface User {
  id: number;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  created_at: string;
}

// Auth requests
export interface RegisterRequest {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Auth response
export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// API Error response
export interface ApiError {
  detail: string;
  status?: number;
}

// Query parameters for listing tasks
export interface ListTasksParams {
  status?: TaskStatus;
  priority?: TaskPriority;
  tag?: string;
  limit?: number;
  offset?: number;
}
