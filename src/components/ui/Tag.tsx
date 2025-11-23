import type { ReactNode } from 'react';
import styles from './Tag.module.css';

interface TagProps {
  children: ReactNode;
  tone?: 'default' | 'success' | 'warning';
}

export function Tag({ children }: TagProps) {
  return (
    <span className={styles.tag}>
      <span className={styles.dot} aria-hidden />
      {children}
    </span>
  );
}
