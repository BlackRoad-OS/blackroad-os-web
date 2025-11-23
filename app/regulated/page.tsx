import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';
import styles from '../marketing.module.css';

export const metadata: Metadata = {
  title: 'Regulated Industries | BlackRoad OS',
  description: 'BlackRoad OS for finance, law, Big-4, and regulated enterprises with audit-first automation and human-in-the-loop controls.'
};

const caseStudies = [
  {
    title: 'Liquidity + close automation',
    copy: 'A CFO configures daily liquidity sweeps, weekly closes, and covenant checks. Agents execute, Operator enforces approvals, and Prism shows journals for every step.'
  },
  {
    title: 'Advice oversight',
    copy: 'A CCO reviews Prism Console audit logs to validate that recommendations captured suitability data, applied policy rules, and routed human approvals at required thresholds.'
  }
];

export default function RegulatedPage() {
  return (
    <div>
      <section className={`section ${styles.pageHeader}`}>
        <div className="section-inner">
          <div className={styles.tagRow}>
            <span className={styles.pill}>Regulated buyers</span>
            <span className={styles.pill}>Audit-first</span>
          </div>
          <h1 className="section-title">Built for FINRA/SEC/AML/KYC environments</h1>
          <p className={styles.lead}>
            Agents understand compliance workflows, capture suitability context, and journal every action. BlackRoad OS keeps humans in
            command for capital raises, legal commitments, and regulatory filings.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner card-grid">
          <div className="card">
            <h3>Audit-ready by default</h3>
            <p className="muted">
              Every decision, payload, and recommendation is hashed, linked, and replayable. Internal and external auditors can trace
              lineage without engineering lift.
            </p>
            <ul className="list-disc">
              <li>Immutable PS-SHA∞ journaling</li>
              <li>Hash-linked evidence across data sources</li>
              <li>Human rationale capture for approvals</li>
            </ul>
          </div>

          <div className="card">
            <h3>Safe human-gate design</h3>
            <p className="muted">
              Critical thresholds always require human signoff. Agents elevate edge cases, policy exceptions, and high-risk moves to the
              orchestrator.
            </p>
            <ul className="list-disc">
              <li>Deterministic approval chains</li>
              <li>Capital, legal, and regulatory moves gated to humans</li>
              <li>Live controls to pause, re-route, or roll back</li>
            </ul>
          </div>

          <div className="card">
            <h3>Regulation-aware agents</h3>
            <p className="muted">
              Agents operate with FINRA/SEC/AML/KYC context in mind—suitability checks, order handling cues, and policy-driven automation that respects jurisdictions.
            </p>
            <ul className="list-disc">
              <li>Suitability and order-handling logic</li>
              <li>AML/KYC checks routed to trusted services</li>
              <li>Policy libraries aligned with your governance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <h2 className="section-title">Case-style examples</h2>
          <p className="section-subtitle">Narratives that illustrate how regulated operators stay in command.</p>
          <div className="card-grid">
            {caseStudies.map((story) => (
              <div key={story.title} className="card">
                <h3>{story.title}</h3>
                <p className="muted">{story.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Talk to us about your regulatory environment"
        copy="Share your supervisory structure, data boundaries, and control requirements. We will tailor the orchestration model to your compliance posture."
        primaryLabel="Request Early Access"
        primaryHref="/contact"
        secondaryLabel="View docs"
        secondaryHref={process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.blackroad.systems'}
      />
    </div>
  );
}
