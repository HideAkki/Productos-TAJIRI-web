import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const COOKIE_NAME = 'admin-auth';
const COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24,
};

if (!ADMIN_PASSWORD) {
  throw new Error('Missing ADMIN_PASSWORD environment variable.');
}

export async function GET() {
  const cookieStore = await cookies();
  const authValue = cookieStore.get(COOKIE_NAME)?.value;
  return NextResponse.json({ authenticated: authValue === '1' });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (body?.action === 'logout') {
    const response = NextResponse.json({ authenticated: false });
    response.cookies.set(COOKIE_NAME, '', { ...COOKIE_OPTIONS, maxAge: 0 });
    return response;
  }

  const username = String(body?.username || '').trim();
  const password = String(body?.password || '').trim();

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Usuario o contraseña incorrectos.' }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(COOKIE_NAME, '1', COOKIE_OPTIONS);
  return response;
}
