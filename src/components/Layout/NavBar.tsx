'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CTA_DESTINATION, CTA_LABEL, DOCS_URL, NAV_LINKS } from '@/lib/routes';
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
        </div>

        <div className={styles.actions}>
          <a className={styles.docsLink} href={DOCS_URL} target="_blank" rel="noreferrer">
            Docs
          </a>
          <Link href={CTA_DESTINATION} className={styles.ctaButton}>
            {CTA_LABEL}
          </Link>
        </div>
      </div>
    </nav>
  );
}
