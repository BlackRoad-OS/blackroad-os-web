import type { ReactNode } from 'react';
import styles from './SiteLayout.module.css';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

interface SiteLayoutProps {
  title?: string;
  children: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className={styles.shell}>
      <NavBar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
