import styles from './page.module.css';
import { StatusWidget } from '@/components/status/StatusWidget';

const consoleUrl = process.env.NEXT_PUBLIC_CONSOLE_URL || 'https://console.blackroad.systems';
const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.blackroad.systems';

const pillars = [
  {
    title: 'Orchestration',
    description: 'Coordinated workflows for agents, services, and ledger-aware actions.'
  },
  {
    title: 'Observability',
    description: 'Built-in telemetry, health, and audit layers to keep operators in control.'
  },
  {
    title: 'Compliance',
    description: 'Policy-driven safeguards that keep the platform aligned with governance.'
  }
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={`panel ${styles.hero}`}>
        <p className="muted">BlackRoad Operating System</p>
        <h1>BlackRoad OS</h1>
        <p className={styles.subtitle}>
          The operations layer for secure, ledger-native automation. Build, observe, and control the
          BlackRoad stack from a single, trusted interface.
        </p>
        <div className={styles.ctaRow}>
          <a className={styles.ctaButton} href={consoleUrl} target="_blank" rel="noreferrer">
            View Console
          </a>
          <a className={styles.ctaButtonSecondary} href={docsUrl} target="_blank" rel="noreferrer">
            Read Docs
          </a>
        </div>
      </section>

      <section className={`panel ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div>
            <p className="muted">Platform overview</p>
            <h2>What is BlackRoad OS?</h2>
            <p className={styles.subtitle}>
              A cohesive runtime that spans the core ledger, operator services, web interfaces, and
              console workflows.
            </p>
          </div>
        </div>
        <div className={styles.cardGrid}>
          {pillars.map((pillar) => (
            <div key={pillar.title} className={styles.card}>
              <h3>{pillar.title}</h3>
              <p className="muted">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`panel ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div>
            <p className="muted">Live telemetry</p>
            <h2>System Snapshot</h2>
            <p className={styles.subtitle}>
              Quick glance at the public-facing services powering BlackRoad OS.
            </p>
          </div>
        </div>
        <StatusWidget />
      </section>
    </div>
  );
}
