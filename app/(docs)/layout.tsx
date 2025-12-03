import Link from 'next/link';
import NavBar from '@/components/NavBar';

const docsNav = [
  {
    title: 'Getting Started',
    items: [
      { href: '/docs/intro', label: 'Introduction' },
      { href: '/docs/get-started', label: 'Quickstart' },
      { href: '/docs/concepts', label: 'Core Concepts' },
    ],
  },
  {
    title: 'Operator Engine',
    items: [
      { href: '/docs/operator/overview', label: 'Overview' },
      { href: '/docs/operator/chat', label: '/chat Endpoint', soon: true },
      { href: '/docs/operator/agents', label: 'Agent Registry', soon: true },
      { href: '/docs/operator/llm', label: 'LLM Integration', soon: true },
    ],
  },
  {
    title: 'Agents & Lucidia',
    items: [
      { href: '/docs/agents/intro', label: 'What are Agents?' },
      { href: '/docs/agents/cece', label: 'Meet Cece', soon: true },
      { href: '/docs/lucidia/intro', label: 'Lucidia Overview' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { href: '/docs/api/health', label: 'Health Endpoints' },
      { href: '/docs/api/chat', label: 'Chat API', soon: true },
      { href: '/docs/api/rag', label: 'RAG API', soon: true },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="mx-auto flex min-h-screen max-w-7xl gap-8 px-6 py-10">
        {/* Left Sidebar - Docs Navigation */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-6">
            {docsNav.map((section) => (
              <div key={section.title}>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-br-text-muted">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      {item.soon ? (
                        <span className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-br-text-muted/50">
                          {item.label}
                          <span className="rounded bg-br-surface-2 px-1.5 py-0.5 text-[10px] uppercase">
                            soon
                          </span>
                        </span>
                      ) : (
                        <Link
                          href={item.href}
                          className="block rounded-md px-3 py-1.5 text-sm text-br-text-muted transition hover:bg-br-surface hover:text-br-text"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">{children}</main>

        {/* Right Sidebar - Page TOC placeholder */}
        <aside className="hidden w-48 shrink-0 xl:block">
          <div className="sticky top-24 text-sm">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-br-text-muted">
              On this page
            </h4>
            <p className="text-br-text-muted/50 text-xs italic">
              Table of contents will appear here for longer docs.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
