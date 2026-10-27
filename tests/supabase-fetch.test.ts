import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createGalleryFetch } from '../lib/supabase-fetch.ts';
const endpoint = 'https://example.supabase.co/rest/v1/gallery';

test('recupera una lectura tras un fallo de red y evita cachear la consulta', async () => {
  let calls = 0;
  const request = createGalleryFetch(async (_url, init) => {
    calls++;
    assert.equal(init?.cache, 'no-store'); assert.ok(init?.signal);
    if (calls === 1) throw Object.assign(new TypeError('fetch failed'), { cause: { code: 'EAI_AGAIN' } });
    return Response.json([{ id: 1 }]);
  });
  assert.deepEqual(await (await request(endpoint)).json(), [{ id: 1 }]);
  assert.equal(calls, 2);
});
test('reintenta errores transitorios del servicio una sola vez', async () => {
  let calls = 0;
  const request = createGalleryFetch(async () => { calls++; return new Response('', { status: calls === 1 ? 503 : 200 }); });
  assert.equal((await request(endpoint)).status, 200); assert.equal(calls, 2);
});
test('no reintenta errores de credenciales ni de permisos', async () => {
  for (const status of [401, 403]) {
    let calls = 0;
    const request = createGalleryFetch(async () => { calls++; return new Response('', { status }); });
    assert.equal((await request(endpoint)).status, status); assert.equal(calls, 1);
  }
});
test('no repite escrituras ni peticiones canceladas', async () => {
  let calls = 0;
  const request = createGalleryFetch(async () => { calls++; throw new TypeError('fallo simulado'); });
  await assert.rejects(request(endpoint, { method: 'POST' })); assert.equal(calls, 1);
  const controller = new AbortController(); controller.abort();
  calls = 0;
  await assert.rejects(request(endpoint, { signal: controller.signal })); assert.equal(calls, 1);
});
test('termina después de dos intentos si la red sigue fallando', async () => {
  let calls = 0;
  const request = createGalleryFetch(async () => { calls++; throw new TypeError('fallo simulado'); });
  await assert.rejects(request(endpoint)); assert.equal(calls, 2);
});
