'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.css';
import { InfoCard } from '@/components/primitives/InfoCard';
import { serviceConfig } from '@/config/serviceConfig';

type HealthStatus = 'loading' | 'online' | 'offline';

interface HealthState {
  status: HealthStatus;
  checkedAt?: string;
  message?: string;
}

const defaultHealth: HealthState = {
  status: 'loading'
};

const fallbackConsoleUrl = process.env.NEXT_PUBLIC_CONSOLE_URL || 'https://console.blackroad.systems';
const fallbackDocsUrl = process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.blackroad.systems';
const fallbackCoreApiUrl = process.env.NEXT_PUBLIC_CORE_API_URL || 'https://core.blackroad.systems';
const publicApiUrl = process.env.NEXT_PUBLIC_PUBLIC_API_URL || 'https://api.blackroad.systems';

function HealthWidget() {
  const [health, setHealth] = useState<HealthState>(defaultHealth);

  useEffect(() => {
    let isMounted = true;

    async function checkHealth() {
      setHealth({ status: 'loading' });

      try {
        const response = await fetch('/api/health');
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (!isMounted) return;

        setHealth({
          status: data.ok ? 'online' : 'offline',
          checkedAt: data.ts ? new Date(data.ts).toLocaleString() : new Date().toLocaleString(),
          message: data.ok ? undefined : 'Service reported an issue.'
        });
      } catch (error) {
        if (!isMounted) return;
        setHealth({
          status: 'offline',
          checkedAt: new Date().toLocaleString(),
          message: error instanceof Error ? error.message : 'Unable to reach status endpoint.'
        });
      }
    }

    checkHealth();
    const interval = setInterval(checkHealth, 15000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const statusLabel = useMemo(() => {
    if (health.status === 'loading') return 'Checking...';
    return health.status === 'online' ? 'ONLINE' : 'OFFLINE';
  }, [health.status]);

  return (
    <div className={styles.statusWidget}>
      <div className={styles.statusRow}>
        <span className={`${styles.statusPill} ${styles[health.status]}`}>{statusLabel}</span>
        {health.checkedAt ? <span className={styles.statusMeta}>Last checked: {health.checkedAt}</span> : null}
      </div>
      {health.message ? <p className={styles.statusMessage}>{health.message}</p> : null}
    </div>
  );
}

export default function HomePage() {
  const systemLinks = [
    { label: 'Prism Console', href: fallbackConsoleUrl, description: 'Manage agents, deployments, and OS resources.' },
    { label: 'Docs', href: fallbackDocsUrl, description: 'Developer and operator guides for BlackRoad OS.' },
    { label: 'Core API', href: fallbackCoreApiUrl, description: 'Primary API surface for orchestrating the OS.' },
    { label: 'Public API', href: publicApiUrl, description: 'External integrations and public endpoints.' }
  ];

  return (
    <div className={styles.page}>
      <section className={`panel ${styles.hero}`}>
        <p className="muted">BlackRoad Operating System</p>
        <h1>BlackRoad OS</h1>
        <p className={styles.subtitle}>
          Distributed operating system for agents, finance, and quantum-native infrastructure.
        </p>
        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <span className="muted">Service ID</span>
            <strong>{serviceConfig.SERVICE_ID}</strong>
          </div>
          <div className={styles.metaItem}>
            <span className="muted">Service Name</span>
            <strong>{serviceConfig.SERVICE_NAME}</strong>
          </div>
          <div className={styles.metaItem}>
            <span className="muted">Base URL</span>
            <strong>{serviceConfig.SERVICE_BASE_URL}</strong>
          </div>
        </div>
        <div className={styles.ctaRow}>
          <a className={styles.ctaButton} href={fallbackConsoleUrl} target="_blank" rel="noreferrer">
            Open Prism Console
          </a>
          <a className={styles.ctaButtonSecondary} href={fallbackDocsUrl} target="_blank" rel="noreferrer">
            View Documentation
          </a>
        </div>
      </section>

      <div className="grid">
        <InfoCard title="System Links" description="Entrypoints into the BlackRoad ecosystem.">
          <ul className={styles.linkList}>
            {systemLinks.map((link) => (
              <li key={link.href} className={styles.linkRow}>
                <div>
                  <a className={styles.linkAnchor} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                  <p className="muted">{link.description}</p>
                </div>
                <span className={styles.externalHint}>↗</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard
          title="Service Metadata"
          description="Static configuration exported for consumers and diagnostics."
        >
          <div className={styles.metadataGrid}>
            <div className={styles.badge}>OS Root: {serviceConfig.OS_ROOT}</div>
            <div className={styles.badge}>Base URL: {serviceConfig.SERVICE_BASE_URL}</div>
            <div className={styles.badge}>Service: {serviceConfig.SERVICE_NAME}</div>
          </div>
        </InfoCard>

        <InfoCard
          title="Status"
          description="Live view powered by the /api/health endpoint."
        >
          <HealthWidget />
        </InfoCard>
      </div>
    </div>
  );
}
