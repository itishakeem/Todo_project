/**
 * API Client - SINGLE SOURCE for all backend communication
 *
 * IMPORTANT:
 * - This is the ONLY place where backend API calls should be made
 * - Do NOT use fetch() directly anywhere else in the application
 * - JWT tokens are attached via Authorization header
 * - All API functions are ready for JWT integration
 */

import { config } from "./config";
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  User,
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  ApiError,
  ListTasksParams,
} from "./types";

/**
 * API Client Configuration
 */
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;
  private userId: number | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Set JWT token for authenticated requests
   * @param token - JWT access token
   */
  setToken(token: string | null) {
    this.token = token;

    // Decode token to get user_id
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userId = parseInt(payload.sub);
      } catch (error) {
        console.error('Failed to decode token:', error);
        this.userId = null;
      }
    } else {
      this.userId = null;
    }
  }

  /**
   * Get current JWT token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Get current user ID from token
   */
  getUserId(): number | null {
    return this.userId;
  }

  /**
   * Build request headers
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Attach JWT token if available
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Make HTTP request with error handling
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    // Handle non-OK responses
    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        detail: `HTTP ${response.status}: ${response.statusText}`,
        status: response.status,
      }));
      throw new Error(error.detail || "An error occurred");
    }

    // Handle empty responses (e.g., 204 No Content)
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  /**
   * GET request
   */
  private async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  /**
   * POST request
   */
  private async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  private async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  private async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  private async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  // ==================== AUTHENTICATION API ====================

  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>(config.api.auth.register, data);
    // Automatically set token after successful registration
    this.setToken(response.access_token);
    return response;
  }

  /**
   * Login user and receive JWT token
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>(config.api.auth.login, data);
    // Automatically set token after successful login
    this.setToken(response.access_token);
    return response;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await this.post<void>(config.api.auth.logout);
    // Clear token after logout
    this.setToken(null);
  }

  /**
   * Get current authenticated user info
   */
  async getCurrentUser(): Promise<User> {
    return this.get<User>(config.api.auth.me);
  }

  // ==================== TASKS API ====================

  /**
   * Get all tasks for the authenticated user
   * Supports filtering, sorting, and pagination
   */
  async getTasks(params?: ListTasksParams): Promise<Task[]> {
    if (!this.userId) {
      throw new Error("User not authenticated");
    }

    let endpoint = config.api.tasks.base(this.userId);

    // Build query parameters
    if (params) {
      const searchParams = new URLSearchParams();
      if (params.status) searchParams.append("status", params.status);
      if (params.priority) searchParams.append("priority", params.priority);
      if (params.tag) searchParams.append("tag", params.tag);
      if (params.limit) searchParams.append("limit", params.limit.toString());
      if (params.offset) searchParams.append("offset", params.offset.toString());

      const queryString = searchParams.toString();
      if (queryString) {
        endpoint += `?${queryString}`;
      }
    }

    return this.get<Task[]>(endpoint);
  }

  /**
   * Get a single task by ID
   */
  async getTask(id: number): Promise<Task> {
    if (!this.userId) {
      throw new Error("User not authenticated");
    }
    return this.get<Task>(config.api.tasks.byId(this.userId, id));
  }

  /**
   * Create a new task
   */
  async createTask(data: CreateTaskRequest): Promise<Task> {
    if (!this.userId) {
      throw new Error("User not authenticated");
    }
    return this.post<Task>(config.api.tasks.base(this.userId), data);
  }

  /**
   * Update an existing task
   */
  async updateTask(id: number, data: UpdateTaskRequest): Promise<Task> {
    if (!this.userId) {
      throw new Error("User not authenticated");
    }
    return this.put<Task>(config.api.tasks.byId(this.userId, id), data);
  }

  /**
   * Delete a task
   */
  async deleteTask(id: number): Promise<void> {
    if (!this.userId) {
      throw new Error("User not authenticated");
    }
    return this.delete<void>(config.api.tasks.byId(this.userId, id));
  }

  /**
   * Toggle task completion status
   * Marks a pending task as complete or a completed task as pending
   */
  async toggleTaskComplete(id: number): Promise<Task> {
    if (!this.userId) {
      throw new Error("User not authenticated");
    }
    return this.patch<Task>(config.api.tasks.complete(this.userId, id));
  }
}

// ==================== SINGLETON INSTANCE ====================

/**
 * Singleton API client instance
 * Use this instance throughout the application
 */
export const api = new ApiClient(config.apiBaseUrl);

/**
 * Export ApiClient class for testing purposes
 */
export { ApiClient };
