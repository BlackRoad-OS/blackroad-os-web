'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { appConfig } from '@/config';
import styles from './Header.module.css';

const nav = [
  { href: '/', label: 'Home' },
  {
    href: appConfig.nextPublicConsoleUrl || '/console',
    label: 'Console'
  },
  {
    href: appConfig.nextPublicDocsUrl || '/docs',
    label: 'Docs'
  }
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>BlackRoad OS</div>
      <nav className={styles.nav}>
        {nav.map((item) => (
          <Link
            key={item.href}
            className={pathname === item.href ? styles.active : undefined}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
