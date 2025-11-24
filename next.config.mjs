import path from 'node:path';
import { withContentlayer } from 'next-contentlayer';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.alias['contentlayer/generated'] = path.join(process.cwd(), '.contentlayer/generated');
    return config;
  },
};

export default withContentlayer(nextConfig);
