import { NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export async function GET() {
  const lines = [
    'User-agent: *',
    'Disallow: /admin-oculto',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
  ];

  return new NextResponse(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
