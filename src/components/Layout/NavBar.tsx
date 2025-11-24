'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CONTACT_URL, DOCS_URL, NAV_LINKS, PRISM_URL } from '@/lib/routes';
import styles from './NavBar.module.css';

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.brand} aria-label="BlackRoad OS home">
          <span className={styles.brandMark}>BR</span>
          <span>BlackRoad OS</span>
        </Link>

        <div className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`.trim()}
            >
              {link.label}
            </Link>
          ))}
          {NAV_LINKS.map((link) => {
            if (link.external) {
              return (
                <a key={link.href} href={link.href} className={styles.navLink} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`.trim()}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className={styles.actions}>
          <a className={styles.docsLink} href={DOCS_URL} target="_blank" rel="noreferrer">
            Docs
          </a>
          <a className={styles.ctaButton} href={PRISM_URL} target="_blank" rel="noreferrer">
            Prism Console
          </a>
          <a className={styles.docsLink} href={CONTACT_URL} target="_blank" rel="noreferrer">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
