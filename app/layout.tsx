import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { SiteLayout } from '@/components/Layout/SiteLayout';

export const metadata: Metadata = {
  title: 'BlackRoad OS',
  description:
    'BlackRoad OS is the desktop-style marketing shell that links Prism Console, docs, and the orchestration stack.',
  openGraph: {
    title: 'BlackRoad OS',
    description:
      'Public-facing web shell for the BlackRoad OS stack: Core, Operator, API, Prism, Web, Infra, Docs, and Agents.',
    type: 'website'
  },
  metadataBase: new URL('https://blackroad.systems')
};

export const viewport: Viewport = {
  themeColor: '#020008'
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
