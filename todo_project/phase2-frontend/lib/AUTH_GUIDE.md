# Authentication Guide

This document explains how authentication works in the Todo frontend application.

## Overview

The application uses JWT-based authentication with secure token storage and automatic token restoration.

## Architecture

```
┌─────────────┐
│  Homepage   │
└──────┬──────┘
       │
   ┌───┴────┐
   │        │
┌──▼──┐  ┌─▼────┐
│Login│  │Signup│
└──┬──┘  └─┬────┘
   │       │
   └───┬───┘
       │
   ┌───▼─────────┐
   │ API Client  │
   │ (JWT Token) │
   └──────┬──────┘
          │
   ┌──────▼──────┐
   │  Dashboard  │
   └─────────────┘
```

## Files

### 1. `/lib/auth.ts` - Authentication Utilities

Core authentication functions for JWT token management:

```typescript
// Get stored JWT token
getAuthToken(): string | null

// Store JWT token
setAuthToken(token: string): void

// Clear JWT token (logout)
clearAuthToken(): void

// Check if user is authenticated
isAuthenticated(): boolean
```

**Token Storage:** Uses `sessionStorage` for security (cleared when browser tab closes)

### 2. `/lib/api.ts` - API Client Integration

The API client automatically handles JWT tokens:

```typescript
// Login automatically sets token
const response = await api.login({ email, password });
// Token is now set in both sessionStorage and API client

// All subsequent calls include JWT
const tasks = await api.getTasks(); // JWT attached automatically
```

### 3. Authentication Pages

#### `/app/login/page.tsx` - Login Page
- Email/password form
- Validates inputs
- Calls `api.login()`
- Stores JWT token
- Redirects to `/dashboard`

#### `/app/signup/page.tsx` - Signup Page
- Email/password/confirm password form
- Password validation (min 8 chars)
- Calls `api.register()`
- Stores JWT token
- Redirects to `/dashboard`

#### `/app/dashboard/page.tsx` - Protected Dashboard
- Checks for JWT token on load
- Redirects to login if no token
- Loads user data
- Displays user email
- Logout functionality

## Authentication Flow

### 1. Sign Up Flow

```
User fills signup form
    ↓
Validate inputs (passwords match, length >= 8)
    ↓
Call api.register({ email, password })
    ↓
Backend returns { access_token, user }
    ↓
Store token: setAuthToken(access_token)
    ↓
Set token in API client: api.setToken(access_token)
    ↓
Redirect to /dashboard
```

### 2. Login Flow

```
User fills login form
    ↓
Validate inputs (email, password present)
    ↓
Call api.login({ email, password })
    ↓
Backend returns { access_token, user }
    ↓
Store token: setAuthToken(access_token)
    ↓
API client auto-sets token internally
    ↓
Redirect to /dashboard
```

### 3. Token Restoration Flow

```
User visits /dashboard
    ↓
useEffect runs on mount
    ↓
Check sessionStorage: getAuthToken()
    ↓
If no token → Redirect to /login
    ↓
If token exists → Set in API client: api.setToken(token)
    ↓
Load user data: api.getCurrentUser()
    ↓
If API call fails (expired/invalid token) → Redirect to /login
    ↓
If success → Display dashboard
```

### 4. Logout Flow

```
User clicks Logout button
    ↓
Call api.logout()
    ↓
Clear token: clearAuthToken()
    ↓
Redirect to /login
```

## Security Features

### ✅ Secure Token Storage
- Uses `sessionStorage` (cleared when tab closes)
- Not persisted in localStorage
- Cannot be accessed by other domains

### ✅ Automatic Token Attachment
- JWT automatically attached to all API requests
- No manual header management needed
- Consistent authentication across the app

### ✅ Token Validation
- Expired tokens trigger re-authentication
- Invalid tokens redirect to login
- API errors handled gracefully

### ✅ Protected Routes
- Dashboard checks for token on load
- Unauthorized users redirected to login
- Token restored from storage automatically

### ✅ Input Validation
- Email format validation
- Password minimum length (8 characters)
- Password confirmation match check
- Empty field validation

## Usage Examples

### Check if User is Authenticated

```typescript
import { isAuthenticated } from '@/lib/auth';

if (isAuthenticated()) {
  // User has valid token
} else {
  // User needs to log in
}
```

### Get Current Token

```typescript
import { getAuthToken } from '@/lib/auth';

const token = getAuthToken();
if (token) {
  // Use token for external API calls if needed
}
```

### Manual Token Management

```typescript
import { setAuthToken, clearAuthToken } from '@/lib/auth';

// Set token manually (rarely needed)
setAuthToken('your-jwt-token');

// Clear token manually
clearAuthToken();
```

### Protected Component Pattern

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/auth';
import { api } from '@/lib/api';

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }
    api.setToken(token);
  }, [router]);

  return <div>Protected Content</div>;
}
```

## Environment Variables

```env
# Backend API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Better Auth Secret (for backend)
BETTER_AUTH_SECRET=your-secret-key-here
```

## API Endpoints Expected

The frontend expects these backend endpoints:

### POST /api/auth/register
Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "jwt-token-here",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

### POST /api/auth/login
Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "jwt-token-here",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

### POST /api/auth/logout
Headers:
```
Authorization: Bearer <jwt-token>
```

Response:
```json
{} // Empty response or success message
```

### GET /api/auth/me
Headers:
```
Authorization: Bearer <jwt-token>
```

Response:
```json
{
  "id": 1,
  "email": "user@example.com",
  "created_at": "2025-01-01T00:00:00Z"
}
```

## Testing

### Manual Testing Steps

1. **Homepage** - http://localhost:3001
   - ✅ Should show "Login" and "Sign Up" buttons

2. **Sign Up** - http://localhost:3001/signup
   - ✅ Fill in email, password, confirm password
   - ✅ Should validate password length (min 8)
   - ✅ Should validate passwords match
   - ✅ Should call backend API
   - ✅ Should redirect to /dashboard on success

3. **Login** - http://localhost:3001/login
   - ✅ Fill in email and password
   - ✅ Should validate fields are not empty
   - ✅ Should call backend API
   - ✅ Should redirect to /dashboard on success

4. **Dashboard** - http://localhost:3001/dashboard
   - ✅ Should redirect to /login if no token
   - ✅ Should restore token from sessionStorage
   - ✅ Should display user email
   - ✅ Should have working logout button

5. **Logout**
   - ✅ Click logout button
   - ✅ Should clear token
   - ✅ Should redirect to /login
   - ✅ Cannot access /dashboard after logout

## Troubleshooting

### Token Not Persisting
- Check browser console for errors
- Verify `sessionStorage` is enabled
- Check token is being stored: `sessionStorage.getItem('auth_token')`

### Login Failing
- Check backend API is running
- Verify `NEXT_PUBLIC_API_BASE_URL` is correct
- Check network tab for API errors
- Verify backend endpoints match expected format

### Automatic Logout
- Token may be expired
- Check backend JWT expiration settings
- Implement token refresh if needed

### Cannot Access Dashboard
- Verify token is stored: `sessionStorage.getItem('auth_token')`
- Check browser console for errors
- Verify `api.getCurrentUser()` endpoint works

## Future Enhancements

- [ ] Remember me functionality (localStorage option)
- [ ] Token refresh mechanism
- [ ] Social authentication (Google, GitHub)
- [ ] Password reset flow
- [ ] Email verification
- [ ] Multi-factor authentication
- [ ] Session management UI
