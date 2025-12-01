import type { Metadata } from 'next';
import './globals.css';
import { siteMetadata } from '../lib/metadata';
import { PlausibleProvider } from '../lib/plausible';
import CookieConsent from '../components/CookieConsent';

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-br-bg text-br-text">
      <body className="min-h-screen bg-br-bg text-br-text antialiased font-sans">
        <PlausibleProvider>
          {children}
          <CookieConsent />
        </PlausibleProvider>
      </body>
    </html>
  );
}
