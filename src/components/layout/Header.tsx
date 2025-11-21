'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { appConfig } from '@/config';
import styles from './Header.module.css';

type NavItem = {
  href: string;
  label: string;
  isExternal: boolean;
};

const nav: NavItem[] = [
  { href: '/', label: 'Home', isExternal: false },
  {
    href: appConfig.nextPublicConsoleUrl || '/console',
    label: 'Console',
    isExternal: !!(appConfig.nextPublicConsoleUrl && appConfig.nextPublicConsoleUrl.startsWith('http'))
  },
  {
    href: appConfig.nextPublicDocsUrl || '/docs',
    label: 'Docs',
    isExternal: !!(appConfig.nextPublicDocsUrl && appConfig.nextPublicDocsUrl.startsWith('http'))
  }
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>BlackRoad OS</div>
      <nav className={styles.nav}>
        {nav.map((item) => {
          // For external URLs, use a regular anchor tag
          if (item.isExternal) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            );
          }
          
          // For internal routes, use Next.js Link
          // Type assertion needed because external URLs can't be validated at compile time
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
