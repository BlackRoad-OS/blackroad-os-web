import { appConfig } from '@/config';
import { InfoCard } from '@/components/primitives/InfoCard';
import styles from './page.module.css';

export default function HomePage() {
  const consoleUrl = appConfig.nextPublicConsoleUrl || appConfig.publicConsoleUrl || '/console';
  const docsUrl = appConfig.nextPublicDocsUrl || appConfig.publicDocsUrl || '/docs';
  const osVersion = 'v0.1.0';
  const osServices = ['Core API', 'Console', 'Web', 'Agents'];

  return (
    <div className={styles.page}>
      <section className="panel">
        <p className="muted">Environment ready</p>
        <h1>BlackRoad OS web</h1>
        <p className="muted">
          Browser-native interface for BlackRoad OS. Connected via Railway to the core backend and
          fronted by Cloudflare at <span className="accent">blackroad.systems</span>.
        </p>
        <div className={styles.badges}>
          <span className={styles.badge}>Node env: {appConfig.nodeEnv}</span>
          <span className={styles.badge}>Core API: {appConfig.publicCoreApiUrl}</span>
          <span className={styles.badge}>OS version: {osVersion}</span>
        </div>

        <div className={styles.ctaRow}>
          <a className={styles.ctaButton} href={consoleUrl} target="_blank" rel="noreferrer">
            Open console
          </a>
          <a className={styles.ctaButtonSecondary} href={docsUrl} target="_blank" rel="noreferrer">
            View docs
          </a>
        </div>
      </section>

      <div className="grid">
        <InfoCard
          title="Backend integration"
          description="Centralized fetch helper for the core API with graceful error handling."
        >
          <ul className={styles.list}>
            <li>Base URL from <code>NEXT_PUBLIC_CORE_API_URL</code>.</li>
            <li>Reusable <code>coreRequest</code> helper for GET/POST/etc.</li>
            <li>Console-friendly logging when <code>NODE_ENV=development</code>.</li>
          </ul>
        </InfoCard>

        <InfoCard
          title="Deployment ready"
          description="Railway + GitHub Actions deploy the web-app service into dev/staging/prod."
        >
          <ul className={styles.list}>
            <li>Health endpoint at <code>/health</code> for post-deploy checks.</li>
            <li>Environment variables validated at startup.</li>
            <li>Cloudflare-friendly URLs baked into config.</li>
          </ul>
        </InfoCard>

        <InfoCard
          title="DX + structure"
          description="Clean app router layout, shared components, and primitives for future pages."
        >
          <ul className={styles.list}>
            <li>Layout with persistent header/footer.</li>
            <li>App-wide styling in <code>app/globals.css</code>.</li>
            <li>Route stubs for console and settings to expand later.</li>
          </ul>
        </InfoCard>
      </div>

      <section className="panel">
        <h3>OS branding hooks</h3>
        <p className="muted">
          Static placeholders ready to be wired into OS_SPEC metadata for badges and service discovery.
        </p>
        <div className={styles.badges}>
          <span className={styles.badge}>Web URL: {appConfig.publicWebUrl || 'pending'}</span>
          <span className={styles.badge}>Console URL: {appConfig.publicConsoleUrl || 'pending'}</span>
          <span className={styles.badge}>Docs URL: {appConfig.publicDocsUrl || 'pending'}</span>
        </div>

        <div className={styles.serviceGrid}>
          {osServices.map((service) => (
            <div key={service} className={styles.serviceCard}>
              <div className={styles.serviceTitle}>{service}</div>
              <p className="muted">Placeholder entry pulled from OS_SPEC (future hook).</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
