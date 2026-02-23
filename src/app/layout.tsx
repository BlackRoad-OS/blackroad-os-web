import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BlackRoad OS",
  description: "AI Agent Orchestration Platform",
};

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "⬡" },
  { href: "/fleet",     label: "Fleet",     icon: "🍓" },
  { href: "/memory",    label: "Memory",    icon: "⛓" },
  { href: "/settings",  label: "Settings",  icon: "⚙" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, display: "flex", background: "#000" }}>
        {/* Sidebar */}
        <nav style={{
          width: "200px", background: "#0a0a0a", borderRight: "1px solid #1a1a1a",
          minHeight: "100vh", padding: "24px 0", flexShrink: 0,
          fontFamily: "-apple-system, sans-serif",
        }}>
          <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1a1a1a" }}>
            <div style={{
              fontSize: "16px", fontWeight: 700,
              background: "linear-gradient(135deg, #F5A623 0%, #FF1D6C 38.2%, #9C27B0 61.8%, #2979FF 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              BlackRoad OS
            </div>
          </div>
          <div style={{ padding: "16px 0" }}>
            {NAV_ITEMS.map(item => (
              <Link key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 20px", color: "#888", textDecoration: "none",
                fontSize: "14px", transition: "color 0.2s",
              }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
        {/* Main */}
        <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
      </body>
    </html>
  );
}
