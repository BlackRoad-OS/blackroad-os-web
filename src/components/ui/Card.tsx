import type { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  icon?: ReactNode;
  description?: string;
  children?: ReactNode;
}

export function Card({ title, icon, description, children }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.glow} />
      <div className={styles.content}>
        <div className={styles.heading}>
          {icon}
          <h3 className={styles.title}>{title}</h3>
        </div>
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
    </div>
  );
}
