import { createHash } from 'node:crypto';
import { unstable_cache } from 'next/cache';
import { fetchInstagramPosts, InstagramFeedError, type InstagramConfig } from '@/lib/instagram-feed';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
let failure: { key: string; until: number; configurationRequired: boolean } | null = null;

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  if (!token) return unavailable(true);
  const loginType = process.env.INSTAGRAM_LOGIN_TYPE?.trim() || 'instagram';
  if (loginType !== 'instagram' && loginType !== 'facebook') return unavailable(true);
  const config: InstagramConfig = {
    token, loginType, accountId: process.env.INSTAGRAM_USER_ID?.trim() || 'me',
    version: process.env.INSTAGRAM_API_VERSION?.trim() || 'v25.0',
  };
  // Se incluye una huella para renovar la caché al cambiar las credenciales.
  // El token no se pasa como argumento ni se guarda en la respuesta cacheada.
  const key = createHash('sha256').update(JSON.stringify(config)).digest('hex');
  if (failure?.key === key && Date.now() < failure.until) return unavailable(failure.configurationRequired);
  try {
    const loadFeed = unstable_cache(() => fetchInstagramPosts(config), ['instagram-feed-v3', key], { revalidate: 600 });
    const posts = await loadFeed();
    failure = null;
    return Response.json({ posts }, { headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=60' } });
  } catch (error) {
    const configurationRequired = error instanceof InstagramFeedError && ['configuration', 'token', 'permission'].includes(error.code);
    failure = { key, until: Date.now() + 60000, configurationRequired };
    console.error('Instagram no disponible:', error instanceof InstagramFeedError ? { reason: error.code, code: error.apiCode } : { reason: 'unknown' });
    return unavailable(configurationRequired);
  }
}
function unavailable(configurationRequired: boolean) {
  return Response.json({ posts: [], error: 'Las publicaciones no están disponibles en este momento.',
    ...(process.env.NODE_ENV === 'development' ? { configurationRequired } : {}),
  }, { status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '60' } });
}
