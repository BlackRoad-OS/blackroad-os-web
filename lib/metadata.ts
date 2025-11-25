import type { Metadata } from 'next';

const baseUrl = process.env.SITE_URL || 'https://blackroad.io';

export const siteMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'BlackRoad',
    template: '%s · BlackRoad',
  },
  description: 'Composable agent orchestration platform for autonomous operations with observability-ready primitives.',
  openGraph: {
    type: 'website',
    url: baseUrl,
    title: 'BlackRoad',
    description: 'Composable agent orchestration platform for autonomous operations.',
    siteName: 'BlackRoad',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlackRoad',
    description: 'Composable agent orchestration with observability-ready primitives.',
  },
};
