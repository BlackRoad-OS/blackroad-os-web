export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 px-6 py-8 text-center">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm text-slate-400">
          BlackRoad · Composable agent orchestration for autonomous operations
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <a href="https://blackroad.io" className="hover:text-cyan-400 transition-colors">
            blackroad.io
          </a>
          <a href="https://blackroad.systems" className="hover:text-cyan-400 transition-colors">
            blackroad.systems
          </a>
          <span>© {currentYear} BlackRoad</span>
        </div>
      </div>
    </footer>
  );
}
