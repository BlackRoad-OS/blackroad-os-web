'use client';

import { FormEvent, useEffect } from 'react';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  useEffect(() => {
    const bodyClass = 'br-login-body';
    document.body.classList.add(bodyClass);
    return () => {
      document.body.classList.remove(bodyClass);
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const redactedPayload = {
      ...payload,
      password: payload.password ? '••••••' : '',
    };

    // eslint-disable-next-line no-console
    console.info('Login form submitted', redactedPayload);
  };

  return (
    <div className={styles.loginRoot}>
      <div className={styles.frameShell}>
        <div className={styles.frameInner}>
          <div className={styles.chrome}>
            <div className={styles.chromeLeft}>
              <div className={styles.windowDots} aria-hidden>
                <span className={`${styles.dot} ${styles.red}`} />
                <span className={`${styles.dot} ${styles.amber}`} />
                <span className={`${styles.dot} ${styles.green}`} />
              </div>
              <div className={styles.chromeTitle}>BlackRoad Operator Shell</div>
            </div>
            <div className={styles.chromePill}>
              <span className={styles.chromePillSwatch} />
              <span>Operator session</span>
            </div>
          </div>

          <div className={styles.layout}>
            <section className={styles.authCard}>
              <div className={styles.brandLockup}>
                <div className={styles.brandMark}>
                  <div className={styles.brandMarkInner}>
                    <span className={styles.brandMarkLine}>BR</span>
                    <span className={styles.brandMarkLine}>OS</span>
                  </div>
                </div>
                <div>
                  <div className={styles.brandTextTitle}>BlackRoad OS</div>
                  <div className={styles.brandTextSub}>Identity layer · Operator login</div>
                </div>
              </div>

              <div className={styles.identityStrip}>
                <span className={styles.identityBadge}>BR / OS Identity Layer</span>
                <div className={styles.identityMeta}>
                  <div>
                    <span className={styles.metaLabel}>Token set</span>
                    <span className={styles.metaValue}>BR-OS-LOGIN-v3</span>
                  </div>
                  <div>
                    <span className={styles.metaLabel}>Scope</span>
                    <span className={styles.metaValue}>Operators</span>
                  </div>
                  <div>
                    <span className={styles.metaLabel}>Status</span>
                    <span className={styles.metaValueSuccess}>Ready to wire</span>
                  </div>
                </div>
              </div>

              <h1 className={styles.authTitle}>Authenticate session</h1>
              <p className={styles.authSubtitle}>
                Secure access to the BlackRoad operator console. Use your organization credentials to
                continue.
              </p>

              <form onSubmit={handleSubmit}>
                <div>
                  <div className={styles.fieldLabelRow}>
                    <label htmlFor="email">Email</label>
                    <span className={styles.fieldHint}>workspace identity</span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.fieldPrefix}>br://</span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="username"
                      placeholder="operator@blackroad.systems"
                      required
                      aria-label="Email"
                    />
                    <span className={styles.fieldIcon} aria-hidden />
                  </div>
                </div>

                <div>
                  <div className={styles.fieldLabelRow}>
                    <label htmlFor="password">Password</label>
                    <span className={styles.fieldHint}>encrypted</span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.fieldPrefix}>***</span>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter passphrase"
                      required
                      aria-label="Password"
                    />
                    <span className={styles.fieldIcon} aria-hidden />
                  </div>
                </div>

                <div className={styles.actionsRow}>
                  <label className={styles.remember}>
                    <input type="checkbox" name="remember" value="on" />
                    <span>Keep me signed in</span>
                  </label>
                  <a className={styles.linkInline} href="#">
                    Forgot access?
                  </a>
                </div>

                <button type="submit" className={styles.primaryButton}>
                  Enter operating system
                  <span className={styles.kbd}>↵</span>
                </button>
              </form>

              <div className={styles.divider}>
                <span className={styles.dividerLine} />
                <span>Operator notices</span>
                <span className={styles.dividerLine} />
              </div>

              <ul className={styles.noticeList}>
                <li>All sessions monitored and audit logged.</li>
                <li>Use hardware key for elevated workflows.</li>
                <li>Contact security if you suspect compromise.</li>
              </ul>
            </section>

            <section className={styles.hero}>
              <div className={styles.heroGlow} aria-hidden />
              <div className={styles.heroBadge}>BlackRoad OS</div>
              <h2 className={styles.heroTitle}>Operator control surface</h2>
              <p className={styles.heroSubtitle}>
                Execute trusted workflows across the BlackRoad stack. Resilient, auditable, and ready
                for critical operations.
              </p>
              <div className={styles.heroGrid}>
                <div className={styles.heroCard}>
                  <div className={styles.cardLabel}>Stack Health</div>
                  <div className={styles.cardValue}>All systems stable</div>
                  <p className={styles.cardMeta}>Live telemetry with redundancy</p>
                </div>
                <div className={styles.heroCard}>
                  <div className={styles.cardLabel}>Access Tier</div>
                  <div className={styles.cardValue}>Ops / Privileged</div>
                  <p className={styles.cardMeta}>Key-based escalation required</p>
                </div>
                <div className={styles.heroCard}>
                  <div className={styles.cardLabel}>Regions</div>
                  <div className={styles.cardValue}>6 active zones</div>
                  <p className={styles.cardMeta}>Autoscaling with ledger sync</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
