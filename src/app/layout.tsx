import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BlackRoad OS",
  description: "Your AI. Your Hardware. Your Rules.",
};

const BRAND_GRADIENT = "linear-gradient(90deg, #FF6B2B, #FF2255, #CC00AA, #8844FF, #4488FF, #00D4FF)";

const NAV_PUBLIC = [
  { href: "/pricing", label: "Pricing" },
  { href: "/docs",    label: "Docs"    },
  { href: "/about",   label: "About"   },
  { href: "/status",  label: "Status"  },
];

const NAV_APP = [
  { href: "/dashboard", label: "Dashboard", icon: "⬡" },
  { href: "/worlds",    label: "Worlds",    icon: "🌍" },
  { href: "/fleet",     label: "Fleet",     icon: "🍓" },
  { href: "/memory",    label: "Memory",    icon: "💾" },
  { href: "/settings",  label: "Settings",  icon: "⚙" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0, background: "#000", color: "#e0e0e0",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        minHeight: "100vh", display: "flex", flexDirection: "column",
      }}>

        <nav style={{
          display: "flex", alignItems: "center",
          borderBottom: "1px solid #111",
          padding: "0 1.5rem", height: 52,
          position: "sticky", top: 0,
          background: "#000000cc", backdropFilter: "blur(12px)", zIndex: 100,
        }}>
          <Link href="/" style={{ textDecoration: "none", marginRight: "1.5rem" }}>
            <span style={{
              fontWeight: 800, fontSize: 15, letterSpacing: "0.05em",
              background: BRAND_GRADIENT,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>BLACKROAD OS</span>
          </Link>

          <div style={{ display: "flex", gap: 2, flex: 1, alignItems: "center" }}>
            {NAV_PUBLIC.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                padding: "6px 12px", borderRadius: 6,
                textDecoration: "none", color: "#525252", fontSize: 13, fontWeight: 500,
              }}>
                {label}
              </Link>
            ))}

            <div style={{ width: 1, height: 18, background: "#1a1a1a", margin: "0 6px" }} />

            {NAV_APP.map(({ href, label, icon }) => (
              <Link key={href} href={href} style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "6px 10px", borderRadius: 6,
                textDecoration: "none", color: "#404040", fontSize: 12, fontWeight: 500,
              }}>
                <span style={{ fontSize: 11 }}>{icon}</span>
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4CAF50", boxShadow: "0 0 5px #4CAF50" }} />
            <span style={{ color: "#404040", fontSize: 11 }}>online</span>
          </div>
        </nav>

        <main style={{ flex: 1 }}>{children}</main>

        <footer style={{
          borderTop: "1px solid #111", padding: "1rem 1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ color: "#262626", fontSize: 11 }}>
            © 2026 BlackRoad OS, Inc. — All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { href: "/pricing", label: "Pricing" },
              { href: "/docs",    label: "Docs"    },
              { href: "/about",   label: "About"   },
              { href: "/status",  label: "Status"  },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ color: "#262626", fontSize: 11, textDecoration: "none" }}>
                {label}
              </Link>
            ))}
          </div>
        </footer>
      </body>
    </html>
  );
}
