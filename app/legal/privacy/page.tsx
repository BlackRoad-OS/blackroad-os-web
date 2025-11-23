import type { Metadata } from 'next';
import styles from '../../marketing.module.css';

export const metadata: Metadata = {
  title: 'Privacy | BlackRoad OS',
  description: 'Placeholder privacy notice for BlackRoad OS marketing site.'
};

export default function PrivacyPage() {
  return (
    <div>
      <section className={`section ${styles.pageHeader}`}>
        <div className="section-inner">
          <div className={styles.tagRow}>
            <span className={styles.pill}>Legal</span>
            <span className={styles.pill}>Privacy</span>
          </div>
          <h1 className="section-title">Privacy Notice</h1>
          <p className={styles.lead}>
            This is placeholder content for the BlackRoad OS marketing site. Replace with counsel-reviewed language before production use.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner card">
          <h3>Introduction & scope</h3>
          <p className="muted">This notice covers the marketing site experience only and does not govern customer contracts.</p>

          <h3>Information collected</h3>
          <p className="muted">Contact details submitted via forms or email requests.</p>

          <h3>Use of information</h3>
          <p className="muted">To respond to inquiries, schedule demos, and share product updates.</p>

          <h3>Cookies / analytics</h3>
          <p className="muted">Placeholder – configure your analytics and cookie banner according to your policies.</p>

          <h3>Data retention</h3>
          <p className="muted">Retained as long as needed to respond to requests or as required by law.</p>

          <h3>Contact</h3>
          <p className="muted">Reach out via <a href="mailto:hello@blackroad.systems">hello@blackroad.systems</a> for privacy questions.</p>

          <p className="muted" style={{ marginTop: '1rem' }}>
            TODO: Replace placeholder text with counsel-approved policy and regional disclosures.
          </p>
        </div>
      </section>
    </div>
  );
}
