'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, staggerContainer } from '@/lib/motion';

const products = [
  {
    title: 'Suero Costeño',
    description: 'Fresco y auténtico, con una textura ligera y sabor tradicional.',
    color: 'from-[#8f1111] to-[#4a2b22]',
  },
  {
    title: 'Yogur Griego',
    description: 'Crema perfecta y cuerpo firme, para un disfrute saludable y apetitoso.',
    color: 'from-[#4a2b22] to-[#8f1111]',
  },
  {
    title: 'Yogur Bebible',
    description: 'Listo para llevar, suave y delicado, con la riqueza de la leche de búfala.',
    color: 'from-[#e4b45f] to-[#f3d48a]',
  },
  {
    title: 'Su-Kukayo',
    description: 'Snack tradicional con un toque auténtico, crujiente y nutritivo.',
    color: 'from-[#8f1111] to-[#e4b45f]',
  },
  {
    title: 'Masa para Arepas',
    description: 'Masa artesanal con harina de maíz amarillo y linaza, pensada para una opción más amable con la digestión.',
    color: 'from-[#caa65d] to-[#7a4a20]',
  },
  {
    title: 'SARA Dulce',
    description: 'Golosina artesanal de maíz tostado y molido con azúcar y limón.',
    color: 'from-[#d68f2a] to-[#f8d27d]',
  },
  {
    title: 'Chakula Premium Café',
    description: 'Bebida tipo malteada con extracto de café, fibra soluble y aceite Omega 3.',
    color: 'from-[#6b3f1d] to-[#b96a2b]',
  },
  {
    title: 'Chakula Premium Cacao',
    description: 'Bebida tipo malteada con extracto de cacao, fibra soluble y aceite Omega 3.',
    color: 'from-[#4a2a1a] to-[#8a4b2d]',
  },
  {
    title: 'Nala Peinate',
    description: 'Extracto de café de origen con doble extracción para mayor intensidad.',
    color: 'from-[#2f241d] to-[#7a4a2d]',
  },
  {
    title: 'TURARI',
    description: 'Aderezo líquido para carnes elaborado a partir de extracto de hierbas.',
    color: 'from-[#2e6b3f] to-[#6e9d4f]',
  },
];

export default function ProductShowcase() {
  return (
    <section className="mx-auto mb-16 max-w-7xl rounded-[2rem] bg-[#fff8f0] px-4 py-8 shadow-[0_40px_120px_-90px_rgba(228,180,95,0.24)] sm:mb-24 sm:rounded-[3rem] sm:px-8 sm:py-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[#4a2b22]/80">Nuestros Productos</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#4a2b22] sm:text-4xl">Conoce nuestros productos</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4a2b22]/80 sm:text-base">
            Productos pensados para quienes buscan calidad auténtica, sabores profundos y elegancia artesanal en cada presentación.
          </p>
        </div>
        <Link href="/productos" className="inline-flex items-center justify-center rounded-full bg-[#8f1111] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#9f1515] sm:w-auto">
          Ver todo el catálogo
        </Link>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {products.map((product) => (
          <motion.article
            key={product.title}
            variants={fadeUp}
            className="group overflow-hidden rounded-[2rem] border border-[#4a2b22]/10 bg-white/95 p-4 shadow-[0_30px_80px_-55px_rgba(74,43,34,0.12)] transition hover:-translate-y-1 hover:border-[#e4b45f]/30 hover:bg-[#fff8f0] sm:p-6"
          >
            <div className={`aspect-[4/3] rounded-[2rem] bg-gradient-to-br ${product.color} p-4 shadow-inner shadow-[#8f1111]/10 sm:p-6`}>
              <div className="flex h-full items-end justify-start rounded-[1.75rem] bg-black/10 p-4 text-white">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.35em]">Seleccionado</p>
                  <p className="text-2xl font-semibold">{product.title}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <p className="text-sm leading-7 text-[#4a2b22]/80">{product.description}</p>
              <Link href="/productos" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8f1111] transition group-hover:text-[#4a2b22]">
                Ver producto
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
