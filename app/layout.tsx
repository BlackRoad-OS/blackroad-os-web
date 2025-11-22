import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import './styles/brand.css';
import { AppShell } from '@/components/layout/AppShell';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'BlackRoad OS — Web',
  description: 'Browser-native interface for BlackRoad OS.'
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
