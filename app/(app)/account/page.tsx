'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Bell,
  Palette,
  Globe,
  CreditCard,
  Trash2,
  Save,
  Camera,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { useThemeStore } from '@/stores/theme-store';
import { toast } from '@/stores/toast-store';
import { cn } from '@/lib/cn';

export default function AccountPage() {
  const user = useAuthStore((state) => state.user);
  const { theme, setTheme } = useThemeStore();
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    conversationAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
  });

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'danger', label: 'Danger Zone', icon: AlertCircle },
  ];

  const handleSave = () => {
    toast.success('Settings saved', 'Your changes have been saved successfully');
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match', 'Please ensure both passwords are the same');
      return;
    }
    if (formData.newPassword.length < 8) {
      toast.error('Password too short', 'Password must be at least 8 characters');
      return;
    }
    toast.success('Password updated', 'Your password has been changed successfully');
    setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your profile, security, and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-l-2 border-blue-600'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-l-2 border-transparent',
                      section.id === 'danger' && !isActive && 'text-red-600 dark:text-red-400'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1">
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700">
                        <Camera className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</p>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-medium text-sm"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Change Password</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      onClick={handlePasswordChange}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-medium text-sm"
                    >
                      <Lock className="h-4 w-4" />
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button
                      onClick={() => toast.info('Coming soon', '2FA setup will be available soon')}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your account' },
                    { key: 'conversationAlerts', label: 'Conversation Alerts', desc: 'Get notified when agents respond' },
                    { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important security updates and login alerts' },
                    { key: 'marketingEmails', label: 'Marketing Emails', desc: 'News, updates, and promotional content' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => {
                          setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }));
                          toast.success('Preference updated');
                        }}
                        className={cn(
                          'relative w-11 h-6 rounded-full transition-colors',
                          notifications[item.key as keyof typeof notifications]
                            ? 'bg-blue-600'
                            : 'bg-gray-300 dark:bg-gray-600'
                        )}
                      >
                        <span
                          className={cn(
                            'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm',
                            notifications[item.key as keyof typeof notifications] && 'translate-x-5'
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preferences Section */}
            {activeSection === 'preferences' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Appearance</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Theme
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['light', 'dark', 'system'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          className={cn(
                            'px-4 py-3 rounded-lg border-2 font-medium text-sm capitalize transition-colors',
                            theme === t
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                              : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Language
                    </label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Section */}
            {activeSection === 'billing' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Billing & Subscription</h2>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-blue-900 dark:text-blue-200">Free Plan</p>
                      <p className="text-sm text-blue-700 dark:text-blue-400">You&apos;re currently on the free tier</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-medium text-sm">
                      Upgrade
                    </button>
                  </div>
                </div>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No payment methods on file</p>
                  <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    Add payment method
                  </button>
                </div>
              </div>
            )}

            {/* Danger Zone */}
            {activeSection === 'danger' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-900 p-6">
                <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-start gap-4">
                      <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-red-900 dark:text-red-200">Delete Account</p>
                        <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <button
                          onClick={() => toast.warning('Are you sure?', 'This action cannot be undone')}
                          className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
