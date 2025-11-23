import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import styles from '../marketing.module.css';

export const metadata: Metadata = {
  title: 'Contact | BlackRoad OS',
  description: 'Request early access to BlackRoad OS and tell us what you want to automate.'
};

export default function ContactPage() {
  return (
    <div>
      <section className={`section ${styles.pageHeader}`}>
        <div className="section-inner">
          <div className={styles.tagRow}>
            <span className={styles.pill}>Contact</span>
            <span className={styles.pill}>Early access</span>
          </div>
          <h1 className="section-title">Tell us what you want to automate</h1>
          <p className={styles.lead}>Let us know about your company, your industry, and the workflows you want governed by BlackRoad OS.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
