import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

function checkConfiguration(anonKey: string, serviceKey: string, expected: string | null, url = 'https://example.supabase.co') {
  const code = `
    import assert from 'node:assert/strict';
    import { createServerSupabaseClient } from './lib/supabase.ts';
    const expected = ${JSON.stringify(expected)};
    let usedKey = null;
    globalThis.fetch = async (_url, init) => {
      usedKey = new Headers(init.headers).get('apikey');
      return new Response('[]', { headers: { 'Content-Type': 'application/json' } });
    };
    const client = createServerSupabaseClient();
    if (expected === null) assert.equal(client, null);
    else {
      assert.ok(client);
      const { error } = await client.from('gallery').select('id').limit(1);
      assert.equal(error, null);
      assert.equal(usedKey, expected);
    }
  `;
  const result = spawnSync(process.execPath, ['--conditions=react-server', '--experimental-strip-types', '--input-type=module', '-e', code], {
    cwd: process.cwd(), encoding: 'utf8',
    env: { ...process.env, NEXT_PUBLIC_SUPABASE_URL: url, NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey, SUPABASE_SERVICE_ROLE_KEY: serviceKey },
  });
  assert.equal(result.status, 0, result.stderr);
}

test('conserva la prioridad de la clave de servidor de la configuración original', () => {
  checkConfiguration('test-anon-key', 'test-service-key', 'test-service-key');
});
test('sigue aceptando la clave pública cuando no existe clave de servidor', () => {
  checkConfiguration('test-anon-key', '', 'test-anon-key');
});
test('admite una configuración de servidor sin exigir una segunda clave pública', () => {
  checkConfiguration('', 'test-service-key', 'test-service-key');
});
test('informa de configuración ausente cuando falta la URL o cualquier clave', () => {
  checkConfiguration('', '', null);
  checkConfiguration('test-anon-key', 'test-service-key', null, '');
});
