'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { getAuthToken, setAuthToken as saveToken, clearAuthToken } from '@/lib/auth';
import type { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state on mount
  useEffect(() => {
    async function initAuth() {
      const token = getAuthToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Set token in API client
        api.setToken(token);

        // Fetch user data
        const userData = await api.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to restore session:', error);
        // Token is invalid/expired, clear it
        clearAuthToken();
        api.setToken(null);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  async function login(email: string, password: string) {
    try {
      const response = await api.login({ email, password });

      // Save token
      saveToken(response.access_token);

      // Update user state
      setUser(response.user);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      throw error; // Re-throw for component to handle
    }
  }

  async function signup(email: string, password: string, firstName?: string, lastName?: string) {
    try {
      const response = await api.register({
        email,
        password,
        first_name: firstName,
        last_name: lastName
      });

      // Save token
      saveToken(response.access_token);
      api.setToken(response.access_token);

      // Update user state
      setUser(response.user);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      throw error; // Re-throw for component to handle
    }
  }

  async function logout() {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with logout even if API call fails
    } finally {
      // Clear local state
      clearAuthToken();
      api.setToken(null);
      setUser(null);

      // Redirect to login
      router.push('/login');
    }
  }

  async function refreshUser() {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      return;
    }

    try {
      api.setToken(token);
      const userData = await api.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      clearAuthToken();
      api.setToken(null);
      setUser(null);
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: user !== null,
    login,
    signup,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
