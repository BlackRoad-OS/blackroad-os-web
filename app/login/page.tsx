import styles from './page.module.css';

export default function LoginPage() {
  return (
    <section className={styles.brLoginLayout}>
      <div className={styles.chromeBar}>
        <div className={styles.identity}>
          <div className={styles.brandGlyph}>BR·OS</div>
          <div>
            <p className={styles.chromeLabel}>Operator Access</p>
            <p className={styles.chromeMeta}>Secure ingress · Tier 1 controls</p>
          </div>
        </div>
        <div className={styles.chromeStatus}>
          <span className={styles.statusPulse} aria-hidden />
          <span className={styles.statusText}>Systems nominal</span>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.authCard}>
          <div className={styles.cardHeader}>
            <p className={styles.eyebrow}>BlackRoad Operator</p>
            <h1 className={styles.title}>Login</h1>
            <p className={styles.subtitle}>Use your BR·OS credentials to continue.</p>
          </div>

          <form className={styles.form} action="#" method="post">
            <label className={styles.field}>
              <span>Access ID</span>
              <input type="email" name="email" placeholder="you@blackroad.systems" />
            </label>
            <label className={styles.field}>
              <span>Passphrase</span>
              <input type="password" name="password" placeholder="••••••••••" />
            </label>
            <div className={styles.actions}>
              <button type="submit" className={styles.primaryButton}>
                Sign in
              </button>
              <button type="button" className={styles.secondaryButton}>
                Request access
              </button>
            </div>
          </form>

          <div className={styles.helpRow}>
            <span className={styles.helpLabel}>Need help?</span>
            <a className={styles.link} href="mailto:ops@blackroad.systems">
              Contact operations
            </a>
          </div>
        </div>

        <div className={styles.heroPanel}>
          <div className={styles.heroBadge}>BR·OS</div>
          <div className={styles.heroCopy}>
            <h2>Operational control</h2>
            <p>
              Enforce least-privilege access to the systems that keep BlackRoad OS running. Secure
              tunnels, full audit trails, and tiered access all live here.
            </p>
            <ul className={styles.heroList}>
              <li>Unified operator ingress with adaptive authentication</li>
              <li>Live telemetry overlays with anomaly detection</li>
              <li>Role-aware controls scoped to your responsibilities</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
