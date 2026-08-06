'use client';

import { motion } from 'framer-motion';
import { Heart, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { fadeLeft, fadeRight, staggerContainer } from '@/lib/motion';

const cards = [
  {
    title: 'Ingredientes seleccionados',
    description: 'La leche de búfala aporta una base distinta para productos artesanales con una identidad propia.',
    icon: Sparkles,
  },
  {
    title: 'Sabor más cremoso',
    description: 'Un tono suave y aterciopelado que transforma cada bocado en una experiencia premium.',
    icon: Heart,
  },
  {
    title: 'Producción responsable',
    description: 'Cuidado artesanal y enfoque atento en cada lote, con respeto por el animal y el entorno.',
    icon: Leaf,
  },
  {
    title: 'Calidad artesanal',
    description: 'Cada lote se elabora con atención, desde la idea hasta llegar a tu mesa.',
    icon: ShieldCheck,
  },
];

export default function WhyBuffalo() {
  return (
    <section className="mx-auto mb-16 max-w-7xl px-4 sm:mb-24 sm:px-8">
      <SectionTitle
        eyebrow="Descubre"
        title="¿Por qué leche de búfala?"
        description="Una elección premium que eleva la cremosidad, el valor nutricional y la experiencia artesanal en cada producto."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:mt-12"
      >
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            variants={index % 2 === 0 ? fadeLeft : fadeRight}
            className="rounded-[2rem] border border-[#4a2b22]/10 bg-white/95 p-6 transition hover:-translate-y-1 hover:border-[#e4b45f]/30 hover:bg-[#fff8f0] sm:p-8"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#f3d48a]/15 text-[#4a2b22] ring-1 ring-[#f3d48a]/30">
              <card.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-[#4a2b22]">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#4a2b22]/80">{card.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
