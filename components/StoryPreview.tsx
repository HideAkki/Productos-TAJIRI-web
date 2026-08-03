'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { fadeLeft, fadeRight } from '@/lib/motion';

export default function StoryPreview() {
  return (
    <section className="mx-auto mb-16 max-w-7xl px-4 sm:mb-24 sm:px-8">
      <motion.div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <motion.div variants={fadeLeft} className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#fff8f0] via-[#f3d48a]/80 to-[#f3d48a]/20 p-4 shadow-[0_35px_120px_-65px_rgba(0,0,0,0.4)] sm:rounded-[2.5rem] sm:p-6">
          <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_top,_rgba(143,17,17,0.16),transparent_28%),_linear-gradient(180deg,_rgba(255,248,240,0.9),rgba(255,248,240,0.55))] shadow-inner shadow-amber-200/10 sm:rounded-[2rem]"></div>
        </motion.div>

        <motion.div variants={fadeRight} className="rounded-[2rem] border border-[#f3d48a]/25 bg-[#fff8f0]/95 p-6 shadow-[0_35px_120px_-65px_rgba(0,0,0,0.15)] sm:rounded-[2.5rem] sm:p-8 lg:p-10">
          <SectionTitle
            eyebrow="Nuestra Historia"
            title="El viaje de TAJIRI: De la finca a tu mesa"
            description="Desde los primeros pasos en la finca hasta la mesa, cada receta se moldea con respeto, autenticidad y ganas de crear sabores que reconfortan."
            className="max-w-3xl"
          />
          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#4a2b22]/75 sm:mt-8">
            Resumen de nuestra historia y valores.
          </p>
          <div className="mt-8">
            <Link href="/conocenos/nuestra-historia" className="inline-flex items-center rounded-full bg-[#8f1111] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#9f1515]">
              Conocer más
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
