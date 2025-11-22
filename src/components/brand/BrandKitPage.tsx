import styles from './BrandKitPage.module.css';

const gradientStops = [
  { hex: '#FF9D00', name: 'Sunrise Orange' },
  { hex: '#FF6B00', name: 'Warm Orange' },
  { hex: '#FF0066', name: 'Hot Pink' },
  { hex: '#FF006B', name: 'Electric Magenta' },
  { hex: '#D600AA', name: 'Deep Magenta' },
  { hex: '#7700FF', name: 'Vivid Purple' },
  { hex: '#0066FF', name: 'Cyber Blue' }
];

const neutrals = [
  { hex: '#000000', name: 'Pure Black' },
  { hex: '#0A0A0A', name: 'Deep Black' },
  { hex: '#1A1A1A', name: 'Charcoal' },
  { hex: '#FFFFFF', name: 'Pure White' }
];

const gradients = [
  {
    name: 'BR Gradient',
    direction: 'Top-to-bottom',
    stops: 'linear-gradient(180deg,#FF9D00 0%,#FF6B00 25%,#FF0066 75%,#FF006B 100%)'
  },
  {
    name: 'OS Gradient',
    direction: 'Top-to-bottom',
    stops: 'linear-gradient(180deg,#FF006B 0%,#D600AA 25%,#7700FF 75%,#0066FF 100%)'
  }
];

const spacing = [
  { label: 'XS', value: '4px', description: 'Tight spacing for badges and chips.' },
  { label: 'SM', value: '8px', description: 'Compact gutters, icon padding.' },
  { label: 'MD', value: '12px', description: 'Card interior padding, inline gaps.' },
  { label: 'LG', value: '18px', description: 'Section gutters and stack spacing.' },
  { label: 'XL', value: '24px', description: 'Panel padding and hero breathing room.' }
];

const usage = [
  {
    title: 'Gradient Frame',
    description: 'Use BR→OS gradients for hero backdrops, buttons, and accent dividers.',
    style: {
      background:
        'linear-gradient(135deg, var(--br-gradient-start) 0%, var(--br-gradient-hot) 30%, var(--os-gradient-deep) 70%, var(--os-gradient-end) 100%)'
    }
  },
  {
    title: 'Neutral Panels',
    description: 'Pair vibrant gradients with deep neutral surfaces to preserve contrast and focus.',
    style: { background: '#0a0a0a', border: '1px solid #1a1a1a' }
  },
  {
    title: 'Monochrome Logo',
    description: 'On busy photography, switch to a solid white or black wordmark for clarity.',
    style: { background: '#1a1a1a' }
  }
];

const dos = [
  'Maintain vertical gradient flow for hero panels and large backgrounds.',
  'Use ample padding between gradients and text for legibility.',
  'Anchor the logo on neutral or lightly blurred gradient zones.'
];

const donts = [
  "Don’t skew the gradient stops or introduce new hues.",
  "Don’t place body copy directly on top of hot pink or blue stops without contrast support.",
  "Don’t stretch the logotype or add drop shadows to the mark."
];

