import styles from './LogoCloud.module.css';

const targets = ['Big-4', 'Big Law', 'Fintech', 'Asset Managers', 'RIAs', 'Big Tech'];

export function LogoCloud() {
  return (
    <section className={styles.section}>
      <div className={styles.cloud}>
        <h3 className={styles.title}>Built for teams like</h3>
        <div className={styles.logos}>
          {targets.map((target) => (
            <div key={target} className={styles.logoItem}>
              {target}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
