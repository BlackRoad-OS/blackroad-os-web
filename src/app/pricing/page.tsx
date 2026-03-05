"use client";

import { useState } from "react";

const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;

const PLANS = [
  {
    name: "Open",
    price: "0",
    period: "",
    desc: "For learners, explorers, and anyone who just wants to see what this is.",
    features: [
      "Full K-12 RoadWork access",
      "Lucidia chat — 50 messages/day",
      "RoadView search — unlimited",
      "BackRoad social — full access",
      "1 AI agent companion",
      "Community support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Builder",
    price: "10",
    period: "/mo",
    desc: "For creators, students, and independent professionals building real things.",
    features: [
      "Everything in Open",
      "Unlimited Lucidia chat + code",
      "RoadGlitch automations — 100/mo",
      "SoundRoad — 10 tracks/mo",
      "Genesis Road — basic 3D",
      "VaultRoad second brain — 10GB",
      "5 AI agents with memory",
      "CashRoad financial co-pilot",
      "Priority support",
    ],
    cta: "Start Building",
    highlight: true,
  },
  {
    name: "Studio",
    price: "29",
    period: "/mo",
    desc: "For teams, studios, and serious creators who need the full stack.",
    features: [
      "Everything in Builder",
      "Unlimited automations",
      "SoundRoad — unlimited tracks",
      "Genesis Road — full engine",
      "VaultRoad — 100GB",
      "25 AI agents with persistent memory",
      "RoadWorld — publish & earn",
      "80% revenue on all content",
      "API access",
      "Team collaboration — up to 5",
    ],
    cta: "Go Studio",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For schools, organizations, and companies that need the OS at scale.",
    features: [
      "Everything in Studio",
      "Unlimited agents",
      "Custom agent training",
      "Dedicated infrastructure",
      "SSO / SAML / SCIM",
      "Compliance & audit logs",
      "Outcome-based pricing for schools",
      "SLA guarantee",
      "Dedicated support engineer",
    ],
    cta: "Talk to Us",
    highlight: false,
  },
];

const FAQS = [
  { q: "What's outcome-based pricing?", a: "Schools pay per successful student outcome — not per seat. If a student doesn't learn, you don't pay. We believe in aligning incentives with actual results." },
  { q: "Can I switch plans anytime?", a: "Yes. Upgrade instantly, downgrade at end of billing cycle. No contracts, no cancellation fees, no friction." },
  { q: "What does 80% creator revenue mean?", a: "When you publish content, sell assets, or earn through the ecosystem, you keep 80%. Compare that to Roblox at 29%, YouTube at 55%, or Spotify at roughly 0.3%." },
  { q: "What's an AI agent with memory?", a: "Each agent has persistent memory via PS-SHA∞ hashing. They remember every interaction, evolve over time, and develop individual capabilities. They're teammates, not tools." },
  { q: "Is my data portable?", a: "Always. Export everything — your content, your audience contacts, your agent configurations, your vault. You own it all." },
  { q: "Do you sell my data?", a: "No. Ever. Your data trains nothing except your own agents. BlackRoad is funded by subscriptions and creator revenue sharing — not surveillance." },
];

const COMPARISONS = [
  { feature: "Creator revenue share", blackroad: "80%", others: "29–55%" },
  { feature: "Data ownership", blackroad: "Full export", others: "Platform-locked" },
  { feature: "AI agents with memory", blackroad: "Up to 1,000", others: "None" },
  { feature: "Search verification", blackroad: "Confidence scored", others: "SEO-driven" },
  { feature: "Social metrics", blackroad: "Hidden by design", others: "Vanity-first" },
  { feature: "Admin automation", blackroad: "Zero-friction OS", others: "Manual" },
];

function GradientBar({ height = 2, style = {} }: { height?: number; style?: React.CSSProperties }) {
  return <div style={{ height, background: GRADIENT, borderRadius: 2, ...style }} />;
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff", fontFamily: "Inter, -apple-system, sans-serif" }}>
      <GradientBar height={3} />

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "72px 24px 48px" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#525252", textTransform: "uppercase", marginBottom: 16 }}>
          Pricing
        </div>
        <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 16px", lineHeight: 1.1 }}>
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Fair pricing.
          </span>{" "}
          <span style={{ color: "#f5f5f5" }}>Finally.</span>
        </h1>
        <p style={{ color: "#737373", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
          No surveillance. No dark patterns. No VC pressure to extract. Just tools that cost less than what they replace.
        </p>
      </div>

      {/* Plans */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {PLANS.map((plan, i) => (
          <div
            key={plan.name}
            style={{
              background: "#0a0a0a",
              border: plan.highlight ? `1px solid ${COLORS[1]}` : "1px solid #1a1a1a",
              borderRadius: 12,
              padding: "28px 24px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {plan.highlight && (
              <div style={{
                position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                background: COLORS[1], color: "#fff", fontSize: 10, fontWeight: 700,
                padding: "3px 12px", borderRadius: 20, letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                Most Popular
              </div>
            )}
            {plan.highlight && (
              <GradientBar height={2} style={{ position: "absolute", top: 0, left: 0, right: 0, borderRadius: "12px 12px 0 0" }} />
            )}

            <div style={{ fontSize: 11, letterSpacing: "0.12em", color: COLORS[i % COLORS.length], textTransform: "uppercase", marginBottom: 8 }}>
              {plan.name}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 8 }}>
              {plan.price !== "Custom" && <span style={{ fontSize: 13, color: "#525252" }}>$</span>}
              <span style={{ fontSize: 36, fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.02em" }}>{plan.price}</span>
              {plan.period && <span style={{ fontSize: 13, color: "#525252" }}>{plan.period}</span>}
            </div>
            <p style={{ fontSize: 13, color: "#525252", lineHeight: 1.5, marginBottom: 20 }}>{plan.desc}</p>

            <div style={{ flex: 1, marginBottom: 24 }}>
              {plan.features.map((f) => (
                <div key={f} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ color: COLORS[i % COLORS.length], fontSize: 12, marginTop: 1, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: "#a3a3a3", lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>

            <button style={{
              width: "100%", padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 600,
              cursor: "pointer", border: plan.highlight ? "none" : "1px solid #262626",
              background: plan.highlight ? GRADIENT : "transparent",
              color: plan.highlight ? "#fff" : "#a3a3a3",
            }}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Comparison */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 64px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f5f5f5", marginBottom: 24, letterSpacing: "-0.01em" }}>
          How we compare
        </h2>
        <div style={{ border: "1px solid #1a1a1a", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#0a0a0a", padding: "10px 16px", borderBottom: "1px solid #1a1a1a" }}>
            <span style={{ fontSize: 11, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em" }}>Feature</span>
            <span style={{ fontSize: 11, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em" }}>BlackRoad</span>
            <span style={{ fontSize: 11, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em" }}>Others</span>
          </div>
          {COMPARISONS.map((row, i) => (
            <div key={row.feature} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              padding: "12px 16px", background: i % 2 === 0 ? "#000" : "#050505",
              borderBottom: i < COMPARISONS.length - 1 ? "1px solid #111" : "none",
            }}>
              <span style={{ fontSize: 13, color: "#737373" }}>{row.feature}</span>
              <span style={{ fontSize: 13, color: COLORS[0], fontWeight: 500 }}>{row.blackroad}</span>
              <span style={{ fontSize: 13, color: "#404040" }}>{row.others}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f5f5f5", marginBottom: 24, letterSpacing: "-0.01em" }}>
          Frequently asked
        </h2>
        {FAQS.map((faq, i) => (
          <div
            key={i}
            style={{ borderBottom: "1px solid #111", cursor: "pointer" }}
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0" }}>
              <span style={{ fontSize: 14, color: "#d4d4d4", fontWeight: 500 }}>{faq.q}</span>
              <span style={{ color: "#404040", fontSize: 18, lineHeight: 1 }}>{openFaq === i ? "−" : "+"}</span>
            </div>
            {openFaq === i && (
              <p style={{ fontSize: 13, color: "#737373", lineHeight: 1.7, paddingBottom: 16, margin: 0 }}>{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
