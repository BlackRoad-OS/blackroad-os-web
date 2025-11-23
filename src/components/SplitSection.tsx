import styles from './SplitSection.module.css';

interface SplitSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  bullets?: string[];
  visualTitle: string;
  visualCopy: string;
}

export function SplitSection({ eyebrow, title, description, bullets, visualTitle, visualCopy }: SplitSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copyBlock}>
          {eyebrow ? <p className="badge">{eyebrow}</p> : null}
          <h3 className="section-title">{title}</h3>
          <p className="section-subtitle">{description}</p>
          {bullets ? (
            <ul className={styles.bullets}>
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className={styles.visual}>
          <h4>{visualTitle}</h4>
          <p>{visualCopy}</p>
        </div>
      </div>
    </section>
  );
}
