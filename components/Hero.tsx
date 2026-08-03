'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { fadeUp, fadeRight, scaleIn, staggerContainer } from '@/lib/motion';

const heroFeatures = [
  'Ingredientes seleccionados',
  'Producción artesanal',
  'Calidad garantizada',
];

function MascotIllustration() {
  return (
    <motion.div variants={scaleIn} className="relative mx-auto flex items-center justify-center">
      <Image src="/Nala.png" alt="Nala" width={420} height={420} className="h-auto w-full max-w-[280px] object-contain sm:max-w-[420px]" />
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#fff8f0] pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:gap-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }} className="space-y-8">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 rounded-full bg-[#e4b45f]/12 px-4 py-2 text-sm font-semibold text-[#4a2b22] ring-1 ring-[#e4b45f]/30">
            <Sparkles className="h-4 w-4" />
            Productos artesanales y saludables
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="text-sm uppercase tracking-[0.32em] text-[#4a2b22]/70">Premium • Artesanal • Natural</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-[#4a2b22] sm:text-4xl md:text-6xl">
              Productos artesanales
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#4a2b22]/80 sm:text-lg">
              Transformamos la calidad de la leche de búfala en productos únicos y de calidad, libres de conservantes y aditivos artificiales.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/productos" className="inline-flex items-center justify-center rounded-full bg-[#8f1111] px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#9f1515]">
              Ver productos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/conocenos/nuestra-historia" className="inline-flex items-center justify-center rounded-full border border-[#4a2b22]/20 bg-white/5 px-7 py-3 text-sm font-semibold text-[#4a2b22] transition hover:-translate-y-0.5 hover:border-[#8f1111] hover:bg-white/15">
              Nuestra historia
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-3 sm:grid-cols-3">
            {heroFeatures.map((feature) => (
              <div key={feature} className="rounded-3xl border border-[#4a2b22]/10 bg-white p-4 text-sm text-[#4a2b22] shadow-[0_18px_60px_-50px_rgba(74,43,34,0.16)]">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#8f1111]" />
                  <span>{feature}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeRight} className="relative">
          <div className="pointer-events-none absolute -left-8 top-12 h-36 w-36 rounded-full bg-[#e4b45f]/20 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-20 h-28 w-28 rounded-full bg-[#8f1111]/20 blur-3xl" />
          <div className="relative">
            <AnimatePresence>
              <motion.div
                initial={{ y: -18, opacity: 0.88, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 8, ease: 'easeInOut' }}
              >
                <MascotIllustration />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
