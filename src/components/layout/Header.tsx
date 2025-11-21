'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { appConfig } from '@/config';
import styles from './Header.module.css';

const nav = [
  { href: '/', label: 'Home', external: false },
  {
    href: appConfig.nextPublicConsoleUrl || '/console',
    label: 'Console',
    external: !!appConfig.nextPublicConsoleUrl?.startsWith('http')
  },
  {
    href: appConfig.nextPublicDocsUrl || '/docs',
    label: 'Docs',
    external: !!appConfig.nextPublicDocsUrl?.startsWith('http')
  }
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>BlackRoad OS</div>
      <nav className={styles.nav}>
        {nav.map((item) => {
          if (item.external) {
            return (
              <a
                key={item.href}
                className={styles.navLink}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            );
          }
          return (
            <Link
              key={item.href}
              className={pathname === item.href ? styles.active : undefined}
              href={item.href as any}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
