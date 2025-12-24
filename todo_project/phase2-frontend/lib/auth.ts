/**
 * Authentication Utilities
 * Handles JWT token storage and retrieval
 */

/**
 * Get the current JWT token from session storage
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("auth_token");
}

/**
 * Set the JWT token in session storage
 */
export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("auth_token", token);
}

/**
 * Clear the JWT token from session storage
 */
export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem("auth_token");
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}