export function BrandKitPage() {
  return (
    <div className={styles.brandPage}>
      <section className={`${styles.surface} ${styles.hero}`}>
        <div className={styles.heroBackground} aria-hidden />
        <div className={styles.heroContent}>
          <p className="muted">Visual language</p>
          <h1>BlackRoad OS Brand Kit</h1>
          <p className={styles.sectionDescription}>
            Extracted directly from the provided gradients and palette. This kit captures the BR → OS
            color system, typography, spacing, and usage rules needed to build new surfaces without
            deviating from the core identity.
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden /> BR → OS gradient spine
            </span>
            <span className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden /> System font stack
            </span>
            <span className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden /> Dark canvas + high contrast
            </span>
          </div>
        </div>
      </section>

      <section className={styles.surface}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Primary Gradient Stops</h2>
          <p className={styles.sectionDescription}>Core BR/OS stops used in hero frames, glows, and CTAs.</p>
        </div>
        <div className={styles.grid}>
          {gradientStops.map((stop) => (
            <div key={stop.hex} className={styles.card}>
              <div className={styles.swatch} style={{ background: stop.hex }} aria-hidden />
              <div className={styles.label}>
                <span>{stop.hex}</span>
                <span className={styles.subtle}>{stop.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.surface}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Core Neutrals</h2>
          <p className={styles.sectionDescription}>
            Neutrals keep the gradients grounded. Use them for panels, overlays, and typography bases.
          </p>
        </div>
        <div className={styles.grid}>
          {neutrals.map((neutral) => (
            <div key={neutral.hex} className={styles.card}>
              <div className={styles.swatch} style={{ background: neutral.hex }} aria-hidden />
              <div className={styles.label}>
                <span>{neutral.hex}</span>
                <span className={styles.subtle}>{neutral.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.surface}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>BR → OS Gradients</h2>
          <p className={styles.sectionDescription}>Vertical flows carry the brand from BR into OS moments.</p>
        </div>
        <div className={styles.grid}>
          {gradients.map((gradient) => (
            <div key={gradient.name} className={styles.card}>
              <div className={styles.swatch} style={{ background: gradient.stops }} aria-hidden />
              <div className={styles.label}>
                <span>{gradient.name}</span>
                <span className={styles.subtle}>{gradient.direction}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.surface}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Typography</h2>
          <p className={styles.sectionDescription}>
            System-native sans keeps the UI nimble and legible. Pair bold headings with relaxed body
            copy for technical clarity.
          </p>
        </div>
        <div className={styles.gridHalf}>
          <div className={styles.typographyBlock}>
            <p className={styles.typographyRow}>
              <span>BR Sans</span>
              <span>Inter / -apple-system / Segoe UI</span>
            </p>
            <h3 className={styles.sampleHeading}>Gradient-first identity</h3>
            <p className={styles.sampleParagraph}>
              Use tight leading for titles and generous spacing beneath to let the gradients breathe.
              Body copy should stay at 16–18px with 1.6 line-height for readable docs and dashboards.
            </p>
          </div>
          <div className={styles.ruleCard}>
            <strong>Type ratios</strong>
            <ul className={styles.ruleList}>
              <li>H1: 42px / 800 weight</li>
              <li>H2: 26px / 700 weight</li>
              <li>Body: 16–18px / 400–500 weight</li>
              <li>All caps nav: 12–14px / letter spacing 0.08em</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.surface}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Spacing System</h2>
          <p className={styles.sectionDescription}>
            Consistent padding ensures the gradients never overpower the content. Use these tokens in
            layout primitives.
          </p>
        </div>
        <div className={styles.tokenGrid}>
          {spacing.map((token) => (
            <div key={token.label} className={styles.token}>
              <div className={styles.typographyRow}>
                <span>{token.label}</span>
                <span className={styles.subtle}>{token.value}</span>
              </div>
              <div className={styles.tokenBar} style={{ width: token.value }} aria-hidden />
              <p className={styles.subtle}>{token.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.surface}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Usage Guidelines</h2>
          <p className={styles.sectionDescription}>
            Keep gradients purposeful and typography readable. Pair them with neutrals for accessibility.
          </p>
        </div>
        <div className={styles.usageGrid}>
          {usage.map((item) => (
            <div key={item.title} className={styles.usageCard}>
              <div className={styles.usageVisual} style={item.style}>
                {item.title}
              </div>
              <div className={styles.usageContent}>
                <strong>{item.title}</strong>
                <p className={styles.subtle}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.gridHalf}>
          <div className={styles.callout}>
            <strong>Do</strong>
            <ul className={styles.ruleList}>
              {dos.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
          <div className={styles.callout}>
            <strong>Don’t</strong>
            <ul className={styles.ruleList}>
              {donts.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.surface}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Implementation</h2>
          <p className={styles.sectionDescription}>
            Copy/paste-ready snippets for gradients, buttons, and surfaces using the provided palette.
          </p>
        </div>
        <div className={styles.gridHalf}>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`/* Gradients */
.br-gradient {
  background: linear-gradient(180deg,#FF9D00 0%,#FF6B00 25%,#FF0066 75%,#FF006B 100%);
}
.os-gradient {
  background: linear-gradient(180deg,#FF006B 0%,#D600AA 25%,#7700FF 75%,#0066FF 100%);
}
/* Button */
.btn-primary {
  padding: 12px 18px;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(135deg,#FF9D00,#FF006B,#0066FF);
}`}</code>
            </pre>
          </div>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`/* Surfaces */
.panel {
  background: #0A0A0A;
  border: 1px solid #1A1A1A;
  color: #FFFFFF;
}
/* Typography */
:root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
}`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BrandKitPage;
