import Footer from '../../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="relative px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-white">Privacy Policy</h1>

          <div className="space-y-8 rounded-lg border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">Introduction</h2>
              <p className="text-slate-300">
                At BlackRoad OS, we take your privacy seriously. This Privacy Policy describes how we collect, use,
                and protect your personal information when you use our services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">Information We Collect</h2>
              <p className="mb-4 text-slate-300">We collect the following types of information:</p>
              <ul className="list-inside list-disc space-y-2 text-slate-300">
                <li>Account information (name, email, password)</li>
                <li>Usage data and analytics</li>
                <li>Agent operation logs and metrics</li>
                <li>Payment information (processed securely through Stripe)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">How We Use Your Information</h2>
              <p className="mb-4 text-slate-300">We use your information to:</p>
              <ul className="list-inside list-disc space-y-2 text-slate-300">
                <li>Provide and improve our services</li>
                <li>Process payments and manage subscriptions</li>
                <li>Send important service updates</li>
                <li>Analyze usage patterns and optimize performance</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">Data Security</h2>
              <p className="text-slate-300">
                We implement industry-standard security measures to protect your data, including encryption,
                access controls, and regular security audits.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">Your Rights</h2>
              <p className="mb-4 text-slate-300">You have the right to:</p>
              <ul className="list-inside list-disc space-y-2 text-slate-300">
                <li>Access your personal data</li>
                <li>Request data deletion</li>
                <li>Export your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">Contact Us</h2>
              <p className="text-slate-300">
                If you have questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@blackroad.systems" className="text-cyan-400 hover:text-cyan-300">
                  privacy@blackroad.systems
                </a>
              </p>
            </section>

            <p className="mt-8 text-sm text-slate-500">Last updated: November 24, 2024</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
