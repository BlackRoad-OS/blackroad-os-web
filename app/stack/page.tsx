import styles from './page.module.css';

const products = [
  {
    name: 'RoadChain',
    description: 'Distributed ledger backbone that secures contracts, balances, and system actions.'
  },
  {
    name: 'Prism Console',
    description: 'Operational cockpit for configuring services, reviewing logs, and responding fast.'
  },
  {
    name: 'Lucidia',
    description: 'Intelligence layer for correlating signals across infrastructure and agents.'
  },
  {
    name: 'Agents',
    description: 'Specialized workers that execute, reconcile, and report across the BlackRoad stack.'
  }
];

export default function StackPage() {
  return (
    <div className={styles.page}>
      <section className={`panel ${styles.hero}`}>
        <p className="muted">Products</p>
        <h1>The BlackRoad Stack</h1>
        <p className={styles.subtitle}>
          Core offerings that combine ledger-grade safety with responsive operator controls.
        </p>
      </section>

      <section className={`panel ${styles.section}`}>
        <div className={styles.cardGrid}>
          {products.map((product) => (
            <div key={product.name} className={styles.card}>
              <h3>{product.name}</h3>
              <p className="muted">{product.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
