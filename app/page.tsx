'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.css';
import { InfoCard } from '@/components/primitives/InfoCard';
import { serviceConfig } from '@/config/serviceConfig';
import { osServices } from '@/config/services';

const fallbackConsoleUrl = process.env.NEXT_PUBLIC_CONSOLE_URL || 'https://console.blackroad.systems';
const fallbackDocsUrl = process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.blackroad.systems';
const fallbackCoreApiUrl = process.env.NEXT_PUBLIC_CORE_API_URL || 'https://core.blackroad.systems';
const publicApiUrl = process.env.NEXT_PUBLIC_PUBLIC_API_URL || 'https://api.blackroad.systems';
type ServiceStatus = 'loading' | 'up' | 'down';

type ServiceStatusMap = Record<string, { status: ServiceStatus; lastCheckedAt?: string }>;

const defaultStatuses: ServiceStatusMap = osServices.reduce(
  (acc, service) => ({
    ...acc,
    [service.id]: { status: 'loading' }
  }),
  {} as ServiceStatusMap
);

function SystemStatus() {
  const [serviceStatuses, setServiceStatuses] = useState<ServiceStatusMap>(defaultStatuses);

  useEffect(() => {
    let isMounted = true;

    async function loadStatus() {
      try {
        const response = await fetch('/api/status');
        if (!response.ok) throw new Error('Unable to fetch system status');

        const data = await response.json();
        if (!isMounted) return;

        const nextStatuses = data.services.reduce((acc: ServiceStatusMap, service: any) => {
          acc[service.id] = {
            status: service.status === 'up' ? 'up' : 'down',
            lastCheckedAt: service.lastCheckedAt
          };
          return acc;
        }, {} as ServiceStatusMap);

        setServiceStatuses(nextStatuses);
      } catch (error) {
        if (!isMounted) return;
        setServiceStatuses(
          osServices.reduce((acc, service) => {
            acc[service.id] = {
              status: 'down',
              lastCheckedAt: new Date().toISOString()
            };
            return acc;
          }, {} as ServiceStatusMap)
        );
      }
    }

    loadStatus();
    const interval = setInterval(loadStatus, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const statusLabel = useMemo(() => {
    return (status: ServiceStatus) => {
      if (status === 'loading') return 'Checking...';
      return status === 'up' ? 'UP' : 'DOWN';
    };
  }, []);

  return (
    <div className={styles.statusWidget}>
      <ul className={styles.serviceStatusList}>
        {osServices.map((service) => {
          const entry = serviceStatuses[service.id];
          const visualStatus = entry?.status ?? 'loading';
          const pillClass = visualStatus === 'up' ? 'online' : visualStatus === 'down' ? 'offline' : 'loading';

          return (
            <li key={service.id} className={styles.serviceRow}>
              <div className={styles.serviceCopy}>
                <strong>{service.name}</strong>
                <span className={styles.statusMeta}>{entry?.lastCheckedAt ? `Checked ${new Date(entry.lastCheckedAt).toLocaleString()}` : 'Waiting for status'}</span>
              </div>
              <span className={`${styles.statusPill} ${styles[pillClass]}`}>{statusLabel(visualStatus)}</span>
            </li>
          );
        })}
      </ul>
      <p className={styles.statusMessage}>Public snapshot refreshed automatically every 30 seconds.</p>
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
          title="System Status"
          description="Public summary of core BlackRoad OS surfaces."
        >
          <SystemStatus />
        </InfoCard>
      </div>
    </div>
  );
}
