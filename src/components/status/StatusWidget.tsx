'use client';

import { useMemo } from 'react';
import { useStatusData } from './useStatusData';
import styles from './StatusWidget.module.css';

interface StatusWidgetProps {
  showServices?: boolean;
}

export function StatusWidget({ showServices = false }: StatusWidgetProps) {
  const { data, loading, error } = useStatusData();

  const allUp = useMemo(() => {
    if (!data) return false;
    return data.ok && data.services.every((service) => service.status === 'UP');
  }, [data]);

  const headline = useMemo(() => {
    if (loading) return 'Checking live system status...';
    if (error) return 'Unable to fetch status right now.';
    return allUp ? 'All systems nominal' : 'Some services down';
  }, [allUp, error, loading]);

  const lastChecked = useMemo(() => {
    const timestamp = data?.checkedAt ?? data?.services?.[0]?.lastChecked;
    return timestamp ? new Date(timestamp).toLocaleString() : null;
  }, [data]);

  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <span
          className={`${styles.pill} ${loading ? styles.loading : allUp ? styles.online : styles.offline}`}
        >
          {loading ? 'LOADING' : allUp ? 'UP' : 'ISSUES'}
        </span>
        {lastChecked ? <span className={styles.meta}>Last checked {lastChecked}</span> : null}
      </div>
      <p className={styles.headline}>{headline}</p>
      {error ? <p className={styles.error}>{error}</p> : null}

      {showServices ? (
        <div className={styles.serviceGrid}>
          {loading ? (
            <p className="muted">Gathering live status...</p>
          ) : data && data.services.length > 0 ? (
            data.services.map((service) => (
              <div key={service.name} className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <span className={styles.serviceName}>{service.name}</span>
                  <span
                    className={`${styles.servicePill} ${
                      service.status === 'UP' ? styles.online : styles.offline
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
                {service.lastChecked ? (
                  <p className={styles.serviceMeta}>
                    Last checked {new Date(service.lastChecked).toLocaleString()}
                  </p>
                ) : null}
                {service.message ? <p className={styles.serviceMessage}>{service.message}</p> : null}
              </div>
            ))
          ) : (
            <p className="muted">No services reported yet.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
