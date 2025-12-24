# API Client Usage Guide

This document shows how to use the centralized API client in your components.

## Setup

### 1. Environment Configuration

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Update the backend URL:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 2. Import the API Client

```typescript
import { api } from '@/lib/api';
import type { Task, CreateTaskRequest } from '@/lib/types';
```

## Usage Examples

### Authentication

#### Register New User

```typescript
'use client';

async function handleRegister(email: string, password: string) {
  try {
    const response = await api.register({ email, password });
    console.log('Registered user:', response.user);
    console.log('Access token:', response.access_token);
    // Token is NOT automatically set on registration
    // You need to call login or manually set it
  } catch (error) {
    console.error('Registration failed:', error);
  }
}
```

#### Login

```typescript
'use client';

async function handleLogin(email: string, password: string) {
  try {
    const response = await api.login({ email, password });
    console.log('Logged in user:', response.user);
    // Token is automatically set after successful login
    // All subsequent API calls will include the JWT token
  } catch (error) {
    console.error('Login failed:', error);
  }
}
```

#### Logout

```typescript
'use client';

async function handleLogout() {
  try {
    await api.logout();
    // Token is automatically cleared
  } catch (error) {
    console.error('Logout failed:', error);
  }
}
```

#### Get Current User

```typescript
'use client';

async function loadCurrentUser() {
  try {
    const user = await api.getCurrentUser();
    console.log('Current user:', user);
  } catch (error) {
    console.error('Failed to get user:', error);
  }
}
```

### Task Management

#### Get All Tasks

```typescript
'use client';

async function loadTasks() {
  try {
    const tasks = await api.getTasks();
    console.log('All tasks:', tasks);
  } catch (error) {
    console.error('Failed to load tasks:', error);
  }
}
```

#### Get Tasks with Filtering

```typescript
'use client';

async function loadPendingHighPriorityTasks() {
  try {
    const tasks = await api.getTasks({
      status: 'pending',
      priority: 'high',
      limit: 10,
      offset: 0,
    });
    console.log('Filtered tasks:', tasks);
  } catch (error) {
    console.error('Failed to load tasks:', error);
  }
}
```

#### Get Single Task

```typescript
'use client';

async function loadTask(taskId: number) {
  try {
    const task = await api.getTask(taskId);
    console.log('Task:', task);
  } catch (error) {
    console.error('Failed to load task:', error);
  }
}
```

#### Create Task

```typescript
'use client';

async function createNewTask() {
  try {
    const newTask: CreateTaskRequest = {
      description: 'Complete project documentation',
      priority: 'high',
      tags: ['work', 'documentation'],
      due_date: '2025-12-31T23:59:59Z',
    };

    const task = await api.createTask(newTask);
    console.log('Created task:', task);
  } catch (error) {
    console.error('Failed to create task:', error);
  }
}
```

#### Update Task

```typescript
'use client';

async function updateExistingTask(taskId: number) {
  try {
    const task = await api.updateTask(taskId, {
      description: 'Updated task description',
      priority: 'medium',
    });
    console.log('Updated task:', task);
  } catch (error) {
    console.error('Failed to update task:', error);
  }
}
```

#### Delete Task

```typescript
'use client';

async function removeTask(taskId: number) {
  try {
    await api.deleteTask(taskId);
    console.log('Task deleted successfully');
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
}
```

#### Toggle Task Completion

```typescript
'use client';

async function toggleCompletion(taskId: number) {
  try {
    const task = await api.toggleTaskComplete(taskId);
    console.log('Task toggled:', task.status);
  } catch (error) {
    console.error('Failed to toggle task:', error);
  }
}
```

## Complete Component Example

```typescript
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import type { Task } from '@/lib/types';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTasks({ status: 'pending' });
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleComplete(taskId: number) {
    try {
      const updatedTask = await api.toggleTaskComplete(taskId);
      setTasks(tasks.map(task =>
        task.id === taskId ? updatedTask : task
      ));
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  }

  async function handleDelete(taskId: number) {
    try {
      await api.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map(task => (
        <div key={task.id}>
          <span>{task.description}</span>
          <button onClick={() => handleToggleComplete(task.id)}>
            {task.status === 'pending' ? 'Complete' : 'Reopen'}
          </button>
          <button onClick={() => handleDelete(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

## JWT Token Management

### Setting Token Manually

If you need to set a token manually (e.g., from localStorage):

```typescript
'use client';

useEffect(() => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    api.setToken(token);
  }
}, []);
```

### Persisting Token

The API client doesn't automatically persist tokens. You should handle this in your auth logic:

```typescript
'use client';

async function handleLogin(email: string, password: string) {
  try {
    const response = await api.login({ email, password });
    // Persist token
    localStorage.setItem('auth_token', response.access_token);
    // Token is already set in the API client
  } catch (error) {
    console.error('Login failed:', error);
  }
}

async function handleLogout() {
  try {
    await api.logout();
    // Clear persisted token
    localStorage.removeItem('auth_token');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}
```

## Error Handling

All API methods throw errors that should be caught:

```typescript
try {
  const tasks = await api.getTasks();
} catch (error) {
  if (error instanceof Error) {
    // Handle specific error message
    console.error('Error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Server Components

For server components, you may need to pass tokens differently:

```typescript
// app/tasks/page.tsx (Server Component)
import { api } from '@/lib/api';

export default async function TasksPage() {
  // In a real app, you'd get the token from cookies or headers
  // For now, this is just an example

  try {
    const tasks = await api.getTasks();
    return <div>{/* Render tasks */}</div>;
  } catch (error) {
    return <div>Error loading tasks</div>;
  }
}
```

## Important Notes

1. **Client Components**: Use `'use client'` directive for any component that uses the API client with user interactions
2. **Server Components**: Can use the API client but need proper token handling
3. **Token Security**: Never expose tokens in client-side code or logs
4. **Error Handling**: Always wrap API calls in try-catch blocks
5. **Type Safety**: Always import and use TypeScript types from `@/lib/types`
