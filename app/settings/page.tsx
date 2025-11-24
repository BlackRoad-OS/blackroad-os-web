'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '',
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    agentAlerts: true,
    weeklyReports: false,
    securityAlerts: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'account', label: 'Account', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'billing', label: 'Billing', icon: '💳' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="mt-2 text-slate-400">Manage your account and preferences</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-6 text-2xl font-semibold text-white">Profile Settings</h2>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300">Profile Picture</label>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl font-bold text-white">
                        {profile.name.charAt(0)}
                      </div>
                      <button className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                        Change Avatar
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="mt-2 w-full rounded-md border border-slate-700 bg-slate-800/50 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="mt-2 w-full rounded-md border border-slate-700 bg-slate-800/50 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 font-medium text-white transition hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                      Save Changes
                    </button>
                    <button className="rounded-md border border-slate-700 px-6 py-2 font-medium text-white transition hover:bg-slate-800">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-6 text-2xl font-semibold text-white">Account Settings</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-md border border-slate-800 bg-slate-800/50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">Account Type</p>
                          <p className="text-sm text-slate-400">Team Plan - $99/month</p>
                        </div>
                        <Link
                          href="/pricing"
                          className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                        >
                          Upgrade
                        </Link>
                      </div>
                    </div>

                    <div className="rounded-md border border-slate-800 bg-slate-800/50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">API Keys</p>
                          <p className="text-sm text-slate-400">Manage your API access keys</p>
                        </div>
                        <button className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                          Manage Keys
                        </button>
                      </div>
                    </div>

                    <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-red-400">Delete Account</p>
                          <p className="text-sm text-red-300/70">Permanently delete your account and all data</p>
                        </div>
                        <button className="rounded-md border border-red-500 bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/30">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-6 text-2xl font-semibold text-white">Notification Preferences</h2>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-800/50 p-4">
                        <div>
                          <p className="font-medium text-white">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                          </p>
                          <p className="text-sm text-slate-400">
                            {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                            {key === 'agentAlerts' && 'Get alerts when agents encounter issues'}
                            {key === 'weeklyReports' && 'Receive weekly performance reports'}
                            {key === 'securityAlerts' && 'Get notified about security events'}
                          </p>
                        </div>
                        <button
                          onClick={() => setNotifications({ ...notifications, [key]: !value })}
                          className={`relative h-6 w-11 rounded-full transition ${
                            value ? 'bg-cyan-500' : 'bg-slate-700'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                              value ? 'left-5' : 'left-0.5'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-6 text-2xl font-semibold text-white">Security Settings</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-md border border-slate-800 bg-slate-800/50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">Change Password</p>
                          <p className="text-sm text-slate-400">Update your password regularly</p>
                        </div>
                        <button className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                          Change
                        </button>
                      </div>
                    </div>

                    <div className="rounded-md border border-slate-800 bg-slate-800/50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">Two-Factor Authentication</p>
                          <p className="text-sm text-green-400">Enabled</p>
                        </div>
                        <button className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                          Configure
                        </button>
                      </div>
                    </div>

                    <div className="rounded-md border border-slate-800 bg-slate-800/50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">Active Sessions</p>
                          <p className="text-sm text-slate-400">3 active sessions</p>
                        </div>
                        <button className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                          View All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-6 text-2xl font-semibold text-white">Billing & Subscription</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-md border border-slate-800 bg-slate-800/50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">Current Plan</p>
                          <p className="text-sm text-slate-400">Team - $99/month</p>
                        </div>
                        <Link
                          href="/pricing"
                          className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                        >
                          Change Plan
                        </Link>
                      </div>
                    </div>

                    <div className="rounded-md border border-slate-800 bg-slate-800/50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">Payment Method</p>
                          <p className="text-sm text-slate-400">•••• •••• •••• 4242</p>
                        </div>
                        <button className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                          Update
                        </button>
                      </div>
                    </div>

                    <div className="rounded-md border border-slate-800 bg-slate-800/50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">Billing History</p>
                          <p className="text-sm text-slate-400">View past invoices</p>
                        </div>
                        <button className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                          View Invoices
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
