import styles from './CTASection.module.css';

interface CTASectionProps {
  title: string;
  copy: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({ title, copy, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: CTASectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.copy}>{copy}</p>
        <div className={styles.actions}>
          <a className="cta-button" href={primaryHref}>
            {primaryLabel}
          </a>
          {secondaryHref && secondaryLabel ? (
            <a className="cta-button secondary" href={secondaryHref}>
              {secondaryLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
