'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Shield, Cpu, Globe, Sparkles, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-black to-violet-950/20 pointer-events-none" />
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-hot-pink/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <header className="relative z-50 border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-hot-pink to-violet-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-semibold">
              BlackRoad<span className="bg-gradient-to-r from-hot-pink to-electric-blue bg-clip-text text-transparent"> OS</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link>
            <Link href="#agents" className="text-gray-400 hover:text-white transition-colors">Agents</Link>
            <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="text-gray-400 hover:text-white transition-colors">Sign In</Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 bg-gradient-to-r from-hot-pink to-violet-600 hover:from-hot-pink/90 hover:to-violet-600/90 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-hot-pink/25"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-gray-300">Powered by Advanced AI Orchestration</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Build the Future with{' '}
            <span className="bg-gradient-to-r from-amber-500 via-hot-pink to-electric-blue bg-clip-text text-transparent">
              AI Agents
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Deploy autonomous AI agents at scale. BlackRoad OS provides the infrastructure
            to orchestrate, govern, and monitor thousands of intelligent agents.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-hot-pink to-violet-600 rounded-xl font-semibold text-lg transition-all hover:shadow-xl hover:shadow-hot-pink/30 hover:scale-105"
            >
              Start Building
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 rounded-xl font-semibold text-lg transition-all hover:bg-white/5"
            >
              Learn More
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-white/10">
          {[
            { value: '30K+', label: 'Active Agents' },
            { value: '15', label: 'Organizations' },
            { value: '99.9%', label: 'Uptime' },
            { value: '< 50ms', label: 'Latency' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 to-hot-pink bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-500 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-electric-blue to-violet-500 bg-clip-text text-transparent">
                Scale AI
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Enterprise-grade infrastructure for deploying and managing AI agent fleets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: 'Agent Orchestration',
                description: 'Deploy and manage thousands of AI agents with automated scaling and load balancing.',
                gradient: 'from-amber-500 to-orange-600',
              },
              {
                icon: Shield,
                title: 'Governance & Safety',
                description: 'Built-in guardrails, audit logging, and policy enforcement for responsible AI deployment.',
                gradient: 'from-hot-pink to-violet-600',
              },
              {
                icon: Zap,
                title: 'Real-time Monitoring',
                description: 'Live dashboards, performance metrics, and alerting for complete observability.',
                gradient: 'from-electric-blue to-cyan-500',
              },
              {
                icon: Globe,
                title: 'Global Edge Network',
                description: 'Deploy agents across 200+ edge locations for minimal latency worldwide.',
                gradient: 'from-violet-500 to-purple-600',
              },
              {
                icon: Sparkles,
                title: 'Multi-Model Support',
                description: 'Seamlessly integrate with Claude, GPT, Llama, and custom models.',
                gradient: 'from-amber-500 to-hot-pink',
              },
              {
                icon: ArrowRight,
                title: 'API-First Design',
                description: 'RESTful APIs and SDKs for TypeScript, Python, Go, and Rust.',
                gradient: 'from-electric-blue to-violet-600',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.07]"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section id="agents" className="relative z-10 py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Your <span className="bg-gradient-to-r from-amber-500 to-hot-pink bg-clip-text text-transparent">AI Agents</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Specialized agents working together to power your infrastructure.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'CECE', role: 'Orchestrator', color: 'from-hot-pink to-violet-600' },
              { name: 'Lucidia', role: 'AI Inference', color: 'from-electric-blue to-cyan-500' },
              { name: 'Mercury', role: 'Revenue Ops', color: 'from-amber-500 to-orange-600' },
              { name: 'Guardian', role: 'Security', color: 'from-violet-500 to-purple-600' },
              { name: 'Athena', role: 'Strategy', color: 'from-hot-pink to-electric-blue' },
              { name: 'Roadie', role: 'Navigator', color: 'from-amber-500 to-hot-pink' },
              { name: 'Radius', role: 'Network Ops', color: 'from-electric-blue to-violet-600' },
              { name: 'RoadMind', role: 'Coordinator', color: 'from-violet-500 to-hot-pink' },
            ].map((agent) => (
              <div key={agent.name} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} mb-4 flex items-center justify-center`}>
                  <span className="text-xl font-bold">{agent.name[0]}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{agent.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{agent.role}</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-400 uppercase tracking-wider">online</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, <span className="bg-gradient-to-r from-electric-blue to-violet-500 bg-clip-text text-transparent">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Start free, scale as you grow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-3">Free</div>
              <p className="text-gray-400 mb-6">Perfect for experimentation</p>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li>✓ 5 AI Agents</li>
                <li>✓ 10K API calls/mo</li>
                <li>✓ Community support</li>
              </ul>
              <Link href="/signup" className="block text-center py-3 rounded-lg font-medium bg-white/10 hover:bg-white/15 transition-all">Get Started</Link>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-hot-pink/10 to-violet-600/10 border border-hot-pink/50 scale-105">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="flex items-baseline gap-1 mb-3"><span className="text-4xl font-bold">$99</span><span className="text-gray-400">/mo</span></div>
              <p className="text-gray-400 mb-6">For growing teams</p>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li>✓ 100 AI Agents</li>
                <li>✓ 1M API calls/mo</li>
                <li>✓ Priority support</li>
                <li>✓ Advanced analytics</li>
              </ul>
              <Link href="/signup" className="block text-center py-3 rounded-lg font-medium bg-gradient-to-r from-hot-pink to-violet-600 hover:shadow-lg transition-all">Start Pro Trial</Link>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="text-4xl font-bold mb-3">Custom</div>
              <p className="text-gray-400 mb-6">For large organizations</p>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li>✓ Unlimited Agents</li>
                <li>✓ Unlimited API calls</li>
                <li>✓ Dedicated support</li>
                <li>✓ SLA guarantee</li>
              </ul>
              <Link href="/signup" className="block text-center py-3 rounded-lg font-medium bg-white/10 hover:bg-white/15 transition-all">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Join the next generation of AI-powered organizations.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-hot-pink to-violet-600 rounded-xl font-semibold text-lg transition-all hover:shadow-xl hover:shadow-hot-pink/30 hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 via-hot-pink to-violet-600" />
              <span className="font-semibold">BlackRoad OS</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2026 BlackRoad OS, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .text-hot-pink { color: #FF1D6C; }
        .bg-hot-pink { background-color: #FF1D6C; }
        .from-hot-pink { --tw-gradient-from: #FF1D6C; }
        .to-hot-pink { --tw-gradient-to: #FF1D6C; }
        .via-hot-pink { --tw-gradient-via: #FF1D6C; }
        .shadow-hot-pink\\/25 { --tw-shadow-color: rgba(255, 29, 108, 0.25); }
        .shadow-hot-pink\\/30 { --tw-shadow-color: rgba(255, 29, 108, 0.30); }
        .text-electric-blue { color: #2979FF; }
        .from-electric-blue { --tw-gradient-from: #2979FF; }
        .to-electric-blue { --tw-gradient-to: #2979FF; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
}
