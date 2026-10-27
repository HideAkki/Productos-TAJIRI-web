import { createHash } from 'node:crypto';

export const runtime = 'nodejs';
const MAX_BODY = 16_384;
const WINDOW_MS = 10 * 60 * 1000;
// Protección local complementaria; configurar el límite distribuido en el hosting.
const attempts = new Map<string, { count: number; until: number }>();
let globalWindow = { count: 0, until: 0 };
const genericError = 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos directamente por correo.';
const reply = (body: object, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

async function readBody(request: Request) {
  if (Number(request.headers.get('content-length')) > MAX_BODY) throw new Error('size');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('json');
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY) { await reader.cancel(); throw new Error('size'); }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  let allowedOrigin: string;
  try {
    allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin
      : `${new URL(request.url).protocol}//${request.headers.get('host') || new URL(request.url).host}`;
  } catch { return reply({ error: genericError }, 503); }
  if (origin && origin !== allowedOrigin) return reply({ error: 'Solicitud no permitida.' }, 403);
  if (!request.headers.get('content-type')?.includes('application/json')) return reply({ error: 'Formato no admitido.' }, 415);
  let input: unknown;
  try { input = await readBody(request); }
  catch (error) { return reply({ error: 'El mensaje no tiene un formato o tamaño válido.' }, error instanceof Error && error.message === 'size' ? 413 : 400); }
  if (!input || typeof input !== 'object' || Array.isArray(input)) return reply({ error: 'Completa los campos del formulario.' }, 400);
  const data = input as Record<string, unknown>;
  if (typeof data.website === 'string' && data.website) return reply({ error: 'No se pudo validar el formulario.' }, 400);
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (!name || name.length > 100 || /[\r\n]/.test(name) || email.length > 254 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !message || message.length > 4000) {
    return reply({ error: 'Revisa tu nombre, correo y mensaje (máximo 4000 caracteres).' }, 400);
  }
  if (typeof data.requestId !== 'string' || !/^[0-9a-f-]{36}$/i.test(data.requestId)) return reply({ error: 'Recarga el formulario e inténtalo de nuevo.' }, 400);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || 'isusedia@gmail.com';
  if (!apiKey || !from) return reply({ error: 'El envío desde la web aún no está disponible. Escríbenos a isusedia@gmail.com o llámanos al +57 313 3761781.' }, 503);
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.until <= now) attempts.delete(key);
  if (globalWindow.until <= now) globalWindow = { count: 0, until: now + WINDOW_MS };
  const key = createHash('sha256').update(email.toLowerCase()).digest('hex');
  const entry = attempts.get(key) ?? { count: 0, until: now + WINDOW_MS };
  if (entry.count >= 3 || globalWindow.count >= 30 || attempts.size >= 1000) {
    return Response.json({ error: 'Se han recibido varios mensajes. Espera unos minutos antes de volver a intentarlo.' }, { status: 429, headers: { 'Retry-After': '600', 'Cache-Control': 'no-store' } });
  }
  entry.count++; globalWindow.count++; attempts.set(key, entry);
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST', signal: AbortSignal.timeout(10000),
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `contact-${data.requestId}` },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: 'Contacto desde Productos TAJIRI', text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}` }),
    });
    if (!response.ok) { console.error('El proveedor de correo rechazó el envío:', response.status); return reply({ error: genericError }, 502); }
    return reply({ message: 'Tu mensaje fue aceptado para envío. Gracias por escribirnos.' });
  } catch { console.error('No se pudo contactar al proveedor de correo.'); return reply({ error: genericError }, 502); }
}
