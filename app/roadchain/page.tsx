import styles from '../styles/os-shell.module.css';

const ledgerBlocks = [
  {
    height: '#2841',
    timestamp: '2024-06-11T16:08:24Z',
    agent: 'Finance.FP&A',
    hash: '0x9fe2-3b17-7c11-88ac-0024-0a2b',
    summary: 'Scenario run: Q3 runway stress test',
    status: 'Committed'
  },
  {
    height: '#2840',
    timestamp: '2024-06-11T16:04:12Z',
    agent: 'Ops.Supply',
    hash: '0xc02d-472f-11ed-bcdc-0242-ac15',
    summary: 'Freight anomaly replay · safe fallback enabled',
    status: 'Guarded'
  },
  {
    height: '#283F',
    timestamp: '2024-06-11T15:57:03Z',
    agent: 'Legal.Governance',
    hash: '0x7bc0-1fd5-4e27-b39f-92d4-2044',
    summary: 'Vendor policy delta notarized',
    status: 'Committed'
  }
];

const feed = [
  'New diff signature detected · replay ready',
  'Ledger sync: 6 zones converged',
  'PS-SHA∞ attestation posted to regulator endpoint',
  'Audit mirror refreshed · 13ms behind realtime'
];

const diffs = [
  {
    title: 'Audit hooks',
    copy: 'Every action hashed with lineage, approvals, and origin agent metadata.'
  },
  {
    title: 'RoadWallet state',
    copy: 'Outbound disbursements gated by dual-control + hardware key requirement.'
  },
  {
    title: 'Console sync',
    copy: 'Prism Console receives signed event mirrors for operator awareness.'
  }
];

export default function RoadchainPage() {
  return (
    <div className={styles.page}>
      <div className={styles.canvas}>
        <section className={styles.hero}>
          <span className={styles.pill}>
            <span className={styles.pillSwatch} /> Roadchain ledger
          </span>
          <h1 className={styles.title}>Immutable operator timeline</h1>
          <p className={styles.subtitle}>
            Every agent action, approval, and diff is captured with the BR → OS gradient lineage. Review
            blocks, hashes, and summaries in a golden-ratio canvas built for speed.
          </p>
        </section>

        <section className={styles.goldenGrid}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Blocks</h2>
              <span className={`${styles.statusPill} ${styles.statusSuccess}`}>Live</span>
            </div>
            <div className={styles.ledgerList}>
              {ledgerBlocks.map((block) => (
                <div key={block.hash} className={styles.ledgerCard}>
                  <div className={styles.ledgerMeta}>
                    <span className={styles.badge}>Height {block.height}</span>
                    <span className={styles.badge}>{block.agent}</span>
                    <span className={`${styles.statusPill} ${styles.statusInfo}`}>{block.timestamp}</span>
                  </div>
                  <div className={styles.ledgerHash}>{block.hash}</div>
                  <div className={styles.panelMeta}>{block.summary}</div>
                  <span className={`${styles.statusPill} ${styles.statusSuccess}`}>{block.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Live feed</h2>
              <span className={`${styles.statusPill} ${styles.statusInfo}`}>Streaming</span>
            </div>
            <ul className={styles.feedList}>
              {feed.map((item) => (
                <li key={item} className={styles.feedItem}>
                  <strong>Event</strong>
                  <span className={styles.panelMeta}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.gridRow}>
          {diffs.map((diff) => (
            <div key={diff.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{diff.title}</h3>
              <p className={styles.cardText}>{diff.copy}</p>
              <div className={styles.tagRow}>
                <span className={styles.miniTag}>Hash-linked</span>
                <span className={styles.miniTag}>1120px canvas</span>
                <span className={styles.miniTag}>Tier 2 radius 18px</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
