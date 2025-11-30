'use client';

import { useState } from 'react';
import { DEMO_STEPS } from '../lib/constants';
import CodeExample from './CodeExample';

export default function TourStep() {
  const [active, setActive] = useState(0);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/70">Guided walkthrough</p>
          <h2 className="text-2xl font-semibold">Tour the Core UI + Operator</h2>
        </div>
        <div className="flex gap-2">
          {DEMO_STEPS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-2 w-10 rounded-full ${
                index === active ? 'bg-brand-primary' : 'bg-white/20'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">Step {active + 1}</p>
          <h3 className="text-xl font-semibold">{DEMO_STEPS[active]}</h3>
          <p className="text-white/80">
            {active === 0 && 'Mock a Core login flow to prime the session for downstream calls.'}
            {active === 1 && 'Register a sample agent in the registry to backfill the table below.'}
            {active === 2 && 'Trigger a job via the Operator to watch state transition events roll in.'}
            {active === 3 && 'Keep the Beacon stream open to see the SSE feed deliver confirmations.'}
          </p>
          <div className="rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-white/90">
            <p>Tips</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-white/70">
              <li>JWT optional — attach `Authorization` only when provided.</li>
              <li>Gateway uses REST for registry, GraphQL for job triggers.</li>
              <li>Beacon sends SSE frames; no websockets required.</li>
            </ul>
          </div>
        </div>
        <CodeExample step={active} />
      </div>
    </section>
  );
}
