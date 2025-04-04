import {env} from './env';

export function ensureStartsWith(stringToCheck: string, startsWith: string) {
  return stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;
}

export function absoluteUrl(path?: string) {
  const baseUrl =
    env.NODE_ENV === 'production'
      ? ensureStartsWith(env.NEXT_PUBLIC_APP_URL, 'https://')
      : ensureStartsWith(env.NEXT_PUBLIC_APP_URL, 'http://');

  if (!path) {
    return baseUrl;
  }

  const absoluteUrl = new URL(path, baseUrl);
  return absoluteUrl.toString();
}
