'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

/**
 * Universe Domain Links
 * In production, these will be full URLs to subdomains.
 * In local dev, they're relative paths for easy testing.
 *
 * TODO: When deploying with proper DNS:
 * - APP_URL → https://app.blackroad.io
 * - CONSOLE_URL → https://console.blackroad.io
 * - DOCS_URL → https://docs.blackroad.io
 */
const APP_URL = '/workspace';
const CONSOLE_URL = '/console';
const DOCS_URL = '/docs';

const navLinks = [
  { href: '/', label: 'Product' },
  { href: '/pricing', label: 'Pricing' },
  { href: DOCS_URL, label: 'Docs' },
  { href: '/blog', label: 'Blog' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-br-border bg-br-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-br-text">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-br-hot-pink to-br-vivid-purple text-sm font-bold">
            BR
          </span>
          <span className="hidden sm:inline">BlackRoad</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-br-hot-pink'
                    : 'text-br-text-muted hover:text-br-text'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Auth + App Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={CONSOLE_URL}
            className="rounded-full px-4 py-2 text-sm font-medium text-br-text-muted transition hover:text-br-text"
          >
            Console
          </Link>
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-br-text-muted transition hover:text-br-text"
          >
            Sign in
          </Link>
          <Link
            href={APP_URL}
            className="rounded-full bg-gradient-to-r from-br-hot-pink to-br-vivid-purple px-4 py-2 text-sm font-medium text-white transition hover:shadow-glow-pink"
          >
            Open App
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6 text-br-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-br-border bg-br-bg md:hidden">
          <div className="flex flex-col gap-2 px-6 py-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-br-surface text-br-hot-pink'
                      : 'text-br-text-muted hover:bg-br-surface hover:text-br-text'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 flex flex-col gap-2 border-t border-br-border pt-4">
              <Link
                href={CONSOLE_URL}
                className="rounded-md px-3 py-2 text-center text-sm font-medium text-br-text-muted hover:bg-br-surface hover:text-br-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                Console
              </Link>
              <Link
                href="/login"
                className="rounded-md px-3 py-2 text-center text-sm font-medium text-br-text-muted hover:bg-br-surface hover:text-br-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href={APP_URL}
                className="rounded-md bg-gradient-to-r from-br-hot-pink to-br-vivid-purple px-3 py-2 text-center text-sm font-medium text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Open App
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
