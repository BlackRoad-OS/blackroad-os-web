import type { Metadata } from 'next';
import styles from '../../marketing.module.css';

export const metadata: Metadata = {
  title: 'Terms | BlackRoad OS',
  description: 'Placeholder terms of use for the BlackRoad OS marketing site.'
};

export default function TermsPage() {
  return (
    <div>
      <section className={`section ${styles.pageHeader}`}>
        <div className="section-inner">
          <div className={styles.tagRow}>
            <span className={styles.pill}>Legal</span>
            <span className={styles.pill}>Terms</span>
          </div>
          <h1 className="section-title">Terms of Use</h1>
          <p className={styles.lead}>
            Placeholder terms for the marketing site only. Replace with definitive terms reviewed by counsel before launch.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner card">
          <h3>Acceptance of terms</h3>
          <p className="muted">By browsing this marketing site you agree to these placeholder terms.</p>

          <h3>No warranty</h3>
          <p className="muted">The site and content are provided without warranty and may change without notice.</p>

          <h3>Intellectual property</h3>
          <p className="muted">Content, marks, and brand assets belong to BlackRoad OS unless otherwise noted.</p>

          <h3>Limitation of liability</h3>
          <p className="muted">Use this site at your own risk. BlackRoad OS is not liable for damages arising from its use.</p>

          <h3>Governing law</h3>
          <p className="muted">Specify jurisdiction once finalized with counsel.</p>

          <p className="muted" style={{ marginTop: '1rem' }}>
            TODO: Replace placeholder text with full legal terms and jurisdictional details.
          </p>
        </div>
      </section>
    </div>
  );
}
