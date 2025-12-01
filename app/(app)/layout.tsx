import { AppShell } from '@/components/layouts';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      userName="Alexa"
      currentSpace="my-road"
      notificationCount={3}
      variant="workspace"
    >
      {children}
    </AppShell>
  );
}
