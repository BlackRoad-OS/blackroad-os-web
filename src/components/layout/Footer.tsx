import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.meta}>
        <span className={styles.label}>BlackRoad OS web</span>
        <span className="muted">Railway & Cloudflare ready</span>
      </div>
      <div className={styles.meta}>
        <span className="muted">Status:</span>
        <span className={styles.badge}>alpha</span>
      </div>
    </footer>
  );
}
