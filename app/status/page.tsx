import styles from './page.module.css';
import { StatusWidget } from '@/components/status/StatusWidget';

export default function StatusPage() {
  return (
    <div className={styles.page}>
      <section className={`panel ${styles.hero}`}>
        <p className="muted">Live status</p>
        <h1>BlackRoad OS Status</h1>
        <p className={styles.subtitle}>
          Real-time visibility into public-facing services. Data is pulled from the status endpoint
          when available, with automatic fallback to core health.
        </p>
      </section>

      <section className={`panel ${styles.section}`}>
        <StatusWidget showServices />
      </section>
    </div>
  );
}
