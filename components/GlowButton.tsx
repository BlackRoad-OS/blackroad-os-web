import Link, { type LinkProps } from 'next/link';

type GlowButtonProps = { href: LinkProps<string>['href']; label: string };

export default function GlowButton({ href, label }: GlowButtonProps) {
  return (
    <Link
      href={href}
      className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-slate-700 px-5 py-2 text-sm font-medium text-white shadow-[0_0_40px_rgba(56,189,248,0.25)] transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-[0_0_60px_rgba(56,189,248,0.35)] focus:outline-none focus:ring focus:ring-cyan-500/40"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-sky-400/10 to-teal-300/20" aria-hidden />
      <span className="relative">{label}</span>
    </Link>
  );
}
