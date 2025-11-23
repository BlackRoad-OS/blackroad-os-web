import type { Metadata } from 'next';
import styles from '../marketing.module.css';

export const metadata: Metadata = {
  title: 'About | BlackRoad OS',
  description: 'Why BlackRoad OS exists and how one orchestrator directs thousands of AI agents with compliance-first design.'
};

export default function AboutPage() {
  return (
    <div>
      <section className={`section ${styles.pageHeader}`}>
        <div className="section-inner">
          <div className={styles.tagRow}>
            <span className={styles.pill}>About</span>
            <span className={styles.pill}>Story</span>
          </div>
          <h1 className="section-title">We build leverage without abandoning oversight</h1>
          <p className={styles.lead}>
            BlackRoad OS was created so regulated operators can scale with AI safely. We combine ledger-native journaling, policy-driven orchestration, and a console designed for humans-in-the-loop.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner card-grid">
          <div className="card">
            <h3>Why we exist</h3>
            <p className="muted">
              Modern enterprises need automation, but they cannot trade away compliance or auditability. We make it possible to deploy thousands of AI agents with controls that satisfy finance, legal, and security leaders.
            </p>
          </div>
          <div className="card">
            <h3>Operating philosophy</h3>
            <p className="muted">
              We do not replace humans in critical roles—we magnify their leverage. The orchestrator approves thresholds, sets policy, and remains accountable while agents execute repeatable work.
            </p>
          </div>
          <div className="card">
            <h3>What comes next</h3>
            <p className="muted">
              Expect deeper analytics, more compliance templates, and richer automations across finance and legal. Multi-language experiences and first-party contact workflows are on the roadmap.
            </p>
            <p className="muted">
              TODO: Add OpenGraph metadata, analytics integrations, and localization for global teams.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
