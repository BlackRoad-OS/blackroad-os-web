import { Card } from '../ui/Card';
import styles from './UseCases.module.css';

const USE_CASES = [
  {
    title: 'Ops & Infra',
    copy: 'Unified approvals, observability, and rollback paths keep every agent action governed across clusters and services.'
  },
  {
    title: 'Finance & ROI',
    copy: 'Treasury, FP&A, and Controller agents execute with PS-SHA∞ journals so CFOs see ROI and compliance in one place.'
  },
  {
    title: 'Agent Orchestration',
    copy: 'Operator routes tasks to the right agent with policies, queues, and replay buffers for deterministic decisioning.'
  },
  {
    title: 'Creators & Worlds',
    copy: 'Demo worlds, RoadChain explorers, and RoadWallet hooks make it easy to showcase the OS publicly.'
  }
];

export function UseCases() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Built for teams drowning in dashboards.</h2>
        <p className={styles.subtitle}>
          BlackRoad OS removes the cognitive overhead of juggling disconnected tools. Agents operate under policy, Prism tracks
          the truth, and Atlas safeguards your infra and finances.
        </p>
      </div>
      <div className={styles.grid}>
        {USE_CASES.map((item) => (
          <Card key={item.title} title={item.title} description={item.copy} />
        ))}
      </div>
    </section>
  );
}
