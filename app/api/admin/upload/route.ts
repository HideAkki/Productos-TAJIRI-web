import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

const COOKIE_NAME = 'admin-auth';

if (!CLOUDINARY_UPLOAD_PRESET || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error('Missing Cloudinary environment variables.');
}

const validateAuthRequest = (request: Request) => {
  const cookieHeader = request.headers.get('cookie') || '';
  return cookieHeader.includes(`${COOKIE_NAME}=1`);
};

export async function POST(request: Request) {
  if (!validateAuthRequest(request)) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const formData = await request.formData();
  const title = String(formData.get('title') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const date = String(formData.get('date') || '').trim();
  const image = formData.get('image');

  if (!title || !date || !image || !(image instanceof File)) {
    return NextResponse.json({ error: 'Título, fecha e imagen son obligatorios.' }, { status: 400 });
  }

  try {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    const uploadData = new FormData();
    uploadData.append('file', image);
    uploadData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET!);
    uploadData.append('folder', 'tajiri-gallery');
    uploadData.append('public_id', `${Date.now()}-${image.name}`);

    const uploadResponse = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: uploadData,
    });

    if (!uploadResponse.ok) {
      const errorResult = await uploadResponse.text();
      return NextResponse.json({ error: `Cloudinary upload failed: ${errorResult}` }, { status: 500 });
    }

    const uploadResult = await uploadResponse.json();
    const imageUrl = uploadResult.secure_url;

    const insertResult = await supabaseAdmin.from('gallery').insert([
      {
        title,
        description: description || null,
        date,
        image_url: imageUrl,
      },
    ]);

    if (insertResult.error) {
      return NextResponse.json({ error: insertResult.error.message }, { status: 500 });
    }

    const insertedData = insertResult.data as Array<Record<string, unknown>> | null;
    if (!insertedData || insertedData.length === 0) {
      return NextResponse.json({ error: 'No se pudo obtener el registro creado.' }, { status: 500 });
    }

    const item = insertedData[0];
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al subir la imagen.' },
      { status: 500 }
    );
  }
}
