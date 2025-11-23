import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';
import { SplitSection } from '@/components/SplitSection';
import styles from '../marketing.module.css';

export const metadata: Metadata = {
  title: 'Company | BlackRoad OS',
  description: 'BlackRoad OS Inc. builds the public face of the Road—contact, trademark, and domain information for partners and press.',
  openGraph: {
    title: 'Company | BlackRoad OS',
    description: 'Learn about BlackRoad OS Inc., how to reach us, and how the brand stays compliant across domains and trademarks.'
  },
  twitter: {
    title: 'Company | BlackRoad OS',
    description: 'Reach BlackRoad OS Inc. for partnerships, press, and enterprise engagements.'
  }
};

const contactChannels = ['hello@blackroad.systems', 'blackroados@gmail.com', 'blackroados@outlook.com', 'blackroados@yahoo.com'];

export default function CompanyPage() {
  return (
    <div>
      <header className={`section ${styles.pageHeader}`}>
        <div className="section-inner">
          <div className={styles.tagRow}>
            <span className={styles.pill}>Company</span>
            <span className={styles.pill}>Contact</span>
          </div>
          <h1 className="section-title">BlackRoad OS Inc.</h1>
          <p className={styles.lead}>
            We steward the public-facing website for BlackRoad OS—the neon horizon where partners, investors, and the community
            meet the Agent Mesh. For product access, compliance reviews, or media inquiries, use the channels below.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="section-inner card-grid">
          <div className="card">
            <h3>Company summary</h3>
            <p className="muted">
              BlackRoad OS Inc. develops the story layer for the Road, aligning SIG, PS-SHA∞, and Lucidia narratives with the
              regulated realities of modern enterprises.
            </p>
          </div>
          <div className="card">
            <h3>Brand + domains</h3>
            <p className="muted">
              We maintain the BlackRoad OS trademark positioning and the primary domain portfolio, including blackroad.systems
              and linked product surfaces.
            </p>
          </div>
          <div className="card">
            <h3>Contact channels</h3>
            <ul className="list-disc">
              {contactChannels.map((email) => (
                <li key={email}>{email}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SplitSection
        eyebrow="Public front door"
        title="From narrative to engagement"
        description="This site is the handshake into BlackRoad OS—linking Prism Console, Operator, and Core while keeping compliance and brand fidelity intact."
        bullets={[
          'Gateway into docs, console, and roadmap updates.',
          'Clear points of contact for enterprise diligence and partnerships.',
          'BlackRoad aesthetic: dark, sharp, neon edges with BR→OS gradients.'
        ]}
        visualTitle="Audit-ready surface"
        visualCopy="We align messaging with PS-SHA∞ journaling and make sure every outbound touchpoint reflects the truth-first design of the platform."
      />

      <CTASection
        title="Talk to BlackRoad OS"
        copy="Reach out for enterprise engagements, media coordination, or to validate SIG + PS-SHA∞ approaches for your stack."
        primaryLabel="Email the team"
        primaryHref="mailto:hello@blackroad.systems"
        secondaryLabel="View docs"
        secondaryHref="/docs"
      />
    </div>
  );
}
