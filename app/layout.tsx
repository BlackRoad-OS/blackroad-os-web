import type { Metadata } from 'next';
import './globals.css';
import { siteMetadata } from '../lib/metadata';
import { PlausibleProvider } from '../lib/plausible';
import NavBar from '../components/NavBar';
import CookieConsent from '../components/CookieConsent';

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-50">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased font-sans">
        <PlausibleProvider>
          <div className="flex min-h-screen flex-col">
            <NavBar />
            <main className="flex-1">{children}</main>
          </div>
          <CookieConsent />
        </PlausibleProvider>
      </body>
    </html>
  );
}
