'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const navItems = [
  { href: '/', label: 'Home', external: false },
  { href: '/os', label: 'OS', external: false },
  { href: '/stack', label: 'Stack', external: false },
  { href: '/brand/kit', label: 'Brand Kit', external: false },
  { href: '/status', label: 'Status', external: false },
  { href: 'https://docs.blackroad.systems', label: 'Docs', external: true }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>BlackRoad OS</div>
      <nav className={styles.nav}>
        {navItems.map((item) =>
          item.external ? (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? styles.active : undefined}
            >
              {item.label}
            </Link>
          )
        )}
      </nav>
    </header>
  );
}
