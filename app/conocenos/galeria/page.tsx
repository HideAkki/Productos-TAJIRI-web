import { supabaseAdmin } from '@/lib/supabase-admin';
import GalleryGrid from '@/components/GalleryGrid';

export const dynamic = 'force-dynamic';

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  date: string;
};

const getGalleryItems = async (): Promise<GalleryItem[]> => {
  const { data, error } = await supabaseAdmin
    .from('gallery')
    .select('id,title,description,image_url,date')
    .order('date', { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-[110rem] px-8 pb-24 sm:px-10 lg:px-12 xl:px-14">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/80">Galería</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#4a2b22] sm:text-5xl">
            Historias Tajiri en imágenes
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#4a2b22]/80">
            Toca un elemento para verlo en tamaño completo y mostrar los detalles del título, año y descripción. También se admiten videos si la URL apunta a un video.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-[#f3d48a]/10 bg-[#fff8f0] p-16 text-center text-[#4a2b22]/80 shadow-[0_40px_100px_rgba(0,0,0,0.05)]">
            <p className="text-xl font-medium">No hay imágenes disponibles todavía.</p>
            <p className="mt-3">Sube contenido desde el panel de administración oculto.</p>
          </div>
        ) : (
          <GalleryGrid items={items} />
        )}
      </section>
    </main>
  );
}
