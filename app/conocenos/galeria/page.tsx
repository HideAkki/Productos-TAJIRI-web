import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase';
import { pageMetadata } from '@/lib/site';
import GalleryGrid from '@/components/GalleryGrid';
export const dynamic = 'force-dynamic';
export const metadata = pageMetadata('Galería', 'Momentos, eventos e historias de Productos TAJIRI en imágenes.', '/conocenos/galeria');
const PAGE_SIZE = 18;

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ pagina?: string }> }) {
  const rawPage = Number((await searchParams).pagina ?? 1);
  const page = Number.isSafeInteger(rawPage) && rawPage > 0 && rawPage <= 10000 ? rawPage : 1;
  const offset = (page - 1) * PAGE_SIZE;
  let unavailable = false;
  let missingConfiguration = false;
  let failureCode: string | null = null;
  let items: { id: string; title: string; description: string | null; image_url: string; date: string }[] = [];
  let hasMore = false;
  try {
    const client = createServerSupabaseClient();
    if (!client) {
      unavailable = true;
      missingConfiguration = true;
    }
    else {
      const { data, error } = await client.from('gallery').select('id,title,description,image_url,date')
        .order('date', { ascending: false }).order('id', { ascending: false }).range(offset, offset + PAGE_SIZE);
      if (error) throw error;
      const rows = data ?? [];
      hasMore = rows.length > PAGE_SIZE;
      items = rows.slice(0, PAGE_SIZE).map(item => ({ ...item, id: String(item.id) }))
        .filter(item => /^https:\/\//i.test(item.image_url));
    }
  } catch (error) {
    unavailable = true;
    // Solo el código del error; no registrar claves, URLs de conexión ni datos.
    const code = error && typeof error === 'object' && 'code' in error ? error.code : null;
    failureCode = typeof code === 'string' && /^[A-Z0-9_]{1,32}$/.test(code) ? code : null;
    console.error('No se pudo consultar la galería.', failureCode ? { code: failureCode } : 'Error de conexión o consulta.');
  }
  const pagination = !unavailable && (page > 1 || hasMore) ? (
    <nav aria-label="Páginas de la galería" className="my-8 flex flex-wrap items-center justify-center gap-6">
      {page > 1 && <Link className="rounded-full border border-[#4a2b22]/20 px-5 py-2" href={`?pagina=${page - 1}`}>Anterior</Link>}
      <span>Página {page} · {items.length} elementos</span>
      {hasMore && <Link className="rounded-full bg-[#8f1111] px-5 py-2 text-white" href={`?pagina=${page + 1}`}>Siguiente</Link>}
    </nav>
  ) : null;
  return (
    <main className="min-h-screen bg-white py-16">
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/80">Galería</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#4a2b22] sm:text-5xl">Historias TAJIRI en imágenes</h1>
          <p className="mt-6 text-lg leading-8">Conoce los momentos y las personas que nos inspiran a seguir creando.</p>
        </div>
        {pagination}
        {unavailable ? (
          <div role="status" className="rounded-3xl bg-[#fff8f0] p-10 text-center">
            <p>La galería no está disponible en este momento.</p>
            <p className="mt-3">Puedes volver a intentarlo o conocer nuestras novedades en Instagram.</p>
            <Link className="mt-5 inline-block underline" href="https://www.instagram.com/productos___tajiri_/" target="_blank" rel="noreferrer">Visitar Instagram</Link>
            {process.env.NODE_ENV === 'development' && (
              <aside aria-label="Diagnóstico de la galería local" className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#4a2b22]/20 bg-white p-6 text-left text-sm leading-7">
                <h2 className="font-semibold">{missingConfiguration ? 'Falta conectar la galería a Supabase' : 'No se pudo leer la galería de Supabase'}</h2>
                {missingConfiguration ? (
                  <p>No se encontraron las variables de conexión. Comprueba que tu archivo <code>.env</code> o <code>.env.local</code> original está en la raíz de este proyecto, con <code>NEXT_PUBLIC_SUPABASE_URL</code> y la clave que ya utilizabas: <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> o <code>SUPABASE_SERVICE_ROLE_KEY</code>. Después reinicia <code>npm run dev</code>.</p>
                ) : (
                  <p>Comprueba que el proyecto de Supabase está activo y que las variables de tu archivo de entorno corresponden al proyecto donde está la tabla <code>gallery</code>. Si utilizas la clave pública, revisa también sus permisos de lectura.{failureCode ? ` Código de error: ${failureCode}.` : ''}</p>
                )}
              </aside>
            )}
          </div>
        ) : items.length ? <GalleryGrid items={items} /> : (
          <div className="p-10 text-center">
            <p>No hay imágenes disponibles en esta página.</p>
            {process.env.NODE_ENV === 'development' && page === 1 && <p className="mt-3 text-sm">Si ya subiste fotos, comprueba que estás usando el mismo proyecto de Supabase y que su tabla <code>gallery</code> permite la lectura pública.</p>}
          </div>
        )}
        {pagination}
      </section>
    </main>
  );
}
