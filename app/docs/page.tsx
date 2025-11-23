import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';
import styles from '../marketing.module.css';

export const metadata: Metadata = {
  title: 'Docs | BlackRoad OS',
  description: 'Gateway into BlackRoad OS documentation, linking to Prism Console and Core repositories for deeper implementation details.',
  openGraph: {
    title: 'Docs | BlackRoad OS',
    description: 'Start from the BlackRoad OS docs entry point to reach Prism Console, Operator, and Core readmes.'
  },
  twitter: {
    title: 'Docs | BlackRoad OS',
    description: 'BlackRoad OS docs entry point for Prism Console, Operator, and Core readmes.'
  }
};

const docLinks = [
  {
    title: 'Prism Console',
    description: 'Operational console, approvals, and observability for the Agent Mesh.',
    href: 'https://github.com/blackroadlabs/blackroad-os-prism-console'
  },
  {
    title: 'blackroad-os-core',
    description: 'Ledger-native event bus, journaling, and policies for agent orchestration.',
    href: 'https://github.com/blackroadlabs/blackroad-os-core'
  },
  {
    title: 'blackroad-os-operator',
    description: 'Scheduling, policy enforcement, and task routing across thousands of agents.',
    href: 'https://github.com/blackroadlabs/blackroad-os-operator'
  }
];

export default function DocsPage() {
  return (
    <div>
      <header className={`section ${styles.pageHeader}`}>
        <div className="section-inner">
          <div className={styles.tagRow}>
            <span className={styles.pill}>Docs</span>
            <span className={styles.pill}>Gateway</span>
          </div>
          <h1 className="section-title">Documentation entry point</h1>
          <p className={styles.lead}>
            This is the front door into BlackRoad OS documentation. Jump to the Prism Console README for the UI surface, explore
            operator internals, or review the core ledger and journaling primitives.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="section-inner card-grid">
          {docLinks.map((link) => (
            <div className="card" key={link.title}>
              <h3>{link.title}</h3>
              <p className="muted">{link.description}</p>
              <p>
                <a className="cta-button secondary" href={link.href} target="_blank" rel="noreferrer">
                  Open README
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className={styles.callout}>
            <strong>SEO + metadata.</strong> Each downstream repo maintains its own OpenGraph and Twitter metadata. This gateway
            page keeps the narrative aligned while linking you directly to authoritative sources.
          </div>
          <div className="card-grid">
            <div className="card">
              <h3>Request access</h3>
              <p className="muted">
                Need guided onboarding, compliance mappings, or a tailored architecture session? Talk to the team and we will align
                the docs to your environment.
              </p>
            </div>
            <div className="card">
              <h3>Stay in the loop</h3>
              <p className="muted">
                Follow releases across Operator, Core, and Prism Console. The Road evolves quickly; this page keeps the outward
                story coherent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Step into the docs"
        copy="Review the readmes, then connect with us to align SIG and PS-SHA∞ patterns to your operating model."
        primaryLabel="Open Prism README"
        primaryHref="https://github.com/blackroadlabs/blackroad-os-prism-console"
        secondaryLabel="Talk to the team"
        secondaryHref="/contact"
      />
    </div>
  );
}
