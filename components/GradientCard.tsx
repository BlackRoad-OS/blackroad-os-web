interface GradientCardProps {
  title: string;
  description: string;
}

export default function GradientCard({ title, description }: GradientCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-lg shadow-cyan-500/5 backdrop-blur">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
    </article>
  );
}
