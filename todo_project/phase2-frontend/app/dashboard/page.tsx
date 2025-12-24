'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import TaskList from '@/components/TaskList';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [greeting, setGreeting] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Get display name from user
  const getDisplayName = () => {
    if (user?.first_name) return user.first_name;
    if (user?.email) {
      // Extract username from email (part before @)
      return user.email.split('@')[0];
    }
    return 'User';
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  useEffect(() => {
    // Only load stats when user is authenticated
    if (user) {
      loadStats();
    }
  }, [user]);

  async function loadStats() {
    try {
      const tasks = await api.getTasks();
      const completed = tasks.filter(t => t.status === 'completed').length;
      setStats({
        total: tasks.length,
        completed,
        pending: tasks.length - completed,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 glass dark:glass-dark backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex items-center space-x-2 sm:space-x-4 animate-slide-down min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-float flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent truncate">
                    Welcome, {getDisplayName()}!
                  </h1>
                  <p className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 truncate">{greeting} - Let's make today productive</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4 animate-slide-down flex-shrink-0">
                <div className="hidden lg:flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[150px]">{user?.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="group px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <span className="flex items-center space-x-1 sm:space-x-2">
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden sm:inline">Logout</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10 max-w-7xl mx-auto py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 animate-fade-in-up">
            {/* Total Tasks Card */}
            <div
              onClick={() => setFilter('all')}
              className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-6 border hover-lift cursor-pointer transition-all duration-300 ${
                filter === 'all'
                  ? 'border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/20'
                  : 'border-white/20 dark:border-gray-700/50'
              }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Total Tasks</p>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">{stats.total}</p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm">
                <span className="text-green-600 dark:text-green-400 font-medium">All time</span>
              </div>
            </div>

            {/* Completed Tasks Card */}
            <div
              onClick={() => setFilter('completed')}
              className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-6 border hover-lift cursor-pointer transition-all duration-300 ${
                filter === 'completed'
                  ? 'border-green-500 dark:border-green-400 ring-4 ring-green-500/20'
                  : 'border-white/20 dark:border-gray-700/50'
              }`}>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Completed</p>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 flex-shrink-0 ml-2">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 sm:mt-4">
                <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Pending Tasks Card */}
            <div
              onClick={() => setFilter('active')}
              className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-6 border hover-lift cursor-pointer sm:col-span-2 lg:col-span-1 transition-all duration-300 ${
                filter === 'active'
                  ? 'border-orange-500 dark:border-orange-400 ring-4 ring-orange-500/20'
                  : 'border-white/20 dark:border-gray-700/50'
              }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Pending</p>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm">
                <span className="text-orange-600 dark:text-orange-400 font-medium">Keep it up!</span>
              </div>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 dark:border-gray-700/50 animate-fade-in-up">
            <TaskList onTaskUpdate={loadStats} externalFilter={filter} onFilterChange={setFilter} />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
