import GradientCard from '../components/GradientCard';
import GlowButton from '../components/GlowButton';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

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
      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-16 md:grid-cols-3">
        {highlights.map((item) => (
          <GradientCard key={item.title} title={item.title} description={item.description} />
        ))}
      </section>
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 pb-20 text-center">
        <p className="text-lg text-slate-300">
          BlackRoad OS is a public-facing surface for orchestrating intelligent systems.
        </p>
        <p className="text-sm text-slate-400">{'// TODO(web-next): mount live agent widget entrypoints.'}</p>
        <GlowButton href="/docs/intro" label="Read the docs" />
      </section>
      <Footer />
    </div>
  );
}
