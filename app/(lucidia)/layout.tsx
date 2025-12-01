import Link from 'next/link';

/**
 * Lucidia Layout
 *
 * Softer, more story/education focused than main BlackRoad.
 * "Magic library" vibes vs "SaaS dashboard"
 */
export default function LucidiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Lucidia-specific Nav - Softer than main NavBar */}
      <nav className="sticky top-0 z-50 border-b border-br-vivid-purple/20 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/lucidia"
            className="flex items-center gap-2 text-xl font-bold text-br-text"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-br-vivid-purple to-teal-500 text-sm">
              ✨
            </span>
            <span>Lucidia</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/lucidia"
              className="text-sm text-br-text-muted transition hover:text-br-text"
            >
              Home
            </Link>
            <Link
              href="/lucidia/stories"
              className="text-sm text-br-text-muted/50"
            >
              Stories <span className="text-xs">(soon)</span>
            </Link>
            <Link
              href="/lucidia/learn"
              className="text-sm text-br-text-muted/50"
            >
              Learn <span className="text-xs">(soon)</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-br-text-muted transition hover:text-br-text"
            >
              BlackRoad
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content with gradient background */}
      <main className="min-h-screen bg-gradient-to-b from-black via-br-vivid-purple/5 to-black text-br-text">
        {children}
      </main>

      {/* Simple footer */}
      <footer className="border-t border-br-vivid-purple/10 bg-black py-8 text-center">
        <p className="text-sm text-br-text-muted">
          Lucidia is the learning side of{' '}
          <Link href="/" className="text-br-vivid-purple hover:underline">
            BlackRoad OS
          </Link>
        </p>
      </footer>
    </>
  );
}
