import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';
import { SplitSection } from '@/components/SplitSection';
import styles from '../marketing.module.css';

export const metadata: Metadata = {
  title: 'Product | BlackRoad OS',
  description: 'Understand BlackRoad OS Core, Operator, and Prism Console across orchestration, automation, and observability.'
};

export default function ProductPage() {
  return (
    <div>
      <header className={`section ${styles.pageHeader}`}>
        <div className="section-inner">
          <div className={styles.tagRow}>
            <span className={styles.pill}>Product overview</span>
            <span className={styles.pill}>AI-first OS</span>
          </div>
          <h1 className="section-title">The operating system for orchestrating 10,000+ agents</h1>
          <p className={styles.lead}>
            BlackRoad OS brings together a ledger-native core, policy-driven operator, and Prism Console so one human can direct
            thousands of specialized agents with confidence.
          </p>
        </div>
      </header>

      <SplitSection
        eyebrow="BlackRoad OS Core"
        title="Ledger-native event bus + journaling"
        description="OS Core is the substrate for agents. It provides an event bus, deterministic journaling, and composable agent models so regulated workflows stay verifiable."
        bullets={['Immutable journal with hashes and lineage', 'Composable agents with domain-specific skills', 'Replay, simulate, and compare behaviors before promotion']}
        visualTitle="Why it matters"
        visualCopy="Your automation footprint inherits auditability, versioned behaviors, and consistent guardrails no matter which domain team builds the agent."
      />

      <SplitSection
        eyebrow="Operator"
        title="Policies, scheduling, and human gates"
        description="blackroad-os-operator routes tasks, enforces policies, and keeps humans in the loop for critical thresholds."
        bullets={['Role- and policy-aware orchestration', 'Scheduling and dependency management across agents', 'Finance-focused examples: close, cash, treasury, tax workflows']}
        visualTitle="Example: Automated Finance Layer"
        visualCopy="CFO, Controller, FP&A, and Treasury agents collaborate. Operator enforces segregation of duties, approvals, and evidences every action for auditors."
      />

      <SplitSection
        eyebrow="Prism Console"
        title="Single pane of glass for oversight"
        description="Prism surfaces agent health, audit logs, approvals, and performance so one orchestrator can supervise 10,000+ virtual employees."
        bullets={[
          'Live dashboards for agents, queues, and events',
          'Audit-ready logs with human rationale capture',
          'Controls for pausing, approving, or re-routing work'
        ]}
        visualTitle="Operator-in-command"
        visualCopy="One human can review, approve, and direct complex programs while the platform keeps every action compliant and observable."
      />

      <CTASection
        title="See the OS in action"
        copy="Walk through a guided scenario that shows how core, operator, and Prism Console combine to ship governed automation."
        primaryLabel="Request Early Access"
        primaryHref="/contact"
        secondaryLabel="View docs"
        secondaryHref={process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.blackroad.systems'}
      />
    </div>
  );
}
