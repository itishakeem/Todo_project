import { useState } from 'react';
import type { Task, TaskPriority } from '@/lib/types';

interface TaskItemProps {
  task: Task;
  onDelete: (taskId: number) => void;
  onToggleComplete: (taskId: number) => void;
  onUpdate: (taskId: number, title: string, description: string, priority: TaskPriority) => void;
}

export default function TaskItem({ task, onDelete, onToggleComplete, onUpdate }: TaskItemProps) {
  const isCompleted = task.status === 'completed';
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleUpdate = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, editTitle.trim(), editDescription.trim(), editPriority);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  // Format date
  const createdDate = new Date(task.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Priority badge colors
  const priorityColors = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800',
    low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800',
  };

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 backdrop-blur-sm overflow-hidden hover-lift">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

      {/* Shine effect */}
      <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-30 group-hover:animate-[shine_1s] pointer-events-none"></div>

      <div className="relative flex items-start gap-3 sm:gap-4">
        {/* Interactive Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className="flex-shrink-0 mt-0.5 sm:mt-1 transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-4 focus:ring-blue-500/30 rounded-xl active:scale-95"
        >
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl border-2 transition-all duration-500 ${
              isCompleted
                ? 'bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 border-transparent shadow-lg shadow-blue-500/50 rotate-0'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/20 hover:rotate-6 bg-white dark:bg-gray-700'
            } flex items-center justify-center`}
          >
            {isCompleted && (
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-bounce-in drop-shadow-lg"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
        </button>

        {/* Task content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
                className="w-full px-3 py-2 text-base sm:text-lg font-semibold bg-white dark:bg-gray-700 border-2 border-blue-500 dark:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description (optional)"
                rows={2}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white resize-none"
              />
              <div className="flex items-center gap-2">
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value as TaskPriority)}
                  className="px-3 py-1.5 text-xs font-bold uppercase bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p
                className={`text-base sm:text-lg font-semibold transition-all duration-500 ${
                  isCompleted
                    ? 'line-through text-gray-400 dark:text-gray-500 opacity-60'
                    : 'text-gray-900 dark:text-white'
                }`}
              >
                {task.title}
              </p>
              {task.description && (
                <p
                  className={`text-sm mt-1 transition-all duration-500 ${
                    isCompleted
                      ? 'line-through text-gray-400 dark:text-gray-500 opacity-60'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {task.description}
                </p>
              )}
            </div>
          )}

          {/* Tags and metadata */}
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2.5">
            {/* Priority badge */}
            <span
              className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm ${
                priorityColors[task.priority]
              } transition-all duration-300 hover:scale-110`}
            >
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 sm:mr-2 ${
                task.priority === 'high' ? 'bg-red-500 animate-pulse' :
                task.priority === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              }`}></span>
              {task.priority}
            </span>

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <>
                {task.tags.map((tag, idx) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <svg className="w-3 h-3 mr-1 sm:mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    {tag}
                  </span>
                ))}
              </>
            )}

            {/* Due date */}
            {task.due_date && (
              <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-medium text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 shadow-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(task.due_date).toLocaleDateString()}
              </span>
            )}

            {/* Created date */}
            <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 shadow-sm">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {createdDate}
            </span>
          </div>
        </div>

        {/* Action buttons (shown on hover on desktop, always visible on mobile) */}
        <div className="flex-shrink-0 flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 text-white bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
            title="Edit task"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 text-white bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-500/30"
            title="Delete task"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
