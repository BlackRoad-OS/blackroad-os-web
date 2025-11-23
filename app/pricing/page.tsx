import type { Metadata } from 'next';
import styles from '../marketing.module.css';

const plans = [
  {
    name: 'Solo',
    price: 'Starting at $X/month',
    description: 'For individual founders and small pods.',
    features: ['Up to 50 agents', 'Automated finance basics', 'Prism Console access', 'Email support']
  },
  {
    name: 'Team',
    price: 'Custom pricing',
    description: 'For startups and specialist firms that need more orchestration.',
    features: ['Expanded agent pools and domains', 'Multi-user orchestrator access', 'Priority support', 'Implementation guidance']
  },
  {
    name: 'Enterprise / Regulated',
    price: 'Let’s scope together',
    description: 'For finance, law, Big-4, and large regulated enterprises.',
    features: [
      'Compliance-focused modules and controls',
      'Custom integrations and data residency options',
      'SLAs, governance features, and dedicated CSM',
      'Architecture reviews with the BlackRoad team'
    ]
  }
];

export const metadata: Metadata = {
  title: 'Pricing | BlackRoad OS',
  description: 'Indicative pricing tiers for BlackRoad OS with orchestration, Prism Console, and compliance modules.'
};

export default function PricingPage() {
  return (
    <div>
      <section className={`section ${styles.pageHeader}`}>
        <div className="section-inner">
          <div className={styles.tagRow}>
            <span className={styles.pill}>Pricing</span>
            <span className={styles.pill}>Early access</span>
          </div>
          <h1 className="section-title">Pricing is early and indicative only</h1>
          <p className={styles.lead}>
            Final terms depend on your regulatory posture, data boundaries, and automation scope. We tailor the deployment with your
            risk, compliance, and finance leads.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner card-grid">
          {plans.map((plan) => (
            <div key={plan.name} className="card">
              <h3>{plan.name}</h3>
              <p className="muted">{plan.description}</p>
              <p style={{ fontWeight: 700, margin: '0.75rem 0' }}>{plan.price}</p>
              <ul className="list-disc">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
