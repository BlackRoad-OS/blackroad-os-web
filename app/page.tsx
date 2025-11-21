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
import { StatusWidget } from '@/components/status/StatusWidget';

const consoleUrl = process.env.NEXT_PUBLIC_CONSOLE_URL || 'https://console.blackroad.systems';
const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.blackroad.systems';

const pillars = [
  {
    title: 'Orchestration',
    description: 'Coordinated workflows for agents, services, and ledger-aware actions.'
  },
  {
    title: 'Observability',
    description: 'Built-in telemetry, health, and audit layers to keep operators in control.'
  },
  {
    title: 'Compliance',
    description: 'Policy-driven safeguards that keep the platform aligned with governance.'
  }
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={`panel ${styles.hero}`}>
        <p className="muted">BlackRoad Operating System</p>
        <h1>BlackRoad OS</h1>
        <p className={styles.subtitle}>
          The operations layer for secure, ledger-native automation. Build, observe, and control the
          BlackRoad stack from a single, trusted interface.
        </p>
        <div className={styles.ctaRow}>
          <a className={styles.ctaButton} href={consoleUrl} target="_blank" rel="noreferrer">
            View Console
          </a>
          <a className={styles.ctaButtonSecondary} href={docsUrl} target="_blank" rel="noreferrer">
            Read Docs
          </a>
        </div>
      </section>

      <section className={`panel ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div>
            <p className="muted">Platform overview</p>
            <h2>What is BlackRoad OS?</h2>
            <p className={styles.subtitle}>
              A cohesive runtime that spans the core ledger, operator services, web interfaces, and
              console workflows.
            </p>
          </div>
        </div>
        <div className={styles.cardGrid}>
          {pillars.map((pillar) => (
            <div key={pillar.title} className={styles.card}>
              <h3>{pillar.title}</h3>
              <p className="muted">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

        <InfoCard
          title="System Status"
          description="Public summary of core BlackRoad OS surfaces."
        >
          <SystemStatus />
        </InfoCard>
      </div>
      <section className={`panel ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div>
            <p className="muted">Live telemetry</p>
            <h2>System Snapshot</h2>
            <p className={styles.subtitle}>
              Quick glance at the public-facing services powering BlackRoad OS.
            </p>
          </div>
        </div>
        <StatusWidget />
      </section>
    </div>
  );
}
