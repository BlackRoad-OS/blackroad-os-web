'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Sparkles, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center max-w-xl mx-auto">
        {/* Logo */}
        <div className="inline-flex items-center justify-center gap-2 mb-8">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-[150px] sm:text-[200px] font-bold leading-none bg-gradient-to-b from-gray-200 to-gray-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Page not found
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-600/30"
          >
            <Home className="h-5 w-5" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-xl font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500 mb-4">Looking for something?</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="/workspace"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Conversations
            </Link>
            <span className="text-gray-700">•</span>
            <Link
              href="/agents"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              AI Agents
            </Link>
            <span className="text-gray-700">•</span>
            <Link
              href="/account"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Account Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
