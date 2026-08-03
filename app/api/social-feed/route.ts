import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const instagramToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const instagramUserId = process.env.INSTAGRAM_USER_ID;

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
};

const extractImageFromHtml = (html: string) => {
  const match = /<img[^>]+src="([^">]+)"/i.exec(html || '');
  return match ? match[1] : null;
};

const fetchInstagramFeed = async () => {
  if (!instagramToken) {
    throw new Error('Falta INSTAGRAM_ACCESS_TOKEN');
  }

  const urls = [
    `https://graph.instagram.com/me/media?fields=id,caption,permalink,media_type,media_url,thumbnail_url,timestamp,children{media_type,media_url,thumbnail_url}&access_token=${instagramToken}`,
    instagramUserId
      ? `https://graph.facebook.com/v17.0/${instagramUserId}/media?fields=id,caption,permalink,media_type,media_url,thumbnail_url,timestamp,children{media_type,media_url,thumbnail_url}&access_token=${instagramToken}`
      : null,
  ].filter(Boolean) as string[];

  // Try to resolve the Instagram account username so the author field stays in sync
  let username: string | null = null;
  try {
    const userUrls = [
      `https://graph.instagram.com/me?fields=username&access_token=${instagramToken}`,
      instagramUserId ? `https://graph.facebook.com/v17.0/${instagramUserId}?fields=username&access_token=${instagramToken}` : null,
    ].filter(Boolean) as string[];

    for (const u of userUrls) {
      try {
        const r = await fetch(u, { cache: 'no-store' });
        if (!r.ok) continue;
        const ud = await r.json();
        if (ud?.username) {
          username = ud.username;
          break;
        }
      } catch (e) {
        // ignore and try next
      }
    }
  } catch (e) {
    // ignore username resolution errors
  }

  let lastError = 'Instagram fetch failed';

  for (const startUrl of urls) {
    let url: string | null = startUrl;
    const allItems: any[] = [];

    while (url) {
      const response: any = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
        lastError = await response.text();
        break;
      }

      const data: any = await response.json();
      if (data?.data) allItems.push(...data.data);

      const nextUrl: string | undefined = data?.paging?.next;
      if (!nextUrl || allItems.length >= 100) break;
      url = nextUrl;
    }

    if (allItems.length === 0) continue;

    // sort by timestamp/created_time desc
    allItems.sort((a: any, b: any) => {
      const ta = new Date(a.timestamp || a.created_time || 0).getTime();
      const tb = new Date(b.timestamp || b.created_time || 0).getTime();
      return tb - ta;
    });

    return allItems.map((item: any) => {
      let imageUrl = '';

      if (item.media_type === 'VIDEO') {
        imageUrl = item.thumbnail_url || item.media_url || '';
      } else if (item.media_type === 'CAROUSEL_ALBUM') {
        const child = item.children?.data?.[0];
        imageUrl = (child?.thumbnail_url || child?.media_url) || item.thumbnail_url || item.media_url || '';
      } else {
        imageUrl = item.media_url || item.thumbnail_url || '';
      }

      const published = item.timestamp || item.created_time || null;

      return {
        id: `insta-${item.id}`,
        platform: 'Instagram',
        author: username ? `@${username}` : '@tajiri.oficial',
        text: item.caption || 'Nueva publicación en Instagram de Tajiri.',
        date: published ? formatDate(published) : 'Recientemente',
        link: item.permalink || 'https://instagram.com/tajiri.oficial',
        image: imageUrl || null,
      };
    });
  }

  throw new Error(`Instagram fetch failed: ${lastError}`);
};

export async function GET() {
  try {
    const posts = await fetchInstagramFeed();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Instagram feed load failed:', error);
    return NextResponse.json({ posts: [], error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
