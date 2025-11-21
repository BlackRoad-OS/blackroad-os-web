import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.meta}>
        <span className={styles.label}>&copy; {new Date().getFullYear()} BlackRoad OS</span>
        <span className="muted">Operational intelligence for modern systems.</span>
      </div>
      <div className={styles.meta}>
        <a
          className={styles.login}
          href="https://console.blackroad.systems"
          target="_blank"
          rel="noreferrer"
        >
          Operator Login
        </a>
      </div>
    </footer>
  );
}
