export function clamp(number_: number, start: number, end: number) {
  return Math.min(Math.max(number_, start), end);
}

export function absoluteUrl(path?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

  if (!path) {
    return baseUrl;
  }

  const absoluteUrl = new URL(path, baseUrl);
  return absoluteUrl.toString();
}
