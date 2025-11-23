import styles from './Hero.module.css';

interface Metric {
  title: string;
  description: string;
}

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  metrics: Metric[];
}

export function Hero({ title, subtitle, primaryCta, secondaryCta, metrics }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div>
          <div className={styles.ribbon}>
            AI-first operating system • 10,000+ virtual employees • One orchestrator
          </div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.actions}>
            <a className="cta-button" href={primaryCta.href}>
              {primaryCta.label}
            </a>
            <a className="cta-button secondary" href={secondaryCta.href}>
              {secondaryCta.label}
            </a>
          </div>
          <div className={styles.metrics}>
            {metrics.map((metric) => (
              <div key={metric.title} className={styles.metricCard}>
                <div>
                  <p className={styles.metricTitle}>{metric.title}</p>
                  <p className={styles.metricCopy}>{metric.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.graphic} aria-label="BlackRoad OS architecture overview">
          <div className={styles.diagramTitle}>Operational architecture</div>
          <ul className={styles.diagramList}>
            <li className={styles.diagramItem}>
              <span>OS Core</span>
              <span className={styles.tag}>Ledger + event bus</span>
            </li>
            <li className={styles.diagramItem}>
              <span>Operator</span>
              <span className={styles.tag}>Policies + orchestration</span>
            </li>
            <li className={styles.diagramItem}>
              <span>Prism Console</span>
              <span className={styles.tag}>Audit-ready console</span>
            </li>
            <li className={styles.diagramItem}>
              <span>Automated Finance</span>
              <span className={styles.tag}>CFO stack in agents</span>
            </li>
            <li className={styles.diagramItem}>
              <span>Human gate</span>
              <span className={styles.tag}>One orchestrator</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
