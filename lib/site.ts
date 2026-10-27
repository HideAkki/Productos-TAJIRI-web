import type { Metadata } from 'next';

function configuredSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url.origin;
  } catch { return null; }
}
export const siteUrl = configuredSiteUrl();
export const socialImage = { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Productos TAJIRI' };
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: { absolute: `${title} | Productos TAJIRI` }, description,
    alternates: siteUrl ? { canonical: `${siteUrl}${path}` } : undefined,
    openGraph: {
      title, description, url: siteUrl ? `${siteUrl}${path}` : undefined,
      siteName: 'Productos TAJIRI', type: 'website', images: [socialImage],
    },
  };
}
