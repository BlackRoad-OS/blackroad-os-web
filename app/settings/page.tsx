import { InfoCard } from '@/components/primitives/InfoCard';
import styles from '../page.module.css';

export default function SettingsPage() {
  return (
    <div className={styles.page}>
      <InfoCard
        title="Settings"
        description="Configure auth, endpoints, and user preferences for BlackRoad OS."
      >
        <p className="muted">Settings controls will live here.</p>
      </InfoCard>
    </div>
  );
}
