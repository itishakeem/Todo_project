/**
 * Environment Configuration
 * Reads backend API URL from environment variables
 */

export const config = {
  // Backend API base URL
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",

  // API endpoint paths
  api: {
    auth: {
      register: "/api/auth/register",
      login: "/api/auth/login",
      logout: "/api/auth/logout",
      me: "/api/auth/me",
    },
    tasks: {
      base: (userId: number) => `/api/${userId}/tasks`,
      byId: (userId: number, taskId: number) => `/api/${userId}/tasks/${taskId}`,
      complete: (userId: number, taskId: number) => `/api/${userId}/tasks/${taskId}/complete`,
    },
  },
} as const;
