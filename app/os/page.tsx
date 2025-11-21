import styles from './page.module.css';

const layers = [
  { title: 'Core', description: 'Ledger engine and internal APIs that anchor every transaction.' },
  { title: 'Operator', description: 'Job runners, schedulers, and workers that keep services on track.' },
  { title: 'Web', description: 'Public web surfaces, marketing, and live status endpoints.' },
  { title: 'Prism Console', description: 'Operational control plane for operators and administrators.' },
  { title: 'Docs', description: 'Integration guides, playbooks, and knowledge for teams.' }
];

export default function OsPage() {
  return (
    <div className={styles.page}>
      <section className={`panel ${styles.hero}`}>
        <p className="muted">Architecture</p>
        <h1>BlackRoad OS Layers</h1>
        <p className={styles.subtitle}>
          The OS is composed of coordinated layers that share a ledger-first foundation and expose
          predictable interfaces for builders, operators, and partners.
        </p>
      </section>

      <section className={`panel ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div>
            <p className="muted">Layered system</p>
            <h2>How it fits together</h2>
            <p className={styles.subtitle}>
              Each component has a clear responsibility so teams can compose resilient automation and
              ship confidently.
            </p>
          </div>
        </div>
        <div className={styles.cardGrid}>
          {layers.map((layer) => (
            <div key={layer.title} className={styles.card}>
              <h3>{layer.title}</h3>
              <p className="muted">{layer.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
