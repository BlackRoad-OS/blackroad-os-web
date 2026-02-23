import Link from "next/link";

const NAV = [
  { href: "/agents", label: "Agents", icon: "◈" },
  { href: "/tasks", label: "Tasks", icon: "◉" },
  { href: "/memory", label: "Memory", icon: "◫" },
  { href: "/chat", label: "Chat", icon: "◎" },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-slate-800">
          <div className="font-bold text-white text-lg tracking-tight">
            BlackRoad
            <span
              className="ml-1"
              style={{
                background:
                  "linear-gradient(135deg, #F5A623 0%, #FF1D6C 38.2%, #9C27B0 61.8%, #2979FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              OS
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">30K Agents Online</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm font-medium"
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="text-xs text-slate-600">
            Gateway{" "}
            <span className="text-green-500">●</span>
          </div>
          <div className="text-xs text-slate-600 mt-0.5">
            v1.0.0 · blackroad.ai
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
