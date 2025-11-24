import type { Metadata } from 'next';

const baseUrl = process.env.SITE_URL || 'https://blackroad.os';

export const siteMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'BlackRoad OS',
    template: '%s · BlackRoad OS',
  },
  description: 'Public web portal for the BlackRoad OS ecosystem.',
  openGraph: {
    type: 'website',
    url: baseUrl,
    title: 'BlackRoad OS',
    description: 'Documentation and health surface for BlackRoad OS.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlackRoad OS',
    description: 'Static-first docs and health portal.',
  },
};
