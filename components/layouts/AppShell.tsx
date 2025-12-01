'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { CecePanel } from './CecePanel';

interface AppShellContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  cecePanelOpen: boolean;
  setCecePanelOpen: (open: boolean) => void;
}

const AppShellContext = createContext<AppShellContextType | null>(null);

export function useAppShell() {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error('useAppShell must be used within AppShell');
  return ctx;
}

interface AppShellProps {
  children: ReactNode;
  /** Current user name */
  userName?: string;
  /** Current space/project context */
  currentSpace?: string;
  /** Notification count */
  notificationCount?: number;
  /** Variant: 'workspace' for app, 'console' for operator */
  variant?: 'workspace' | 'console';
}

export function AppShell({
  children,
  userName = 'User',
  currentSpace,
  notificationCount = 0,
  variant = 'workspace',
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cecePanelOpen, setCecePanelOpen] = useState(true);

  return (
    <AppShellContext.Provider
      value={{ sidebarOpen, setSidebarOpen, cecePanelOpen, setCecePanelOpen }}
    >
      <div className="flex h-screen flex-col bg-br-bg">
        {/* Top Bar */}
        <TopBar
          userName={userName}
          notificationCount={notificationCount}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onToggleCece={() => setCecePanelOpen(!cecePanelOpen)}
          variant={variant}
        />

        {/* Main Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          {sidebarOpen && (
            <Sidebar variant={variant} currentSpace={currentSpace} />
          )}

          {/* Main Canvas */}
          <main className="flex-1 overflow-auto bg-br-bg p-6">{children}</main>

          {/* Right Panel (Cece) */}
          {cecePanelOpen && <CecePanel variant={variant} />}
        </div>
      </div>
    </AppShellContext.Provider>
  );
}
