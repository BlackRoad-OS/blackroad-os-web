'use client';

import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';

interface ServiceStatus {
  name: string;
  status: 'ok' | 'unknown' | 'error';
  lastChecked?: string;
  details?: Record<string, unknown>;
}

export default function StatusPage() {
  const [webStatus, setWebStatus] = useState<ServiceStatus>({
    name: 'Web',
    status: 'unknown',
  });

  const [apiStatus] = useState<ServiceStatus>({
    name: 'API',
    status: 'unknown',
    details: { note: 'Mock/stub - not yet connected' },
  });

  const [operatorStatus] = useState<ServiceStatus>({
    name: 'Operator',
    status: 'unknown',
    details: { note: 'Mock/stub - not yet connected' },
  });

  useEffect(() => {
    // Fetch web health status
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setWebStatus({
          name: 'Web',
          status: data.ok || data.status === 'ok' ? 'ok' : 'error',
          lastChecked: new Date().toISOString(),
          details: data,
        });
      })
      .catch(() => {
        setWebStatus({
          name: 'Web',
          status: 'error',
          lastChecked: new Date().toISOString(),
        });
      });
  }, []);

  const services = [webStatus, apiStatus, operatorStatus];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Header */}
      <header className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-2 text-4xl font-bold">System Status</h1>
        <p className="text-slate-400">BlackRoad OS service health overview</p>
      </header>

      {/* Status Cards */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <StatusCard key={service.name} service={service} />
          ))}
        </div>
      </section>

      {/* Details Section */}
      {webStatus.status === 'ok' && webStatus.details && (
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="mb-4 text-2xl font-semibold">Web Service Details</h2>
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
            <pre className="overflow-x-auto text-sm text-slate-300">
              {JSON.stringify(webStatus.details, null, 2)}
            </pre>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

function StatusCard({ service }: { service: ServiceStatus }) {
  const statusColors = {
    ok: 'bg-green-500',
    unknown: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  const statusLabels = {
    ok: 'OK',
    unknown: 'Unknown',
    error: 'Error',
  };

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">{service.name}</h3>
        <div className={`h-3 w-3 rounded-full ${statusColors[service.status]}`} />
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Status:</span>
          <span className="font-medium">{statusLabels[service.status]}</span>
        </div>

        {service.lastChecked ? (
          <div className="flex justify-between">
            <span className="text-slate-400">Last checked:</span>
            <span className="font-mono text-xs">{new Date(service.lastChecked).toLocaleTimeString()}</span>
          </div>
        ) : null}

        {service.details?.note && typeof service.details.note === 'string' ? (
          <div className="mt-4 rounded bg-slate-800/50 p-2 text-xs text-slate-400">
            {service.details.note}
          </div>
        ) : null}
      </div>
    </div>
  );
}
