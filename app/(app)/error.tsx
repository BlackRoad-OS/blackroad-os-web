'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home, Bug } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          An unexpected error occurred. Please try again or go back home.
        </p>

        {/* Error details */}
        <details className="mb-6 text-left bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <summary className="cursor-pointer flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Bug className="h-4 w-4" />
            Error details
          </summary>
          <div className="mt-3 p-3 bg-gray-200 dark:bg-gray-700 rounded-md overflow-auto">
            <pre className="text-xs text-red-600 dark:text-red-400 whitespace-pre-wrap">
              {error.message}
            </pre>
            {error.digest && (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </details>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors w-full sm:w-auto"
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </button>
          <a
            href="/workspace"
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors w-full sm:w-auto justify-center"
          >
            <Home className="h-4 w-4" />
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
