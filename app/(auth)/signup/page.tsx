'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';

export default function SignupPage() {
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains a letter', met: /[a-zA-Z]/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      await signup(email, password, name);
      router.push('/workspace');
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-800/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">
            BlackRoad<span className="text-blue-400"> OS</span>
          </h1>
          <h2 className="mt-4 text-xl font-semibold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Start collaborating with AI today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg bg-red-900/30 border border-red-800 p-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
                {/* Password requirements */}
                <div className="mt-3 space-y-1">
                  {passwordRequirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-2 text-xs">
                      <div className={`h-4 w-4 rounded-full flex items-center justify-center ${req.met ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-500'}`}>
                        {req.met && <Check className="h-3 w-3" />}
                      </div>
                      <span className={req.met ? 'text-green-400' : 'text-gray-500'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-400">Already have an account? </span>
          <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
            Sign in
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          {['AI Agents', 'Secure', 'Fast'].map((feature) => (
            <div key={feature} className="text-center">
              <div className="h-10 w-10 mx-auto rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center mb-2">
                <Check className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-xs text-gray-400">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
