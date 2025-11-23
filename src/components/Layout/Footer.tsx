import Link from 'next/link';
import { DOCS_URL, GITHUB_URL } from '@/lib/routes';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>BR</span>
          <span>BlackRoad OS</span>
        </div>
        <div className={styles.links}>
          <Link className={styles.link} href="/legal/privacy">
            Privacy
          </Link>
          <Link className={styles.link} href="/legal/terms">
            Terms
          </Link>
          <a className={styles.link} href={DOCS_URL} target="_blank" rel="noreferrer">
            Docs
          </a>
          <a className={styles.link} href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <div className={styles.links}>
          <span>© {currentYear} BlackRoad OS. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
