import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../app/api/contact/route.ts';
const originalFetch = globalThis.fetch;
const savedEnv = { ...process.env };
afterEach(() => { globalThis.fetch = originalFetch; process.env = { ...savedEnv }; });
const payload = { name: 'Ana', email: 'ana@example.com', message: 'Consulta de producto', website: '', requestId: '12345678-1234-1234-1234-123456789012' };
function request(data: unknown = payload, headers: Record<string, string> = {}) {
  return new Request('https://tajiri.example/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data) });
}
function configure() { process.env.NEXT_PUBLIC_SITE_URL = 'https://tajiri.example'; process.env.RESEND_API_KEY = 'test-secret'; process.env.CONTACT_FROM_EMAIL = 'web@tajiri.example'; }
test('rechaza JSON inválido, campos inválidos, origen ajeno y cuerpo grande', async () => {
  configure();
  assert.equal((await POST(new Request('https://tajiri.example/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' }))).status, 400);
  for (const data of [null, [], { ...payload, email: 'incorrecto' }, { ...payload, name: '  ' }, { ...payload, message: 'x'.repeat(4001) }, { ...payload, website: 'spam' }]) {
    assert.equal((await POST(request(data))).status, 400);
  }
  assert.equal((await POST(request(payload, { Origin: 'https://otro.example' }))).status, 403);
  assert.equal((await POST(request({ ...payload, message: 'x'.repeat(17000) }))).status, 413);
});
test('sin credenciales responde 503 sin llamar a un proveedor', async () => {
  process.env.NEXT_PUBLIC_SITE_URL = ''; delete process.env.RESEND_API_KEY; delete process.env.CONTACT_FROM_EMAIL;
  globalThis.fetch = async () => { throw new Error('No debe llamar al proveedor'); };
  assert.equal((await POST(request())).status, 503);
});
test('envía texto y reply-to al destinatario configurado con idempotencia', async () => {
  configure(); process.env.CONTACT_TO_EMAIL = 'destino@tajiri.example';
  globalThis.fetch = async (url, init) => {
    assert.equal(String(url), 'https://api.resend.com/emails');
    const body = JSON.parse(String(init?.body));
    assert.equal(body.reply_to, payload.email); assert.deepEqual(body.to, ['destino@tajiri.example']);
    assert.equal(body.html, undefined); assert.match(body.text, /Consulta de producto/);
    assert.equal(new Headers(init?.headers).get('Idempotency-Key'), `contact-${payload.requestId}`);
    return Response.json({ id: 'fake-delivery' });
  };
  assert.equal((await POST(request())).status, 200);
});
test('un fallo externo nunca se presenta como éxito ni filtra el error', async () => {
  configure();
  globalThis.fetch = async () => new Response('secreto del proveedor', { status: 401 });
  const result = await POST(request({ ...payload, email: 'fallo@example.com' }));
  assert.equal(result.status, 502); assert.doesNotMatch(await result.text(), /secreto|test-secret/);
});
test('limita intentos repetidos sin volver a contactar al proveedor', async () => {
  configure(); let calls = 0;
  globalThis.fetch = async () => { calls++; return Response.json({ id: 'fake-delivery' }); };
  for (let i = 0; i < 3; i++) assert.equal((await POST(request({ ...payload, email: 'limite@example.com' }))).status, 200);
  const result = await POST(request({ ...payload, email: 'limite@example.com' }));
  assert.equal(result.status, 429); assert.equal(calls, 3); assert.equal(result.headers.get('Retry-After'), '600');
});
