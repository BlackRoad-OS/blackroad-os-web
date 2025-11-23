import { DesktopShell } from '../layout/DesktopShell';
import { Button } from '../ui/Button';
import styles from './Hero.module.css';

interface HeroProps {
  prismUrl: string;
  docsUrl: string;
  contactUrl: string;
}

const HERO_METRICS = [
  {
    title: '10,000+ virtual employees',
    subtitle: 'Compose domain agents with Core + Operator'
  },
  {
    title: 'Immutable audit',
    subtitle: 'RoadChain hashes every decision'
  },
  {
    title: 'Human in the loop',
    subtitle: 'Prism approvals + policy guardrails'
  }
];

export function Hero({ prismUrl, docsUrl, contactUrl }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div>
        <span className={styles.eyebrow}>BlackRoad OS • Orchestration desktop</span>
        <h1 className={styles.title}>Orchestrate agents, infra, and finance from one BlackRoad desktop.</h1>
        <p className={styles.subtitle}>
          BlackRoad OS is a desktop-style shell for operating thousands of AI agents with PS-SHA∞ identity, RoadChain audit,
          and policy-driven finance. Prism keeps humans in control while Atlas watches your infra.
        </p>
        <div className={styles.actions}>
          <Button href={prismUrl}>Open Prism Console</Button>
          <Button href={docsUrl} variant="secondary">
            Read the Docs
          </Button>
          <Button href={contactUrl} variant="ghost">
            Talk to us
          </Button>
        </div>
        <div className={styles.metrics}>
          {HERO_METRICS.map((metric) => (
            <div key={metric.title} className={styles.metric}>
              <p className={styles.metricTitle}>{metric.title}</p>
              <p className={styles.metricSubtitle}>{metric.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
      <DesktopShell prismUrl={prismUrl} docsUrl={docsUrl} />
    </section>
  );
}
