import { STACK_COMPONENTS } from '@/lib/stackMap';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import styles from './StackOverview.module.css';

interface StackOverviewProps {
  docsUrl: string;
}

const STATUS_COPY = {
  planned: 'Planned',
  alpha: 'Alpha',
  beta: 'Beta',
  prod: 'Production'
} as const;

export function StackOverview({ docsUrl }: StackOverviewProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.subtitle}>Stack map</p>
        <h2 className={styles.title}>From Core primitives to the Prism desktop.</h2>
        <p className={styles.subtitle}>
          The OS spans Core identity and events, Operator runtime, typed APIs, and the Prism Console that keeps humans and agents
          in sync. Docs and Infra tie the whole Master Orchestration project together.
        </p>
        <Button href={docsUrl} variant="secondary" style={{ width: 'fit-content', marginTop: '0.6rem' }}>
          View the Owner&apos;s Manual
        </Button>
      </div>
      <div className={styles.grid}>
        {STACK_COMPONENTS.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.row}>
              <h3 className={styles.name}>{item.name}</h3>
              <Tag>{STATUS_COPY[item.status]}</Tag>
            </div>
            <div className={styles.layer}>{item.layer}</div>
            <p className={styles.description}>{item.description}</p>
            {item.repo ? (
              <a
                href={`https://github.com/${item.repo}`}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                View repo ↗
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
