'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/console', label: 'Console' },
  { href: '/settings', label: 'Settings' }
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
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
