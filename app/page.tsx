import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';
import { FeatureSection } from '@/components/FeatureSection';
import { Hero } from '@/components/Hero';
import { LogoCloud } from '@/components/LogoCloud';
import { SplitSection } from '@/components/SplitSection';
import { CTA_DESTINATION } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'BlackRoad OS — AI Operating System',
  description:
    'Run a 10,000-person company with one human orchestrator. BlackRoad OS coordinates AI agents with cryptographic audit trails, finance automation, and policy-driven guardrails.'
};

const heroMetrics = [
  {
    title: '10,000+ virtual employees',
    description: 'Composable agents for finance, legal, operations, and product domains.'
  },
  {
    title: 'One human orchestrator',
    description: 'Humans approve thresholds, policies, and critical actions while agents execute.'
  },
  {
    title: 'Audit-first architecture',
    description: 'Every action is journaled with hashes, lineage, and policy context.'
  }
];

const orchestrationFeatures = [
  {
    icon: '⚡️',
    title: 'One orchestrator, many agents',
    description: 'blackroad-os-core and blackroad-os-operator coordinate thousands of domain-specific agents with policies, queues, and service mesh awareness.'
  },
  {
    icon: '🧭',
    title: 'Policy-driven routing',
    description: 'Safeguards ensure the right agent executes with the right context, approvals, and compliance envelopes.'
  },
  {
    icon: '🛰️',
    title: 'Event-native runtime',
    description: 'Event bus, journaling, and replay let you simulate, approve, and monitor automated work before it touches production data.'
  }
];

const financeFeatures = [
  {
    icon: '💹',
    title: 'Automated Finance Layer',
    description: 'CFO, Controller, FP&A, and Treasury agents collaborate on closes, cash, and capital flows—always tagged to immutable audit trails.'
  },
  {
    icon: '📊',
    title: 'Real-time reporting',
    description: 'Programmatic reports with drill-downs, anomaly detection, and policy-aware escalations to humans.'
  },
  {
    icon: '🔐',
    title: 'Compliance-native',
    description: 'PS-SHA∞ journaling with hash links across ledgers, advice, and actions so regulated teams stay exam-ready.'
  }
];

const prismFeatures = [
  {
    icon: '🖥️',
    title: 'Single pane of glass',
    description: 'Prism Console shows live agents, tasks, audit logs, and controls in one secure interface.'
  },
  {
    icon: '📡',
    title: 'Health + observability',
    description: 'Status, traces, and event trails across every automated workflow keep humans in charge.'
  },
  {
    icon: '🛡️',
    title: 'Human-in-the-loop safety',
    description: 'High-impact actions always route through approvals and capture rationale for downstream audit.'
  }
];

export default function HomePage() {
  return (
    <div>
      <Hero
        title="Run a 10,000-person company with one human orchestrator."
        subtitle="BlackRoad OS is an AI-first operating system that coordinates thousands of specialized agents with cryptographic audit trails, policy guardrails, and finance automation built in."
        primaryCta={{ label: 'Request Early Access', href: CTA_DESTINATION }}
        secondaryCta={{ label: 'View Architecture', href: '/product' }}
        metrics={heroMetrics}
      />

      <FeatureSection
        title="Orchestration Engine"
        subtitle="blackroad-os-core and blackroad-os-operator form a governed fabric where agents are composable, observable, and policy-aware."
        items={orchestrationFeatures}
      />

      <FeatureSection
        title="Automated Finance & Compliance"
        subtitle="Purpose-built finance agents cover close, cash, treasury, tax, and FP&A with human gates for critical moves."
        items={financeFeatures}
      />

      <FeatureSection
        title="Prism Console"
        subtitle="Your single pane of glass for monitoring, approvals, audit trails, and human overrides across every agent."
        items={prismFeatures}
      />

      <SplitSection
        eyebrow="Regulated by design"
        title="Born for FINRA/SEC/AML/KYC environments"
        description="PS-SHA∞ journaling, suitability-aware logic, and policy-based routing make the system safe for regulated enterprises from day one."
        bullets={[
          'Every decision and payload hashed with lineage for auditability.',
          'Policy-driven automation with human gates for critical thresholds.',
          'Context-aware agents for finance, legal, and governance-heavy workflows.'
        ]}
        visualTitle="Built-in controls"
        visualCopy="Deterministic approvals, immutable journals, and safe rollback paths mean you can trust large-scale automation without giving up governance."
      />

      <LogoCloud />

      <CTASection
        title="Book a session with Cecilia"
        copy="Tell us about your operating model, regulatory posture, and where you need scale. We will map your environment to the BlackRoad OS agent fabric."
        primaryLabel="Talk to Cecilia"
        primaryHref={CTA_DESTINATION}
        secondaryLabel="View docs"
        secondaryHref={process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.blackroad.systems'}
      />
    </div>
  );
}
