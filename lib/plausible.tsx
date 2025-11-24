'use client';

import PlausibleProviderBase from 'next-plausible';

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || process.env.PLAUSIBLE_DOMAIN || 'example.com';

export function PlausibleProvider({ children }: { children: React.ReactNode }) {
  return (
    <PlausibleProviderBase domain={plausibleDomain} trackLocalhost={false} enabled={!!plausibleDomain}>
      {children}
    </PlausibleProviderBase>
  );
}
