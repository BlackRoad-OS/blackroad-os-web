import styles from './page.module.css';

export const metadata = {
  title: 'BlackRoad OS — Typography',
  description: 'Typography and spacing system guidelines for BlackRoad OS.'
};

export default function TypographyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeChip} />
              <span>BlackRoad OS · Type &amp; Spacing</span>
            </div>
            <h1>
              <span>BlackRoad OS</span> Typography System
            </h1>
            <p className={styles.heroSubtitle}>
              Opinionated rules for type scale, line heights, and spacing so every BlackRoad surface
              feels like the same OS – from Prism Console to docs to marketing.
            </p>
            <div className={styles.heroMeta}>
              <span>
                <strong>Family</strong>&nbsp;&nbsp;System sans, UI-first
              </span>
              <span>
                <strong>Scale</strong>&nbsp;&nbsp;Golden-ish, 1.25/1.6
              </span>
              <span>
                <strong>Grid</strong>&nbsp;&nbsp;4px core, 8/12/24 clusters
              </span>
            </div>
          </div>
          <aside className={styles.heroTypeCard}>
            <div className={styles.heroTypeDisplay}>
              <span>BR</span>
              <span>OS</span>
            </div>
            <div className={styles.heroTypeMeta}>
              Primary UI font:
              <span className={styles.mono}>
                {' '}
                -apple-system, BlinkMacSystemFont, &quot;SF Pro Text&quot;, &quot;Segoe UI&quot;
              </span>
              . Calm, high-legibility grotesk tuned for dense operator consoles.
            </div>
          </aside>
        </header>

        <section id="stack" className={styles.section}>
          <div className={styles.pill}>
            <span className={styles.pillDot} />
            <span>Section 01</span>
          </div>
          <h2>Font Stack &amp; Roles</h2>
          <p className={styles.sectionSub}>
            BlackRoad favors system sans for speed and familiarity. Monospace is reserved for IDs,
            hashes, and anything an operator might copy-paste into a terminal.
          </p>
          <div className={`${styles.grid} ${styles.gridTwo}`}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Primary UI Sans</div>
                <div className={styles.cardTag}>General Interface</div>
              </div>
              <p>
                Use the system sans stack everywhere in product UI: headings, labels, buttons, and
                body.
              </p>
              <div className={styles.typeRow}>
                <div className={styles.typeLabel}>CSS Stack</div>
                <div className={styles.mono}>
                  font-family: -apple-system, BlinkMacSystemFont, &quot;SF Pro Text&quot;, &quot;Segoe UI&quot;, Roboto,
                  &quot;Helvetica Neue&quot;, Arial, sans-serif;
                </div>
              </div>
              <div className={styles.typeRow}>
                <div className={styles.typeLabel}>Recommended Weights</div>
                <div className={styles.typeToken}>
                  400 – Body · 500 – Emphasis · 600 – Section titles · 700 – Key headings
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Monospace Layer</div>
                <div className={styles.cardTag}>Hashes &amp; Logs</div>
              </div>
              <p>Use monospace only where alignment and legibility of technical strings matters.</p>
              <div className={styles.typeRow}>
                <div className={styles.typeLabel}>CSS Stack</div>
                <div className={styles.mono}>
                  font-family: &quot;JetBrains Mono&quot;, &quot;SF Mono&quot;, ui-monospace, Menlo, Monaco, Consolas,
                  &quot;Liberation Mono&quot;, monospace;
                </div>
              </div>
              <div className={styles.typeRow}>
                <div className={styles.typeLabel}>Use For</div>
                <ul>
                  <li>Agent IDs, ledger hashes, transaction refs</li>
                  <li>Code examples, CLI snippets, JSON blobs</li>
                  <li>Tables where numbers must align</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="scale" className={styles.section}>
          <div className={styles.pill}>
            <span className={styles.pillDot} />
            <span>Section 02</span>
          </div>
          <h2>Type Scale</h2>
          <p className={styles.sectionSub}>
            A compact, golden-ish scale keeps dashboards dense but readable. These are canonical tokens
            for product and docs.
          </p>
          <div className={`${styles.grid} ${styles.gridTwo}`}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Scale Tokens</div>
                <div className={styles.cardTag}>Rem-based</div>
              </div>
              <table className={styles.scaleTable}>
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Usage</th>
                    <th>Size</th>
                    <th>Line-height</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>text-xs</code>
                    </td>
                    <td>Meta labels, pills</td>
                    <td>0.75rem</td>
                    <td>1.4</td>
                  </tr>
                  <tr>
                    <td>
                      <code>text-sm</code>
                    </td>
                    <td>Dense UI</td>
                    <td>0.875rem</td>
                    <td>1.5</td>
                  </tr>
                  <tr>
                    <td>
                      <code>text-md</code>
                    </td>
                    <td>Body</td>
                    <td>1.0rem</td>
                    <td>1.7</td>
                  </tr>
                  <tr>
                    <td>
                      <code>text-lg</code>
                    </td>
                    <td>Section titles</td>
                    <td>1.25rem</td>
                    <td>1.5</td>
                  </tr>
                  <tr>
                    <td>
                      <code>text-xl</code>
                    </td>
                    <td>H2</td>
                    <td>1.5rem</td>
                    <td>1.3</td>
                  </tr>
                  <tr>
                    <td>
                      <code>text-2xl</code>
                    </td>
                    <td>H1 / hero</td>
                    <td>2.0rem</td>
                    <td>1.1</td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.callout}>
                <strong>Rule:</strong> never go below <code>text-sm</code> for interactive UI copy.
                Reserve <code>text-xs</code> for metadata only.
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Hierarchy Examples</div>
                <div className={styles.cardTag}>Live Samples</div>
              </div>
              <div className={styles.typeRow}>
                <div className={styles.typeLabel}>H1 / View Title</div>
                <div className={`${styles.typeToken} ${styles.mono}`}>
                  font-size: 2rem; line-height: 1.1; font-weight: 700;
                </div>
                <div
                  className={styles.typeSample}
                  style={{ fontSize: '2rem', lineHeight: 1.1, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 4 }}
                >
                  Agent Orchestration Overview
                </div>
              </div>
              <div className={styles.typeRow}>
                <div className={styles.typeLabel}>H2 / Section</div>
                <div className={`${styles.typeToken} ${styles.mono}`}>
                  font-size: 1.5rem; line-height: 1.3; font-weight: 600;
                </div>
                <div
                  className={styles.typeSample}
                  style={{ fontSize: '1.5rem', lineHeight: 1.3, fontWeight: 600, marginTop: 4 }}
                >
                  RoadChain Activity
                </div>
              </div>
              <div className={styles.typeRow}>
                <div className={styles.typeLabel}>Body</div>
                <div className={`${styles.typeToken} ${styles.mono}`}>
                  font-size: 1rem; line-height: 1.7; font-weight: 400;
                </div>
                <div
                  className={styles.typeSample}
                  style={{ fontSize: '1rem', lineHeight: 1.7, marginTop: 4, color: 'var(--br-muted)' }}
                >
                  Every event is timestamped, hashed, and linked to a human or agent identity.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="spacing" className={styles.section}>
          <div className={styles.pill}>
            <span className={styles.pillDot} />
            <span>Section 03</span>
          </div>
          <h2>Spacing System</h2>
          <p className={styles.sectionSub}>
            Spacing follows a 4px core grid with preferred jumps that feel slightly golden – 4, 8, 12,
            16, 24, 32, 40, 64. Use these tokens for padding, gaps, and margins.
          </p>
          <div className={styles.spacingGrid}>
            <div className={styles.spaceChip}>
              <div className={styles.spaceLabel}>Tight</div>
              <div className={styles.spaceVis} style={{ width: '40%' }} />
              <div className={styles.spaceValue}>4px · 8px · 12px — label gaps, pill padding, icon offsets.</div>
            </div>
            <div className={styles.spaceChip}>
              <div className={styles.spaceLabel}>Core</div>
              <div className={styles.spaceVis} style={{ width: '65%' }} />
              <div className={styles.spaceValue}>16px · 24px — card padding, section gutters, column gaps.</div>
            </div>
            <div className={styles.spaceChip}>
              <div className={styles.spaceLabel}>Hero</div>
              <div className={styles.spaceVis} style={{ width: '90%' }} />
              <div className={styles.spaceValue}>32px · 40px · 64px — outer shell padding, hero breathing room.</div>
            </div>
          </div>
          <div className={styles.callout} style={{ marginTop: 14 }}>
            <strong>Rule of three:</strong> within a single screen, try to stick to three spacing sizes
            max (e.g., 8px, 16px, 32px). This keeps the OS feeling intentional and grid-aligned.
          </div>
        </section>

        <section id="examples" className={styles.section}>
          <div className={styles.pill}>
            <span className={styles.pillDot} />
            <span>Section 04</span>
          </div>
          <h2>Composed Examples</h2>
          <p className={styles.sectionSub}>
            How the typography and spacing tokens come together in real UI: a typical operator view with
            a hero, metrics, and logs.
          </p>
          <div className={styles.exampleLayout}>
            <div className={styles.exampleHeader}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
                Prism Console · Live Agents
              </h3>
              <p>Typography: text-2xl / text-md. Spacing: 24px shell, 16px inner, 8px meta.</p>
            </div>
            <div className={styles.exampleBody}>
              <div className={styles.exampleCard}>
                <div className={styles.typeLabel}>Panel Title (H2)</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 4 }}>Active Agent Swarm</div>
                <p style={{ margin: '0 0 6px' }}>42 agents online · 6 pending · 1 requiring manual review.</p>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--br-muted)' }}>
                  Body copy at 1rem or 0.875rem with 1.7 line-height keeps dense metrics readable.
                </p>
              </div>
              <div className={styles.exampleCard}>
                <div className={styles.typeLabel}>Log Row</div>
                <div className={styles.mono} style={{ fontSize: 12 }}>
                  2025-11-21T17:03Z · agent-042 · routed_order · tx: 0x8f9c…b21e
                </div>
                <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--br-muted)' }}>
                  Monospace only for data you might copy. Keep log rows at <code>text-sm</code> with 1.5
                  line-height.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="rules" className={styles.section}>
          <div className={styles.pill}>
            <span className={styles.pillDot} />
            <span>Section 05</span>
          </div>
          <h2>Do &amp; Don&apos;t</h2>
          <p className={styles.sectionSub}>
            A few guardrails so the BlackRoad OS typographic voice stays calm, legible, and consistent
            across every repo.
          </p>
          <div className={`${styles.grid} ${styles.gridTwo}`}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Do</div>
                <div className={styles.cardTag}>Good Patterns</div>
              </div>
              <ul>
                <li>Use a single sans family + monospace accent per view.</li>
                <li>Keep heading levels sequential; don&apos;t jump from H1 to H4.</li>
                <li>Use generous line-height (1.6–1.8) for dense explanations.</li>
                <li>Align text to a core vertical rhythm using 4px/8px multiples.</li>
              </ul>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Don&apos;t</div>
                <div className={styles.cardTag}>Avoid</div>
              </div>
              <ul>
                <li>Mix more than two font weights in a single panel.</li>
                <li>Use all caps for long sentences; reserve for labels.</li>
                <li>Drop below 12px for interactive text.</li>
                <li>Ignore spacing tokens and invent one-off paddings.</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>BlackRoad OS · Typography &amp; Spacing v1.0</span>
          <span>Align to these tokens in every repo: web, console, docs, and brand.</span>
        </footer>
      </div>
    </div>
  );
}
