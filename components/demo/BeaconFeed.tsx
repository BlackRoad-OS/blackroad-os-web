'use client';

import { useEffect, useMemo, useState } from 'react';
import { connectBeacon, type BeaconMessage } from '../lib/beacon';

const LEVEL_STYLES: Record<BeaconMessage['level'], string> = {
  info: 'bg-emerald-500/20 text-emerald-100',
  warn: 'bg-amber-500/20 text-amber-100',
  error: 'bg-red-500/20 text-red-100'
};

export default function BeaconFeed() {
  const [events, setEvents] = useState<BeaconMessage[]>([]);

  useEffect(() => {
    const source = connectBeacon((payload) => {
      setEvents((prev) => [payload, ...prev].slice(0, 20));
    });
    return () => source.close();
  }, []);

  const emptyState = useMemo(
    () => (
      <div className="rounded-xl border border-dashed border-white/20 p-4 text-sm text-white/70">
        Waiting for Beacon events… keep this tab open.
      </div>
    ),
    []
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/70">Live telemetry</p>
          <h2 className="text-2xl font-semibold">Beacon feed</h2>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs uppercase tracking-wide text-emerald-100">
          SSE
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {events.length === 0 && emptyState}
        {events.map((event) => (
          <article key={event.id} className="flex items-start gap-3 rounded-lg bg-black/30 p-3">
            <div className={`mt-1 h-2 w-2 rounded-full ${LEVEL_STYLES[event.level]}`} />
            <div className="flex-1 text-sm">
              <header className="flex flex-wrap items-center gap-2 text-white/80">
                <span className="text-xs uppercase tracking-wide text-white/60">{event.agent}</span>
                <span className="text-xs text-white/50">
                  {new Date(event.ts).toLocaleTimeString()}
                </span>
              </header>
              <p className="text-white/90">{event.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
