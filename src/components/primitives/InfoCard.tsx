import styles from './InfoCard.module.css';

interface InfoCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function InfoCard({ title, description, children }: InfoCardProps) {
  return (
    <div className={`${styles.card} panel`}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {description ? <p className="muted">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
