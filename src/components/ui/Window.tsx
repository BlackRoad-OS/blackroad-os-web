import type { ReactNode } from 'react';
import styles from './Window.module.css';

interface WindowProps {
  title: string;
  icon?: ReactNode;
  subtitle?: string;
  children: ReactNode;
}

export function Window({ title, icon, subtitle, children }: WindowProps) {
  return (
    <div className={styles.window}>
      <div className={styles.titleBar}>
        <div className={styles.controls} aria-hidden>
          <span className={styles.control} />
        </div>
        <div>
          <p className={styles.title}>
            {icon}
            {title}
          </p>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
