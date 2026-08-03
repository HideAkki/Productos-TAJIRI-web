'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, scaleIn } from '@/lib/motion';

const stats = [
  { label: 'Productos Artesanales', value: '100% artesanales y tradicionales' },
  { label: 'Leche de Búfala', value: 'Origen local y natural' },
  { label: 'Ingredientes Naturales', value: 'Seleccion de la maxima calidad' },
  { label: 'Innovación Constante', value: 'Nuevos lanzamientos pronto' },
];

export default function StatsSection() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto mb-16 max-w-7xl px-4 sm:mb-20 sm:px-8"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <motion.article
            key={stat.label}
            variants={fadeUp}
            className="rounded-[2rem] border border-[#4a2b22]/10 bg-white/95 p-6 shadow-[0_30px_80px_-55px_rgba(74,43,34,0.12)] transition hover:-translate-y-1 hover:border-[#e4b45f]/40 hover:bg-[#fff8f0] sm:p-8"
          >
            <motion.div variants={scaleIn} className="text-sm font-semibold uppercase tracking-[0.34em] text-[#4a2b22]/80">
              {stat.label}
            </motion.div>
            <p className="mt-4 text-xl font-semibold leading-tight text-[#4a2b22] sm:text-2xl">{stat.value}</p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
