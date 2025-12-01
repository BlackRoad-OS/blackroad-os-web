'use client';

import Link from 'next/link';

interface TopBarProps {
  userName: string;
  notificationCount: number;
  onToggleSidebar: () => void;
  onToggleCece: () => void;
  variant: 'workspace' | 'console';
}

export function TopBar({
  userName,
  notificationCount,
  onToggleSidebar,
  onToggleCece,
  variant,
}: TopBarProps) {
  const isConsole = variant === 'console';

  return (
    <header className="flex h-12 items-center justify-between border-b border-br-border bg-br-surface px-4">
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded p-1.5 text-br-text-muted hover:bg-br-surface-2 hover:text-br-text"
          aria-label="Toggle sidebar"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-br-hot-pink to-br-vivid-purple text-xs font-bold text-white">
            BR
          </span>
          <span className="text-sm font-semibold text-br-text">
            {isConsole ? 'OPERATOR CONSOLE' : 'BlackRoad'}
          </span>
        </Link>

        {/* Environment picker for console */}
        {isConsole && (
          <div className="ml-4 flex items-center gap-2">
            <span className="text-xs text-br-text-muted">ENV:</span>
            <select className="rounded border border-br-border bg-br-surface-2 px-2 py-1 text-xs text-br-text">
              <option>Production</option>
              <option>Staging</option>
              <option>Development</option>
            </select>
          </div>
        )}
      </div>

      {/* Center: Search */}
      <div className="hidden flex-1 justify-center md:flex">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search or ⌘K..."
            className="w-full rounded-lg border border-br-border bg-br-surface-2 px-4 py-1.5 pl-9 text-sm text-br-text placeholder:text-br-text-muted focus:border-br-hot-pink focus:outline-none focus:ring-1 focus:ring-br-hot-pink"
          />
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-br-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Cece Toggle */}
        <button
          onClick={onToggleCece}
          className="rounded p-1.5 text-br-text-muted hover:bg-br-surface-2 hover:text-br-hot-pink"
          aria-label="Toggle Cece"
          title="Toggle Cece (⌘/)"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>

        {/* Notifications */}
        <button
          className="relative rounded p-1.5 text-br-text-muted hover:bg-br-surface-2 hover:text-br-text"
          aria-label="Notifications"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {notificationCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-br-hot-pink text-[10px] font-bold text-white">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        {/* User Menu */}
        <button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-br-surface-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-br-sunrise-orange to-br-hot-pink text-xs font-bold text-white">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="hidden text-sm text-br-text md:inline">{userName}</span>
          <svg className="h-4 w-4 text-br-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </header>
  );
}
