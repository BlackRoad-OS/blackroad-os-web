import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { SiteLayout } from '@/components/Layout/SiteLayout';

export const metadata: Metadata = {
  title: 'BlackRoad OS',
  description: 'BlackRoad OS is an AI-first operating system that lets one human orchestrator run 10,000+ virtual employees safely in regulated environments.'
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
