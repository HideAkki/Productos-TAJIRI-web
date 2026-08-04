import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

const COOKIE_NAME = 'admin-auth';

const validateAuthRequest = () => {
  const cookieStore = cookies();
  return cookieStore.get(COOKIE_NAME)?.value === '1';
};

export async function GET() {
  if (!validateAuthRequest()) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('gallery')
    .select('id,title,description,date,image_url')
    .order('date', { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data });
}
