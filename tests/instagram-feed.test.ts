import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchInstagramPosts, normalizeInstagramPosts, InstagramFeedError, INSTAGRAM_PROFILE } from '../lib/instagram-feed.ts';

const config = { token: 'fake-test-token', accountId: 'me', loginType: 'instagram' as const, version: 'v25.0' };
test('normaliza fotos, vídeos y carruseles, usa portada del vídeo y ordena por fecha', () => {
  const posts = normalizeInstagramPosts([
    { id: '1', media_type: 'IMAGE', caption: 'Foto', media_url: 'https://cdn.example/photo.jpg', permalink: 'https://www.instagram.com/p/uno/', timestamp: '2026-10-20T00:00:00Z', username: 'productos___tajiri_' },
    { id: '2', media_type: 'VIDEO', media_url: 'https://cdn.example/video.mp4', thumbnail_url: 'https://cdn.example/cover.jpg', timestamp: '2026-10-22T00:00:00Z' },
    { id: '3', media_type: 'CAROUSEL_ALBUM', children: { data: [{ media_type: 'VIDEO', media_url: 'https://cdn.example/carousel.mp4', thumbnail_url: 'https://cdn.example/carousel.jpg' }] }, timestamp: '2026-10-21T00:00:00Z' },
  ]);
  assert.deepEqual(posts.map(post => post.id), ['insta-2', 'insta-3', 'insta-1']);
  assert.equal(posts[0].image, 'https://cdn.example/cover.jpg');
  assert.equal(posts[1].image, 'https://cdn.example/carousel.jpg');
  assert.equal(posts[2].author, '@productos___tajiri_');
  assert.equal(posts[2].link, 'https://www.instagram.com/p/uno/');
});
test('descarta URLs inseguras, evita fechas inválidas y limita el tamaño del feed', () => {
  const post = normalizeInstagramPosts([{ id: '1', media_url: 'javascript:alert(1)', permalink: 'https://instagram.com.evil.example/a', timestamp: 'incorrecto' }])[0];
  assert.equal(post.image, null); assert.equal(post.link, INSTAGRAM_PROFILE); assert.equal(post.publishedAt, null);
  assert.equal(normalizeInstagramPosts(Array.from({ length: 40 }, (_, index) => ({ id: String(index) }))).length, 24);
  assert.throws(() => normalizeInstagramPosts({ data: [] }), InstagramFeedError);
});
test('consulta Instagram Login con Bearer token sin poner credenciales en la URL', async () => {
  let calls = 0;
  await fetchInstagramPosts(config, async (input, init) => {
    calls++; const url = new URL(String(input));
    assert.equal(url.hostname, 'graph.instagram.com'); assert.equal(url.pathname, '/v25.0/me/media');
    assert.equal(url.searchParams.get('limit'), '24'); assert.ok(!url.href.includes(config.token));
    assert.equal(new Headers(init?.headers).get('Authorization'), `Bearer ${config.token}`);
    return Response.json({ data: [] });
  });
  assert.equal(calls, 1);
});
test('mantiene la compatibilidad con Facebook Login usando el ID de Instagram', async () => {
  await fetchInstagramPosts({ ...config, accountId: '123456', loginType: 'facebook' }, async input => {
    assert.equal(new URL(String(input)).host, 'graph.facebook.com');
    assert.equal(new URL(String(input)).pathname, '/v25.0/123456/media');
    return Response.json({ data: [] });
  });
  await assert.rejects(fetchInstagramPosts({ ...config, loginType: 'facebook' }), (error: unknown) => error instanceof InstagramFeedError && error.code === 'configuration');
});
test('clasifica errores sin revelar mensajes del proveedor ni tokens', async () => {
  for (const [status, code, reason] of [[400, 190, 'token'], [403, 10, 'permission'], [429, 4, 'rate_limit'], [400, 100, 'upstream']] as const) {
    await assert.rejects(fetchInstagramPosts(config, async () => Response.json({ error: { code, message: 'SECRET details' } }, { status })),
      (error: unknown) => error instanceof InstagramFeedError && error.code === reason && !error.message.includes('SECRET'));
  }
  await assert.rejects(fetchInstagramPosts(config, async () => { throw new Error('secret network failure'); }), (error: unknown) => error instanceof InstagramFeedError && error.code === 'network');
});
