import type {MetadataRoute} from 'next';

import {getComponentsSlugs} from '~/lib/data/component-slugs';
import {absoluteUrl} from '~/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const componentsSlugs = await getComponentsSlugs();

  const components = componentsSlugs.map((slug) => ({
    url: absoluteUrl(`/components/${slug}`),
    lastModified: new Date().toISOString(),
  }));

  const routes = ['', '/components'].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...components];
}
