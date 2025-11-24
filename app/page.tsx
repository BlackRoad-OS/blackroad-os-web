import GradientCard from '../components/GradientCard';
import GlowButton from '../components/GlowButton';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import AgentLightbar from '../components/AgentLightbar';
import LucidiaAgent from '../components/LucidiaAgent';

const highlights = [
  {
    title: 'Composable agents',
    description: 'Wire services, signals, and humans together with event-driven flows.',
  },
  {
    title: 'Predictable control',
    description: 'Typed contracts, deterministic fallbacks, and audited traces by default.',
  },
  {
    title: 'Built for operations',
    description: 'Observability-ready primitives with live dashboards and dark-mode UI.',
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <Hero />

      {/* Highlights Section */}
      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-16 md:grid-cols-3">
        {highlights.map((item) => (
          <GradientCard key={item.title} title={item.title} description={item.description} />
        ))}
      </section>

      {/* Agent Lightbar Section */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <AgentLightbar />
      </section>

      {/* CTA Section */}
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 pb-20 text-center">
        <p className="text-lg text-slate-300">
          BlackRoad OS is a public-facing surface for orchestrating intelligent systems.
        </p>
        <p className="text-sm text-cyan-400">✓ Live agent monitoring • Real-time orchestration • Enterprise scale</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <GlowButton href="/docs/intro" label="Read the docs" />
          <GlowButton href="/pricing" label="View pricing" />
        </div>
      </section>

      {/* Lucidia Agent Shell - Floating Assistant */}
      <LucidiaAgent />

      <Footer />
    </div>
  );
}
