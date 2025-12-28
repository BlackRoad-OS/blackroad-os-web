'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Bot,
  Shield,
  Zap,
  ArrowRight,
  MessageSquare,
  Code,
  Brain,
  CheckCircle,
  Star,
  Github,
  Twitter
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';

const features = [
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Collaborate with specialized AI agents like Lucidia, Codex, and Aria for different tasks.',
  },
  {
    icon: Shield,
    title: 'Secure by Design',
    description: 'Enterprise-grade security with role-based access control and audit logging.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Real-time responses with optimized infrastructure for minimal latency.',
  },
  {
    icon: Code,
    title: 'Developer First',
    description: 'Built for developers with code generation, review, and debugging capabilities.',
  },
  {
    icon: Brain,
    title: 'Context Aware',
    description: 'Remembers your preferences and project context for personalized assistance.',
  },
  {
    icon: MessageSquare,
    title: 'Natural Conversations',
    description: 'Communicate naturally with AI that understands context and nuance.',
  },
];

const agents = [
  { name: 'Lucidia', role: 'General AI', color: 'from-blue-500 to-purple-600' },
  { name: 'Codex', role: 'Code Expert', color: 'from-green-500 to-emerald-600' },
  { name: 'Aria', role: 'Infrastructure', color: 'from-pink-500 to-rose-600' },
  { name: 'Sentinel', role: 'Security', color: 'from-red-500 to-orange-600' },
];

export default function LandingPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/workspace');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold">
                BlackRoad<span className="text-blue-400"> OS</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-700/50 rounded-full text-sm text-blue-300 mb-8">
            <Star className="h-4 w-4 fill-current" />
            <span>Powered by Next-Gen AI</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            The Future of
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Collaboration
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            BlackRoad OS brings together powerful AI agents to help you code, create, and collaborate.
            Experience the next generation of intelligent assistance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40"
            >
              Start Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl font-semibold text-lg transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Free tier available</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Enterprise ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meet Your AI Team</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Specialized agents ready to assist with any task
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className="relative group p-6 bg-gray-800/50 border border-gray-700 rounded-2xl hover:border-gray-600 transition-all"
              >
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:scale-110 transition-transform`}>
                  {agent.name[0]}
                </div>
                <h3 className="text-lg font-semibold">{agent.name}</h3>
                <p className="text-sm text-gray-400">{agent.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for the Future</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Everything you need to supercharge your workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 bg-gray-800/50 border border-gray-700 rounded-2xl hover:border-blue-500/50 transition-colors group"
                >
                  <div className="h-12 w-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600/30 transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 sm:p-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join thousands of developers and teams using BlackRoad OS to build the future.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started for Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="font-semibold">BlackRoad OS</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400">
              <Link href="/login" className="hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="hover:text-white transition-colors">
                Sign Up
              </Link>
            </div>
            <div className="flex items-center gap-4 text-gray-500">
              <a href="#" className="hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BlackRoad OS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
