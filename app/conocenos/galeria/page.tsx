'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';

export default function NuestraCulturaPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-[110rem] px-8 pb-24 sm:px-10 lg:px-12 xl:px-14">
        <div className="mx-auto flex min-h-[40vh] items-center justify-center rounded-[2rem] border border-[#f3d48a]/10 bg-[#fff8f0] p-16 shadow-[0_40px_100px_rgba(0,0,0,0.05)] sm:p-20">
          <div className="max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/80">Próximamente</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#4a2b22] sm:text-5xl">
              Aquí irá nuestra galería
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#4a2b22]/80">
              Mientras preparamos el contenido visual, esta sección se mantiene limpia y elegante. Vuelve pronto para ver la historia de Tajiri en imágenes.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
