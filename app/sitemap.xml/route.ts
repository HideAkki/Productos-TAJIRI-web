import { siteUrl } from '@/lib/site';
const pages = ['/', '/blog', '/conocenos/galeria', '/conocenos/nuestra-historia', '/contacto', '/productos', '/privacidad', '/cookies'];
export function GET() {
  if (!siteUrl) return new Response('Sitemap no disponible', { status: 503 });
  const urls = pages.map(path => `<url><loc>${siteUrl}${path}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' },
  });
}
