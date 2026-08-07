import { createServerSupabaseClient } from '@/lib/supabase';
import GalleryGrid from '@/components/GalleryGrid';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Galería',
  description:
    'Historias TAJIRI en imágenes — momentos, eventos y relatos capturados en nuestra galería.',
};

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  date: string;
};

const getGalleryItems = async (): Promise<GalleryItem[]> => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('gallery')
    .select('id,title,description,image_url,date')
    .order('date', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    
    <main className="min-h-screen bg-white">
      <br />
      <br />
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/80">Galería</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#4a2b22] sm:text-5xl">
            Historias TAJIRI en imágenes
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#4a2b22]/80">
            Conoce las historias que nos inspiran y los momentos que nos motivan a seguir adelante. Nuestra galería es un reflejo de la pasión y dedicación que ponemos en cada producto, capturando la esencia de lo que significa ser parte de la familia TAJIRI.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-[#f3d48a]/10 bg-[#fff8f0] p-16 text-center text-[#4a2b22]/80 shadow-[0_40px_100px_rgba(0,0,0,0.05)]">
            <p className="text-xl font-medium">No hay imágenes disponibles todavía.</p>
            <p className="mt-3">Estamos preparando más contenido para nuestra galería.</p>
          </div>
        ) : (
          <GalleryGrid items={items} />
        )}
      </section>
    </main>
  );
}
