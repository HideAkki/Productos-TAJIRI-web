import { NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const pages = [
  '/',
  '/blog',
  '/conocenos/galeria',
  '/conocenos/nuestra-historia',
  '/contacto',
  '/productos',
  '/privacidad',
  '/cookies',
];

export async function GET() {
  const now = new Date().toISOString();

  const urls = pages
    .map((path) => {
      return `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
