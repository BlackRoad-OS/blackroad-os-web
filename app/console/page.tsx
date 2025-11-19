import { InfoCard } from '@/components/primitives/InfoCard';
import styles from '../page.module.css';

export default function ConsolePage() {
  return (
    <div className={styles.page}>
      <InfoCard
        title="Console"
        description="Extend this space with live agent monitoring, logs, and admin controls."
      >
        <p className="muted">Wire your console UI here.</p>
      </InfoCard>
    </div>
  );
}
