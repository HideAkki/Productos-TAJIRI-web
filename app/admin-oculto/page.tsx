import AdminPanel from '@/components/AdminPanel';

export default function AdminOcultoPage() {
  return (
    <main className="min-h-screen bg-[#fff8f0] py-12">
      <div className="mx-auto w-full max-w-5xl rounded-[2rem] border border-[#4a2b22]/10 bg-white/95 px-6 py-10 shadow-[0_40px_100px_rgba(0,0,0,0.08)] sm:px-10">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/70">Panel de administración</p>
          <h1 className="mt-4 text-3xl font-semibold text-[#4a2b22] sm:text-4xl">
            Administración de galería oculta
          </h1>
          <p className="mt-3 text-base leading-7 text-[#4a2b22]/80">
            Accede con el usuario admin y sube imágenes a Cloudinary. Los registros se guardan en Supabase.
          </p>
        </div>

        <AdminPanel />
      </div>
    </main>
  );
}
