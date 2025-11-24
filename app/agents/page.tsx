import styles from '../styles/os-shell.module.css';

const agents = [
  {
    name: 'Aurora',
    role: 'Finance · FP&A',
    status: 'Executing',
    tone: 'success',
    load: 78,
    memory: 'Synced',
    events: 'Recent: runway stress test + budget patch'
  },
  {
    name: 'Orbit',
    role: 'Legal · Governance',
    status: 'Awaiting approval',
    tone: 'warn',
    load: 52,
    memory: 'Checkpointed',
    events: 'Drafting vendor clause upgrade'
  },
  {
    name: 'Relay',
    role: 'Ops · Supply',
    status: 'Executing',
    tone: 'info',
    load: 64,
    memory: 'Synced',
    events: 'Reconciling freight anomalies'
  }
];

const stats = [
  { label: 'Active agents', value: '48', meta: 'Clustered across 6 zones' },
  { label: 'Tasks in flight', value: '187', meta: 'governed + journaled' },
  { label: 'Memory sync', value: '99.4%', meta: 'JetBrains Mono channels' }
];

export default function AgentsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.canvas}>
        <section className={styles.hero}>
          <span className={styles.pill}>
            <span className={styles.pillSwatch} /> Agent fabric
          </span>
          <h1 className={styles.title}>Agent dashboard</h1>
          <p className={styles.subtitle}>
            Monitor active agents, memory sync, and task progression. Design tokens mirror the BR → OS
            gradient and golden-ratio grid for clarity.
          </p>

          <div className={styles.metricsRow}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.metricCard}>
                <span className={styles.metricLabel}>{stat.label}</span>
                <div className={styles.metricValue}>{stat.value}</div>
                <div className={styles.metricMeta}>{stat.meta}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.goldenGrid}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Active agents</h2>
              <span className={`${styles.statusPill} ${styles.statusSuccess}`}>Aligned</span>
            </div>
            <div className={styles.gridRow}>
              {agents.map((agent) => (
                <div key={agent.name} className={styles.agentCard}>
                  <div className={styles.agentHeader}>
                    <div className={styles.avatar}>{agent.name[0]}</div>
                    <div>
                      <h3 className={styles.agentName}>{agent.name}</h3>
                      <div className={styles.agentMeta}>{agent.role}</div>
                    </div>
                  </div>

                  <div className={styles.agentMeta}>
                    <span className={`${styles.statusPill} ${
                      agent.tone === 'success'
                        ? styles.statusSuccess
                        : agent.tone === 'warn'
                          ? styles.statusWarn
                          : styles.statusInfo
                    }`}>
                      {agent.status}
                    </span>
                    <span className={styles.miniTag}>Memory: {agent.memory}</span>
                    <span className={styles.miniTag}>JetBrains Mono</span>
                  </div>

                  <div className={styles.panelMeta}>{agent.events}</div>

                  <div className={styles.agentFooter}>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${agent.load}%` }} />
                    </div>
                    <span className={styles.panelMeta}>{agent.load}% load</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Recent events</h2>
              <span className={`${styles.statusPill} ${styles.statusInfo}`}>Synced</span>
            </div>
            <ul className={styles.feedList}>
              <li className={styles.feedItem}>
                <strong>Memory sync</strong>
                <span className={styles.panelMeta}>Updated embeddings shared to Roadchain ledger.</span>
              </li>
              <li className={styles.feedItem}>
                <strong>Guardrails</strong>
                <span className={styles.panelMeta}>
                  Safety harness patched with new policy lattice; approvals tracked per agent.
                </span>
              </li>
              <li className={styles.feedItem}>
                <strong>Operator</strong>
                <span className={styles.panelMeta}>Console acknowledged · ready for overrides.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
