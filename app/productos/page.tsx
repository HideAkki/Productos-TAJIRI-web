'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

type ProductImage = {
  src: string;
  alt: string;
  label: string;
};

type Product = {
  title: string;
  subtitle: string;
  description: string;
  details: string;
  variants?: string[];
  size?: string;
  imageLabel: string;
  features: string[];
  images: ProductImage[];
  color: string;
};

const products: Product[] = [
  {
    title: 'Suero Costeño',
    subtitle: 'Suavidad costera en cada sorbo',
    description: 'Textura fresca y una tradición auténtica de la costa colombiana.',
    details:
      'Nuestro suero costeño es ligero, ligeramente salado y perfecto para complementar arepas, sopas o para marinar. Disponible en dos formatos para llegar a la mesa con la dosis justa de frescura.',
    variants: ['16 oz', '9 oz'],
    imageLabel: 'Botella de vidrio tradicional',
    features: ['Cremoso', 'Elaborado artesanalmente', 'Leche de búfala', 'Conservación refrigerada'],
    images: [
      { src: '/Nala.png', alt: 'Botella de suero costeño sobre tela natural', label: 'Etiqueta frontal' },
      { src: '/logo-tajiri.png', alt: 'Detalle de botella con tapa', label: 'Detalle del envase' },
      { src: '/Nala.png', alt: 'Suero servido en vaso', label: 'Servido en vaso' },
    ],
    color: 'from-[#8f1111] to-[#4a2b22]',
  },
  {
    title: 'Yogur Griego',
    subtitle: 'Cuerpo cremoso, estilo sereno',
    description: 'Crema espesa y nutritiva para tus recetas o momentos especiales.',
    details:
      'Yogur griego artesanal con cuerpo cremoso y textura firme. Ideal para acompañar frutas, granola o recetas saladas que necesitan un frescor concentrado.',
    variants: ['16 oz', '9 oz'],
    imageLabel: 'Tarrina cremosa',
    features: ['Alta proteína', 'Textura consistente', 'Ideal en bowls', 'Artesanal'],
    images: [
      { src: '/logo-tajiri.png', alt: 'Tarrina de yogur griego con tapa', label: 'Tarrina elegante' },
      { src: '/Nala.png', alt: 'Yogur griego servido con fruta', label: 'Detalle servido' },
      { src: '/logo-tajiri.png', alt: 'Etiqueta del yogur griego', label: 'Etiqueta minimalista' },
    ],
    color: 'from-[#4a2b22] to-[#8f1111]',
  },
  {
    title: 'Yogur Bebible',
    subtitle: 'Ligereza lista para llevar',
    description: 'Listo para llevar, suave y delicado con cuerpo natural.',
    details:
      'Fresco y práctico, este yogur bebible es perfecto para la mañana o merienda. Combina la riqueza de la leche búfala con una sensación ligera y nutritiva.',
    variants: ['16 oz', '9 oz'],
    imageLabel: 'Botella de agarre fácil',
    features: ['Fresco y ligero', 'Rico en probióticos', 'Ideal para la mañana', 'Conveniente'],
    images: [
      { src: '/logo-tajiri.png', alt: 'Botella de yogur bebible con fondo neutro', label: 'Botella de agarre fácil' },
      { src: '/Nala.png', alt: 'Yogur bebible servido en vaso', label: 'Inspiración para la mañana' },
      { src: '/logo-tajiri.png', alt: 'Detalle del logo en botella', label: 'Etiqueta refinada' },
    ],
    color: 'from-[#e4b45f] to-[#f3d48a]',
  },
  {
    title: 'Su-Kukayo',
    subtitle: 'Crujiente artesanal con carácter',
    description: 'Un snack artesanal con un sabor que reconforta.',
    details:
      'Crujiente y sabroso, el Su-Kukayo es una opción tradicional para compartir o disfrutar como snack. Su preparación artesanal garantiza textura y sabor auténtico.',
    size: '250 g',
    imageLabel: 'Snack crocante',
    features: ['Croquante', 'Hecho a mano', 'Textura noble', 'Sabor reconfortante'],
    images: [
      { src: '/Nala.png', alt: 'Paquete de Su-Kukayo abierto', label: 'Paquete abierto' },
      { src: '/logo-tajiri.png', alt: 'Bocados crujientes en plato', label: 'Bocados crujientes' },
      { src: '/Nala.png', alt: 'Presentación del snack en mesa', label: 'Presentación elegante' },
    ],
    color: 'from-[#8f1111] to-[#e4b45f]',
  },
];

