import Link from 'next/link';
import Footer from '../../components/Footer';

const pricingTiers = [
  {
    name: 'Individual',
    price: '$29',
    period: '/month',
    description: 'Perfect for solo developers and researchers exploring autonomous operations',
    features: [
      '5 active agents',
      '1,000 operations/month',
      'Community support',
      'Basic analytics',
      'Standard SLA',
      'Public documentation',
    ],
    cta: 'Start free trial',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Team',
    price: '$99',
    period: '/month',
    description: 'For teams building production-grade autonomous systems',
    features: [
      '25 active agents',
      '10,000 operations/month',
      'Priority support',
      'Advanced analytics',
      'Enhanced SLA (99.9%)',
      'Team collaboration',
      'Custom integrations',
      'Audit logs',
    ],
    cta: 'Start free trial',
    href: '/signup',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Unlimited scale for organizations orchestrating 1000+ agents',
    features: [
      'Unlimited agents',
      'Unlimited operations',
      'Dedicated support',
      'Custom analytics',
      'Premium SLA (99.99%)',
      'SSO & SAML',
      'On-premise deployment',
      'White-label options',
      'Custom contract terms',
    ],
    cta: 'Contact sales',
    href: '/contact',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-1/4 top-60 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative px-6 py-20">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-slate-300">
            Choose the plan that fits your autonomous operations. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-lg border p-8 ${
                tier.highlighted
                  ? 'border-cyan-500 bg-slate-900/80 shadow-[0_0_40px_rgba(6,182,212,0.3)]'
                  : 'border-slate-800 bg-slate-900/50'
              } backdrop-blur-sm`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1 text-sm font-medium text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold text-white">{tier.name}</h3>
                <p className="text-sm text-slate-400">{tier.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white">{tier.price}</span>
                  {tier.period && <span className="text-slate-400">{tier.period}</span>}
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`block rounded-md px-6 py-3 text-center font-medium transition ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                    : 'border border-slate-700 text-white hover:bg-slate-800'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mx-auto mt-20 max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">Frequently asked questions</h2>
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="mb-2 font-semibold text-white">What counts as an operation?</h3>
              <p className="text-sm text-slate-400">
                An operation is any action performed by an agent, such as API calls, data processing, or autonomous
                decision-making. Simple queries and status checks don&apos;t count toward your limit.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="mb-2 font-semibold text-white">Can I change plans later?</h3>
              <p className="text-sm text-slate-400">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we&apos;ll
                prorate your billing accordingly.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="mb-2 font-semibold text-white">What payment methods do you accept?</h3>
              <p className="text-sm text-slate-400">
                We accept all major credit cards, PayPal, and wire transfers for Enterprise plans. All payments are
                processed securely through Stripe.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="mb-2 font-semibold text-white">Is there a free trial?</h3>
              <p className="text-sm text-slate-400">
                Yes! All plans come with a 14-day free trial. No credit card required. You can explore all features
                before committing.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-20 max-w-4xl rounded-lg border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 p-8 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-white">Need help choosing a plan?</h2>
          <p className="mb-6 text-slate-300">
            Our team is here to help you find the perfect plan for your autonomous operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full border border-slate-700 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
            >
              Contact sales
            </Link>
            <Link
              href="/docs"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-medium text-white transition hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              View documentation
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
