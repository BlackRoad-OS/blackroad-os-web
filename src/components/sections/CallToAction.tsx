import { Button } from '../ui/Button';
import styles from './CallToAction.module.css';

interface CallToActionProps {
  docsUrl: string;
  contactUrl: string;
}

export function CallToAction({ docsUrl, contactUrl }: CallToActionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>BlackRoad OS keeps your agents, infra, and finance in one shell.</h2>
        <p className={styles.subtitle}>
          Operators stay in Prism, Atlas watches your systems, and RoadChain journals every action. Talk to us or dive into the
          Owner&apos;s Manual to plug your stack in.
        </p>
        <div className={styles.actions}>
          <Button href={contactUrl}>Talk to us</Button>
          <Button href={docsUrl} variant="secondary">
            Read the Docs
          </Button>
        </div>
      </div>
    </section>
  );
}
