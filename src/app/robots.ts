import {absoluteUrl} from '~/lib/utils';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: absoluteUrl(`/sitemap.xml`),
    host: absoluteUrl(),
  };
}
