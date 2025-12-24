'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import type { Task, CreateTaskRequest, TaskPriority } from '@/lib/types';
import TaskItem from './TaskItem';

interface TaskListProps {
  onTaskUpdate?: () => void;
  externalFilter?: 'all' | 'active' | 'completed';
  onFilterChange?: (filter: 'all' | 'active' | 'completed') => void;
}

export default function TaskList({ onTaskUpdate, externalFilter, onFilterChange }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [creating, setCreating] = useState(false);

  // Use external filter if provided, otherwise use internal state
  const filter = externalFilter || 'all';
  const setFilter = onFilterChange || (() => {});

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTasks();
      setTasks(data);
      onTaskUpdate?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();

    if (!newTaskTitle.trim()) {
      return;
    }

    try {
      setCreating(true);
      const taskData: CreateTaskRequest = {
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim() || undefined,
        priority: 'medium',
      };

      const newTask = await api.createTask(taskData);
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      onTaskUpdate?.();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create task');
    } finally {
      setCreating(false);
    }
  }

  async function handleDeleteTask(taskId: number) {
    try {
      await api.deleteTask(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
      onTaskUpdate?.();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete task');
    }
  }

  async function handleToggleComplete(taskId: number) {
    try {
      const updatedTask = await api.toggleTaskComplete(taskId);
      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
      onTaskUpdate?.();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to toggle task');
    }
  }

  async function handleUpdateTask(taskId: number, title: string, description: string, priority: TaskPriority) {
    try {
      const updatedTask = await api.updateTask(taskId, { title, description, priority });
      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
      onTaskUpdate?.();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update task');
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return task.status !== 'completed';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-6 text-lg font-medium text-gray-600 dark:text-gray-400 animate-pulse">Loading your tasks...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-6 text-center">
        <svg
          className="mx-auto h-12 w-12 text-red-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <h3 className="mt-4 text-lg font-medium text-red-800 dark:text-red-400">
          Error loading tasks
        </h3>
        <p className="mt-2 text-sm text-red-700 dark:text-red-500">{error}</p>
        <button
          onClick={loadTasks}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></span>
          My Tasks
        </h2>

        {/* Filter Buttons */}
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl">
          {(['all', 'active', 'completed'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                filter === filterOption
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleCreateTask} className="space-y-3 animate-slide-up">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex-1 relative group">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title"
              className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl sm:rounded-2xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 text-sm sm:text-base font-semibold"
              disabled={creating}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-200"></div>
          </div>
          <button
            type="submit"
            disabled={creating || !newTaskTitle.trim()}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {creating ? (
              <>
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm sm:text-base">Adding...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm sm:text-base">Add Task</span>
              </>
            )}
          </button>
        </div>
        <div className="relative group">
          <textarea
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={2}
            className="w-full px-4 sm:px-5 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 text-sm resize-none"
            disabled={creating}
          />
        </div>
      </form>

      {/* Empty state */}
      {filteredTasks.length === 0 && tasks.length === 0 && (
        <div className="text-center py-16 animate-fade-in-up">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center animate-float">
              <svg
                className="w-12 h-12 text-blue-500 dark:text-blue-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
          </div>
          <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
            Your canvas awaits
          </h3>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
            Start your productivity journey by adding your first task above.
          </p>
        </div>
      )}

      {/* Empty filter state */}
      {filteredTasks.length === 0 && tasks.length > 0 && (
        <div className="text-center py-16 animate-fade-in-up">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
            No {filter} tasks
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Try a different filter or add more tasks.
          </p>
        </div>
      )}

      {/* Task list */}
      {filteredTasks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          </div>

          <div className="space-y-3">
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TaskItem
                  task={task}
                  onDelete={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                  onUpdate={handleUpdateTask}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
