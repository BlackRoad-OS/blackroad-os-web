import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';
import { SplitSection } from '@/components/SplitSection';
import styles from '../marketing.module.css';

export const metadata: Metadata = {
  title: 'Vision | BlackRoad OS',
  description:
    'Spiral Information Geometry, PS-SHA∞ identity, and Lucidia converge to form the BlackRoad Agent Mesh and public face of the Road.',
  openGraph: {
    title: 'Vision | BlackRoad OS',
    description:
      'See how Spiral Information Geometry and PS-SHA∞ identity give BlackRoad OS its neon horizon—governing agents with truth-first primitives.'
  },
  twitter: {
    title: 'Vision | BlackRoad OS',
    description:
      'BlackRoad OS stitches SIG, PS-SHA∞, Lucidia, and the Agent Mesh into a governed fabric for intelligent agents.'
  }
};

export default function VisionPage() {
  return (
    <div>
      <header className={`section ${styles.pageHeader}`}>
        <div className="section-inner">
          <div className={styles.tagRow}>
            <span className={styles.pill}>Vision</span>
            <span className={styles.pill}>Philosophy</span>
          </div>
          <h1 className="section-title">The neon horizon where BlackRoad begins</h1>
          <p className={styles.lead}>
            BlackRoad OS is the public face of the Road—the story layer where Spiral Information Geometry (SIG), PS-SHA∞ identity,
            and Lucidia&apos;s Agent Mesh are expressed for operators, partners, and the community.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="section-inner card-grid">
          <div className="card">
            <h3>Spiral Information Geometry</h3>
            <p className="muted">
              SIG arranges knowledge in a governed spiral—policies, prompts, and lineage stay coherent as agents traverse time,
              domains, and escalating stakes.
            </p>
          </div>
          <div className="card">
            <h3>PS-SHA∞ Identity Layer</h3>
            <p className="muted">
              The PS-SHA∞ signature enforces identity, provenance, and auditability. Every action on the Road inherits cryptographic
              lineage that regulators and customers can verify.
            </p>
          </div>
          <div className="card">
            <h3>Lucidia & the Agent Mesh</h3>
            <p className="muted">
              Lucidia is the intelligence substrate. QI-backed signals flow across the Agent Mesh so specialized agents can share
              context without breaking trust boundaries.
            </p>
          </div>
        </div>
      </section>

      <SplitSection
        eyebrow="Spiral Information Geometry"
        title="Structured truth for intelligent agents"
        description="SIG keeps BlackRoad OS coherent. The spiral organizes prompts, policies, and journals so context compounds safely while operators stay in command."
        bullets={[
          'Context spirals outward with lineage preserved for replay and audit.',
          'Policy envelopes travel with each task to keep agents aligned to human intent.',
          'Fractal geometry guides how new domains and automations are added to the Road.'
        ]}
        visualTitle="Public face of the Road"
        visualCopy="The neon gradient is a reminder: every surface of BlackRoad OS is truth-first, auditable, and ready for regulated missions."
      />

      <SplitSection
        eyebrow="Lucidia, QI, and the Agent Mesh"
        title="Collective intelligence with human oversight"
        description="Lucidia orchestrates perception and reasoning while the Agent Mesh shares state responsibly. Humans approve thresholds; agents propagate evidence."
        bullets={[
          'QI signals route attention to the right agents without leaking sensitive payloads.',
          'Mesh-aware observability means drift, anomalies, and intent changes are visible in Prism.',
          'Operator controls cadence, segregation of duties, and PS-SHA∞ journal checkpoints.'
        ]}
        visualTitle="Governed collaboration"
        visualCopy="One orchestrator directs thousands of agents while the Mesh records how each move was authorized, simulated, and promoted."
      />

      <CTASection
        title="Explore the Road"
        copy="Dive into the public narrative, review the journals, and step into Prism Console to see the Agent Mesh live."
        primaryLabel="View Product"
        primaryHref="/product"
        secondaryLabel="Open Docs"
        secondaryHref="/docs"
      />
    </div>
  );
}
