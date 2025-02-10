import type {NextConfig} from 'next';

import createMDX from '@next/mdx';
import ariaLocalesPlugin from '@react-aria/optimize-locales-plugin';

import {rehypeComponent} from './src/lib/rehype-component';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
    appIsrStatus: false,
  },
  pageExtensions: ['mdx', 'tsx'],
  experimental: {
    optimizePackageImports: ['react-aria-components'],
  },
  webpack(config, {isServer}) {
    if (!isServer) {
      config.plugins.push(ariaLocalesPlugin.webpack({locales: []}));
    }
    return config;
  },
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [rehypeComponent],
  },
});

export default withMDX(nextConfig);
