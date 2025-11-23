import styles from '../styles/os-shell.module.css';

const metrics = [
  { label: 'Orchestrated tasks', value: '12,480', meta: 'last 24h across all agents' },
  { label: 'Human approvals', value: '42', meta: 'pending 3, completed 39' },
  { label: 'Ledger coverage', value: '99.2%', meta: 'PS-SHA∞ journaling uptime' }
];

const modules = [
  {
    name: 'Prism Observer',
    context: 'live traces + audit mirrors',
    status: 'Stable',
    statusTone: 'success'
  },
  {
    name: 'RoadWallet',
    context: 'treasury + disbursement controls',
    status: 'Guarded',
    statusTone: 'warn'
  },
  {
    name: 'Policy Router',
    context: 'approval lattice + safeties',
    status: 'Tuned',
    statusTone: 'info'
  },
  {
    name: 'Compute Mesh',
    context: 'zones: 6 · autoscaling on',
    status: 'Nominal',
    statusTone: 'success'
  }
];

const toggles = [
  {
    title: 'Darkline mode',
    copy: 'Mask secrets in console playback + enforce hardware keys.',
    badge: 'Critical',
    state: 'Enabled'
  },
  {
    title: 'Orchestration overrides',
    copy: 'Pause speculative tasks when human approvals exceed threshold.',
    badge: 'Policy',
    state: 'Auto'
  },
  {
    title: 'Telemetry beacons',
    copy: 'Send live traces to regulators with signed diffs.',
    badge: 'Observability',
    state: 'Live'
  }
];

const queue = [
  {
    id: 'task-8842',
    summary: 'Agent Finance.FP&A generating live P&L',
    owner: 'FP&A / Aurora',
    state: 'Ready',
    tone: 'success'
  },
  {
    id: 'task-8839',
    summary: 'Legal.Governance drafting vendor review addendum',
    owner: 'Legal / Orbit',
    state: 'Awaiting approval',
    tone: 'warn'
  },
  {
    id: 'task-8832',
    summary: 'Ops.Supply reconciling freight anomalies',
    owner: 'Ops / Relay',
    state: 'Executing',
    tone: 'info'
  }
];

export default function ConsolePage() {
  return (
    <div className={styles.page}>
      <div className={styles.canvas}>
        <section className={styles.hero}>
          <span className={styles.pill}>
            <span className={styles.pillSwatch} /> Prism Console
          </span>
          <h1 className={styles.title}>Operator console</h1>
          <p className={styles.subtitle}>
            Govern every agent, queue, and approval from a single pane. Built for precision, fast
            routing, and human-first overrides.
          </p>

          <div className={styles.metricsRow}>
            {metrics.map((metric) => (
              <div key={metric.label} className={styles.metricCard}>
                <span className={styles.metricLabel}>{metric.label}</span>
                <div className={styles.metricValue}>{metric.value}</div>
                <div className={styles.metricMeta}>{metric.meta}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.goldenGrid}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Active modules</h2>
              <span className={`${styles.statusPill} ${styles.statusSuccess}`}>Stable</span>
            </div>
            <div className={styles.listStack}>
              {modules.map((module) => (
                <div key={module.name} className={styles.listRow}>
                  <strong>{module.name}</strong>
                  <span className={styles.panelMeta}>{module.context}</span>
                  <span className={styles.badge}>Golden-ratio grid aligned</span>
                  <span
                    className={`${styles.statusPill} ${
                      module.statusTone === 'success'
                        ? styles.statusSuccess
                        : module.statusTone === 'warn'
                          ? styles.statusWarn
                          : styles.statusInfo
                    }`}
                  >
                    {module.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Controls</h2>
              <span className={`${styles.statusPill} ${styles.statusInfo}`}>Realtime</span>
            </div>
            <div className={styles.listStack}>
              {toggles.map((toggle) => (
                <div key={toggle.title} className={styles.toggleRow}>
                  <div className={styles.toggleCopy}>
                    <span className={styles.smallLabel}>{toggle.badge}</span>
                    <span className={styles.accentText}>{toggle.title}</span>
                    <span className={styles.panelMeta}>{toggle.copy}</span>
                  </div>
                  <span className={`${styles.statusPill} ${styles.statusSuccess}`}>{toggle.state}</span>
                </div>
              ))}
            </div>
            <div className={styles.tagRow}>
              <a className={styles.primaryButton} href="/roadchain">
                View ledger
              </a>
              <a className={styles.secondaryButton} href="/agents">
                Manage agents
              </a>
            </div>
          </div>
        </section>

        <section className={styles.gridRow}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Queue & approvals</h3>
            <div className={styles.stack}>
              {queue.map((item) => (
                <div key={item.id} className={styles.listRow}>
                  <div>
                    <strong className={styles.mono}>{item.id}</strong>
                    <div className={styles.panelMeta}>{item.summary}</div>
                  </div>
                  <span className={styles.panelMeta}>{item.owner}</span>
                  <span className={styles.badge}>Audit tagged</span>
                  <span
                    className={`${styles.statusPill} ${
                      item.tone === 'success'
                        ? styles.statusSuccess
                        : item.tone === 'warn'
                          ? styles.statusWarn
                          : styles.statusInfo
                    }`}
                  >
                    {item.state}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Health pulse</h3>
            <p className={styles.cardText}>
              Live telemetry keeps orchestrators in control. Roadchain diffs, compute heat, and policy
              thresholds stay visible without distracting from execution speed.
            </p>
            <div className={styles.tagRow}>
              <span className={styles.miniTag}>BR→OS gradient</span>
              <span className={styles.miniTag}>JetBrains Mono</span>
              <span className={styles.miniTag}>1120px canvas</span>
              <span className={styles.miniTag}>Tier 1 radius 24px</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
