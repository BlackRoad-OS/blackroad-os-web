import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 px-6 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-slate-400">
            © {currentYear} BlackRoad OS. All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm">
            <Link href="/docs/intro" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Docs
            </Link>
            <Link href="/status" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Status
            </Link>
            <Link href="/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
