import type { ReactNode } from 'react';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.brAppRoot}>
      <div className={styles.brFrameShell}>
        <div className={styles.brFrameInner}>
          <div className={styles.brContent}>{children}</div>
        </div>
      </div>
    </div>
  );
}
