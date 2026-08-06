'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

export default function CTASection() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto mb-16 max-w-7xl rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#f3d48a]/20 via-[#fff8f0]/70 to-[#f3d48a]/20 p-6 shadow-[0_60px_140px_-90px_rgba(243,212,138,0.5)] sm:mb-24 sm:rounded-[3rem] sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/90">¿Listo para conocer nuestros productos?</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#4a2b22] sm:text-3xl lg:text-4xl">
            Descubre la leche de búfala con el sello artesanal de TAJIRI.
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/contacto" className="inline-flex items-center justify-center rounded-full bg-[#8f1111] px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#9f1515]">
            Contactar
          </Link>
          <Link href="/productos" className="inline-flex items-center justify-center rounded-full border border-[#4a2b22]/20 bg-[#fff8f0]/90 px-7 py-3 text-sm font-semibold text-[#4a2b22] transition hover:-translate-y-0.5 hover:bg-[#fff8f0]">
            Ver Productos
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