export default function ProductosPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const slideCount = selectedProduct?.images.length ?? 0;

  const goPrevious = () => {
    if (!selectedProduct || slideCount === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  const goNext = () => {
    if (!selectedProduct || slideCount === 0) return;
    setCurrentSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  };

  const selectVariant = (variant: string) => {
    setSelectedVariant(variant);
  };

  return (
    <main className="relative overflow-hidden px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <SectionTitle
            eyebrow="Catálogo"
            title="Nuestros productos con leche de búfala"
            description="Selección limitada de alternativas artesanales que combinan cremosidad, sabor y detalles premium en cada presentación."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <motion.article
                key={product.title}
                variants={fadeUp}
                className="group overflow-hidden rounded-[2rem] border border-[#4a2b22]/10 bg-white/95 shadow-[0_30px_80px_-55px_rgba(74,43,34,0.12)] transition hover:-translate-y-1 hover:border-[#e4b45f]/30 hover:bg-[#fff8f0]"
              >
                <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${product.color}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.28),_transparent_35%)]" />
                  <div className="absolute inset-x-0 bottom-0 h-28 rounded-t-[2rem] bg-white/10" />
                  <div className="relative flex h-full flex-col justify-between p-6 text-white">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/90">Producto</span>
                      {product.size ? (
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/80">
                          {product.size}
                        </span>
                      ) : null}
                    </div>
                    <div>
                      <p className="text-3xl font-semibold leading-tight">{product.title}</p>
                      <p className="mt-3 text-sm text-white/80">{product.imageLabel}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-7">
                  <p className="text-sm leading-7 text-[#4a2b22]/85">{product.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature) => (
                      <span key={feature} className="rounded-full bg-[#f3d48a]/20 px-3 py-1 text-xs font-semibold text-[#4a2b22]">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-[#4a2b22]/10 pt-4">
                    <div className="mb-3 flex flex-wrap gap-2 text-xs text-[#4a2b22]/80">
                      {product.variants?.map((variant) => (
                        <span key={variant} className="rounded-full bg-[#f3d48a]/20 px-3 py-1">
                          {variant}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProduct(product);
                        setCurrentSlide(0);
                      }}
                      className="rounded-full bg-[#8f1111] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#9f1515]"
                    >
                      Ver detalle
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProduct ? (
          <motion.div
            key="product-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative mx-auto h-[90vh] w-full max-w-[1700px] overflow-hidden rounded-[2rem] bg-white/95 shadow-[0_60px_140px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:bg-black/60"
                aria-label="Cerrar detalle"
              >
                ✕
              </button>

              <div className="grid h-full grid-cols-1 gap-6 overflow-hidden lg:grid-cols-[1.55fr_1fr]">
                <div className="relative flex flex-col bg-[#111111] p-6 sm:p-8 lg:p-10">
                  <motion.div
                    key={selectedProduct.images[currentSlide].src}
                    initial={{ opacity: 0, scale: 0.995 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.995 }}
                    transition={{ duration: 0.32, ease: 'easeOut' }}
                    className="relative flex-1 overflow-hidden rounded-[2rem] bg-black"
                  >
                    <Image
                      src={selectedProduct.images[currentSlide].src}
                      alt={selectedProduct.images[currentSlide].alt}
                      fill
                      className="h-full w-full object-contain"
                      sizes="90vw"
                    />
                  </motion.div>

                  <div className="mt-5 flex flex-col gap-3">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">{selectedProduct.images[currentSlide].label}</p>
                    <p className="max-w-2xl text-sm leading-7 text-white/70">{selectedProduct.imageLabel}</p>
                  </div>

                  <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
                    {selectedProduct.images.map((image, index) => (
                      <button
                        key={`${image.src}-${index}`}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        className={`relative h-20 min-w-[5.5rem] overflow-hidden rounded-[1.5rem] border transition duration-300 ${
                          currentSlide === index
                            ? 'border-white/90 shadow-[0_15px_40px_rgba(0,0,0,0.25)]'
                            : 'border-white/15'
                        }`}
                      >
                        <Image src={image.src} alt={image.alt} fill className="object-cover" />
                        <div
                          className={`absolute inset-0 transition ${
                            currentSlide === index ? 'bg-black/10' : 'bg-black/20'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between overflow-hidden bg-white p-6 sm:p-8 lg:p-10">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <p className="text-xs uppercase tracking-[0.4em] text-[#4a2b22]/60">Producto exclusivo</p>
                      <div className="space-y-2">
                        <h2 className="text-4xl font-semibold tracking-tight text-[#4a2b22] sm:text-5xl">{selectedProduct.title}</h2>
                        <p className="max-w-xl text-lg font-medium leading-8 text-[#4a2b22]/70">{selectedProduct.subtitle}</p>
                      </div>
                      <p className="max-w-xl text-base leading-8 text-[#4a2b22]/75">{selectedProduct.description}</p>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-[#4a2b22]/70">
                        <span className="inline-block h-px flex-1 bg-[#4a2b22]/10" />
                        Detalles
                        <span className="inline-block h-px flex-1 bg-[#4a2b22]/10" />
                      </div>
                      <p className="text-sm leading-7 text-[#4a2b22]/80">{selectedProduct.details}</p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/70">Características</p>
                      <div className="space-y-3">
                        {selectedProduct.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3 text-sm leading-7 text-[#4a2b22]/85">
                            <span className="inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full bg-[#4a2b22]" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedProduct.variants ? (
                      <div className="space-y-3">
                        <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/70">Presentaciones</p>
                        <div className="flex flex-wrap gap-3">
                          {selectedProduct.variants.map((variant) => (
                            <motion.button
                              key={variant}
                              type="button"
                              onClick={() => selectVariant(variant)}
                              whileHover={{ scale: 1.02 }}
                              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                selectedVariant === variant
                                  ? 'border-[#4a2b22] bg-[#4a2b22] text-white'
                                  : 'border-[#4a2b22]/15 bg-white text-[#4a2b22]'
                              }`}
                            >
                              {variant}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-8 flex flex-col gap-4 border-t border-[#4a2b22]/10 pt-6">
                    {selectedVariant ? (
                      <p className="text-sm text-[#4a2b22]/75">Presentación seleccionada: {selectedVariant}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
