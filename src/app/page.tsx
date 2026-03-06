"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;

const PORTALS = [
  { name: "RoadWork",   desc: "AI tutoring that adapts to how you actually learn. Not how a textbook thinks you should.",              tag: "Education" },
  { name: "RoadView",   desc: "Search that verifies before it surfaces. Every result scored for confidence, not clicks.",              tag: "Search"    },
  { name: "RoadGlitch", desc: "Drag-and-drop automation that generates production code. Your codebase, your style.",                   tag: "Backend"   },
  { name: "RoadWorld",  desc: "Virtual environments with real-world bridges. 80% creator revenue. You own everything.",                tag: "Worlds"    },
  { name: "BackRoad",   desc: "Social without the sickness. No vanity metrics. No addiction mechanics. Just people.",                  tag: "Social"    },
  { name: "CashRoad",   desc: "Financial clarity without judgment. Decision-time assistance, not post-spending shame.",                tag: "Finance"   },
];

const PRINCIPLES = [
  { number: "01", title: "Truth-First",        body: "Every piece of information carries a confidence score. No SEO gaming. No ad-driven rankings. Only verified facts surface." },
  { number: "02", title: "Creator-Owned",      body: "80% revenue share. Your data, your content, your audience. Portable identity across every portal in the ecosystem." },
  { number: "03", title: "Agent Intelligence", body: "1,000 AI agents with persistent memory, individual identities, and evolving capabilities oriented toward community betterment." },
  { number: "04", title: "Zero Admin",         body: "The OS handles forms, PDFs, onboarding, and compliance in the background. Admin becomes invisible, not a life event." },
];

const STATS = [
  { value: "1,000", label: "AI Agents"      },
  { value: "20",    label: "Domains"        },
  { value: "150+",  label: "Subdomains"     },
  { value: "80%",   label: "Creator Revenue"},
];

function GradientBar({ height = 2, style = {} }: { height?: number; style?: React.CSSProperties }) {
  return <div style={{ height, background: GRADIENT, borderRadius: 2, ...style }} />;
}

export default function HomePage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff", fontFamily: "Inter, -apple-system, sans-serif" }}>
      <GradientBar height={3} />

      {/* Hero */}
      <div
        ref={heroRef}
        style={{
          minHeight: "90vh", display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center", textAlign: "center",
          padding: "80px 24px", position: "relative", overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS[3]}15 0%, transparent 70%)`,
          top: "50%", left: "50%",
          transform: `translate(-50%, calc(-50% - ${scrollY * 0.3}px))`,
          pointerEvents: "none",
        }} />

        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#525252", textTransform: "uppercase", marginBottom: 20 }}>
          BlackRoad OS · Your AI. Your Hardware. Your Rules.
        </div>

        <h1 style={{ fontSize: "clamp(40px, 8vw, 80px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 24px", maxWidth: 900 }}>
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            The OS that doesn&apos;t
          </span>
          <br />
          <span style={{ color: "#f5f5f5" }}>work against you.</span>
        </h1>

        <p style={{ color: "#737373", fontSize: 18, maxWidth: 560, lineHeight: 1.7, marginBottom: 40 }}>
          An AI operating system built on 317+ equations, 1,000 persistent agents, and one belief:
          technology should serve the people who use it.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/pricing"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: GRADIENT,
              color: "#fff",
              border: "none",
              padding: "12px 28px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Get started free
          </Link>
          <Link
            href="/docs"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              color: "#a3a3a3",
              border: "1px solid #262626",
              padding: "12px 28px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Read the docs
          </Link>
        </div>

        <div style={{ display: "flex", gap: 48, marginTop: 72, flexWrap: "wrap", justifyContent: "center" }}>
          {STATS.map((stat, i) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: COLORS[i % COLORS.length], letterSpacing: "-0.02em" }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: "#525252", marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Portals */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#525252", textTransform: "uppercase", marginBottom: 12 }}>
            20 domains. 150+ subdomains.
          </div>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#f5f5f5", margin: 0, letterSpacing: "-0.02em" }}>
            One OS to rule them all.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
          {PORTALS.map((portal, i) => (
            <div
              key={portal.name}
              onMouseEnter={() => setHovered(portal.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "#0a0a0a",
                border: hovered === portal.name ? `1px solid ${COLORS[i % COLORS.length]}` : "1px solid #1a1a1a",
                borderRadius: 10, padding: "20px 22px",
                transition: "border-color 0.15s", cursor: "default",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5" }}>{portal.name}</span>
                <span style={{
                  fontSize: 10, color: COLORS[i % COLORS.length], letterSpacing: "0.08em",
                  textTransform: "uppercase", background: `${COLORS[i % COLORS.length]}18`,
                  padding: "2px 8px", borderRadius: 20,
                }}>
                  {portal.tag}
                </span>
              </div>
              <p style={{ fontSize: 13, color: "#525252", lineHeight: 1.5, margin: 0 }}>{portal.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Principles */}
      <div style={{ background: "#050505", borderTop: "1px solid #111", borderBottom: "1px solid #111", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#f5f5f5", margin: 0, letterSpacing: "-0.02em" }}>
              How it works
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {PRINCIPLES.map((p, i) => (
              <div key={p.number} style={{ display: "flex", gap: 16 }}>
                <div style={{ fontSize: 11, color: COLORS[i % COLORS.length], fontFamily: "'JetBrains Mono', monospace", flexShrink: 0, marginTop: 3 }}>{p.number}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#d4d4d4", marginBottom: 6 }}>{p.title}</div>
                  <p style={{ fontSize: 13, color: "#525252", lineHeight: 1.6, margin: 0 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Ready to get out of your own way?
          </span>
        </h2>
        <p style={{ color: "#737373", fontSize: 16, marginBottom: 32 }}>
          Free plan. No credit card. No dark patterns.
        </p>
        <Link
          href="/pricing"
          style={{
            textDecoration: "none",
            display: "inline-block",
            background: GRADIENT,
            color: "#fff",
            border: "none",
            padding: "14px 36px",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Start for free
        </Link>
      </div>
    </div>
  );
}
