import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System Status - BlackRoad OS',
  description: 'BlackRoad OS service status overview',
};

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return children;
}
