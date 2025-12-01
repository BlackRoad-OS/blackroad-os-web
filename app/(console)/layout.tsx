import { AppShell } from '@/components/layouts';

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      userName="Alexa"
      notificationCount={2}
      variant="console"
    >
      {children}
    </AppShell>
  );
}
