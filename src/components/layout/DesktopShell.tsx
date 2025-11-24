import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { Window } from '../ui/Window';
import styles from './DesktopShell.module.css';

interface DesktopShellProps {
  prismUrl: string;
  docsUrl: string;
}

export function DesktopShell({ prismUrl, docsUrl }: DesktopShellProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.backgroundGlow} />
      <div className={styles.grid}>
        <Window title="Prism Console" subtitle="Live agents & approvals" icon={<span aria-hidden>🖥️</span>}>
          <div className={styles.inlineGrid}>
            <div>
              <p className={styles.widgetTitle}>Active agents</p>
              <p className={styles.widgetValue}>42</p>
            </div>
            <div>
              <p className={styles.widgetTitle}>Awaiting approval</p>
              <p className={styles.widgetValue}>7 human gates</p>
            </div>
            <div>
              <p className={styles.widgetTitle}>RoadChain events</p>
              <p className={styles.widgetValue}>18,204</p>
            </div>
          </div>
          <Button href={prismUrl} variant="secondary" style={{ marginTop: '0.8rem' }}>
            Open Prism Console
          </Button>
        </Window>

        <Window title="Core / Operator" subtitle="PS-SHA∞ truth + jobs" icon={<span aria-hidden>🛰️</span>}>
          <div className={styles.inlineGrid}>
            <div>
              <p className={styles.widgetTitle}>Identities</p>
              <p className={styles.widgetValue}>PS-SHA∞ x 12,448</p>
            </div>
            <div>
              <p className={styles.widgetTitle}>Queued jobs</p>
              <p className={styles.widgetValue}>1,024</p>
            </div>
            <div>
              <p className={styles.widgetTitle}>Replay buffers</p>
              <p className={styles.widgetValue}>Ready</p>
            </div>
          </div>
          <div className={styles.row} style={{ marginTop: '0.8rem' }}>
            <Tag>Policy-driven</Tag>
            <Tag>Audit linked</Tag>
          </div>
        </Window>

        <Window title="RoadChain" subtitle="Immutable audit" icon={<span aria-hidden>🔗</span>}>
          <p className={styles.widgetTitle}>Recent commits</p>
          <div className={styles.inlineGrid}>
            <div>
              <p className={styles.widgetValue}>#20294</p>
              <p className={styles.muted}>Atlas upgraded finance guardrails</p>
            </div>
            <div>
              <p className={styles.widgetValue}>#20295</p>
              <p className={styles.muted}>Agent Lucidia issued research memo</p>
            </div>
          </div>
          <p className={styles.muted} style={{ marginTop: '0.75rem' }}>
            Every action is hashed, linked, and replayable.
          </p>
        </Window>

        <Window title="Wallet & ROI" subtitle="Finance intelligence" icon={<span aria-hidden>💹</span>}>
          <div className={styles.inlineGrid}>
            <div>
              <p className={styles.widgetTitle}>Runway</p>
              <p className={styles.widgetValue}>18.4 months</p>
            </div>
            <div>
              <p className={styles.widgetTitle}>Automation ROI</p>
              <p className={styles.widgetValue}>+214%</p>
            </div>
            <div>
              <p className={styles.widgetTitle}>Treasury</p>
              <p className={styles.widgetValue}>$42.8M</p>
            </div>
          </div>
          <Button href={docsUrl} variant="secondary" style={{ marginTop: '0.8rem' }}>
            View finance stack
          </Button>
        </Window>
      </div>
    </div>
  );
}
