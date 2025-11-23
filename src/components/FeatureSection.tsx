import styles from './FeatureSection.module.css';

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

interface FeatureSectionProps {
  title: string;
  subtitle?: string;
  items: FeatureItem[];
}

export function FeatureSection({ title, subtitle, items }: FeatureSectionProps) {
  return (
    <section className={styles.section}>
      <div className="section-inner">
        <div className={styles.header}>
          <h2 className="section-title">{title}</h2>
          {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
        </div>
        <div className={styles.items}>
          {items.map((item) => (
            <div key={item.title} className={styles.item}>
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
