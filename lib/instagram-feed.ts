export const INSTAGRAM_PROFILE = 'https://www.instagram.com/productos___tajiri_/';
export const INSTAGRAM_HANDLE = '@productos___tajiri_';
export type SocialPost = {
  id: string; platform: 'Instagram'; author: string; text: string; date: string;
  publishedAt: string | null; link: string; image: string | null;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
};
export type InstagramConfig = {
  token: string; accountId: string; loginType: 'instagram' | 'facebook'; version: string;
};
export type InstagramErrorCode = 'configuration' | 'token' | 'permission' | 'rate_limit' | 'network' | 'upstream' | 'format';
export class InstagramFeedError extends Error {
  readonly code: InstagramErrorCode;
  readonly apiCode?: number;
  constructor(code: InstagramErrorCode, apiCode?: number) {
    super(`Instagram: ${code}`);
    this.code = code;
    this.apiCode = apiCode;
  }
}
function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}
function safeUrl(value: unknown, instagramOnly = false): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || (instagramOnly && url.hostname !== 'instagram.com' && !url.hostname.endsWith('.instagram.com'))) return null;
    return url.href;
  } catch { return null; }
}
export function normalizeInstagramPosts(data: unknown): SocialPost[] {
  if (!Array.isArray(data)) throw new InstagramFeedError('format');
  return data.map(record).filter(item => typeof item.id === 'string').slice(0, 24).map((item): SocialPost => {
    const children = record(item.children).data;
    const child = Array.isArray(children) ? record(children[0]) : {};
    const media = item.media_type === 'CAROUSEL_ALBUM' && Object.keys(child).length ? child : item;
    const rawDate = typeof item.timestamp === 'string' ? new Date(item.timestamp) : null;
    const date = rawDate && Number.isFinite(rawDate.getTime()) ? rawDate : null;
    const username = typeof item.username === 'string' && /^[a-zA-Z0-9_.]{1,30}$/.test(item.username) ? item.username : null;
    const mediaType = item.media_type === 'VIDEO' || item.media_type === 'CAROUSEL_ALBUM' ? item.media_type : 'IMAGE';
    return {
      id: `insta-${item.id}`, platform: 'Instagram', author: username ? `@${username}` : INSTAGRAM_HANDLE,
      text: typeof item.caption === 'string' && item.caption.trim() ? item.caption.trim().slice(0, 2200) : 'Un momento de Productos TAJIRI.',
      date: date ? new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', year: 'numeric' }).format(date) : 'Recientemente',
      publishedAt: date?.toISOString() ?? null,
      link: safeUrl(item.permalink, true) || INSTAGRAM_PROFILE,
      image: safeUrl(media.media_type === 'VIDEO' ? media.thumbnail_url : media.media_url),
      mediaType,
    };
  }).sort((a, b) => (b.publishedAt ? Date.parse(b.publishedAt) : 0) - (a.publishedAt ? Date.parse(a.publishedAt) : 0));
}
export async function fetchInstagramPosts(config: InstagramConfig, request: typeof fetch = fetch): Promise<SocialPost[]> {
  if (!config.token || !/^(?:me|\d+)$/.test(config.accountId) || !/^v\d+\.\d+$/.test(config.version) || (config.loginType === 'facebook' && config.accountId === 'me')) {
    throw new InstagramFeedError('configuration');
  }
  const host = config.loginType === 'facebook' ? 'graph.facebook.com' : 'graph.instagram.com';
  const url = new URL(`https://${host}/${config.version}/${config.accountId}/media`);
  url.searchParams.set('limit', '24');
  url.searchParams.set('fields', 'id,caption,username,permalink,media_type,media_url,thumbnail_url,timestamp,children{media_type,media_url,thumbnail_url}');
  let response: Response;
  try {
    response = await request(url, { headers: { Authorization: `Bearer ${config.token}` }, signal: AbortSignal.timeout(10000), cache: 'no-store' });
  } catch { throw new InstagramFeedError('network'); }
  let body: Record<string, unknown>;
  try { body = record(await response.json()); } catch { throw new InstagramFeedError('format'); }
  const error = record(body.error);
  if (!response.ok || body.error) {
    const code = typeof error.code === 'number' ? error.code : undefined;
    if (code === 190 || response.status === 401) throw new InstagramFeedError('token', code);
    if (code === 10 || code === 200 || response.status === 403) throw new InstagramFeedError('permission', code);
    if (response.status === 429 || (code && [4, 17, 32, 613].includes(code))) throw new InstagramFeedError('rate_limit', code);
    throw new InstagramFeedError('upstream', code);
  }
  return normalizeInstagramPosts(body.data);
}
