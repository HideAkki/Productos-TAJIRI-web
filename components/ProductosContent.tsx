'use client';

import Image from 'next/image';
import DialogShell from '@/components/DialogShell';
import Link from 'next/link';
import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { motion, AnimatePresence } from 'framer-motion';

import { products, type Product } from '@/lib/products';

export default function ProductosPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const selectedImages = selectedProduct
    ? selectedVariant && selectedProduct.variantImages?.[selectedVariant]
      ? selectedProduct.variantImages[selectedVariant]
      : selectedProduct.images
    : [];

  const activeProductDetails = selectedProduct
    ? selectedProduct.variantDetails && selectedVariant
      ? `${selectedProduct.details} ${selectedProduct.variantDetails[selectedVariant] ?? ''}`
      : selectedProduct.details
    : '';

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    setSelectedVariant(null);
    setCurrentSlide(0);
  };

  const selectVariant = (variant: string) => {
    setSelectedVariant(variant);
    setCurrentSlide(0);
  };

  return (
    <main className="relative overflow-hidden px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <SectionTitle
            as="h1"
            eyebrow="Catálogo"
            title="Nuestros productos artesanales"
            description="Selección de alternativas artesanales que combinan sabor, tradición y detalles premium en cada presentación."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.title}
                className="group overflow-hidden rounded-[2rem] border border-[#4a2b22]/10 bg-white/95 shadow-[0_30px_80px_-55px_rgba(74,43,34,0.12)] transition hover:-translate-y-1 hover:border-[#e4b45f]/30 hover:bg-[#fff8f0] opacity-100 transform-none"
              >
                <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${product.color}`}>
                  {product.coverImage ? (
                    <Image
                      src={product.coverImage}
                      alt={`${product.title} portada`}
                      fill
                      className="absolute inset-0 object-cover opacity-90"
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    />
                  ) : <div className="absolute inset-0 flex items-center justify-center pb-12"><Image src="/logo-tajiri.webp" alt="" width={110} height={110} className="object-contain" /></div>}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.28),_transparent_35%)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-28 rounded-t-[2rem] bg-white/10" />
                  <div className="relative flex h-full flex-col justify-between p-6 text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/90">Producto</span>
                      {product.statusLabel ? (
                        <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#4a2b22]">
                          {product.statusLabel}
                        </span>
                      ) : product.size ? (
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white">{product.size}</span>
                      ) : null}
                    </div>
                    <div>
                      <p className="text-3xl font-semibold leading-tight text-white">{product.title}</p>
                      <p className="mt-3 text-sm text-white">{product.imageLabel}</p>
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
                        setSelectedVariant(product.variants?.[0] ?? null);
                        setCurrentSlide(0);
                      }}
                      className="rounded-full bg-[#8f1111] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#9f1515]"
                    >
                      Ver detalle
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct ? (
          <DialogShell onClose={handleCloseDetails} label="Detalle del producto">
          <motion.div
            key="product-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-4 sm:py-8"
            onClick={handleCloseDetails}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative mx-auto my-2 w-full max-w-[min(90vw,1700px)] max-h-[calc(100dvh-1rem)] overflow-y-auto rounded-[2rem] bg-white/95 shadow-[0_60px_140px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:my-4 sm:max-h-[90vh]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleCloseDetails}
                className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:bg-black/60"
                aria-label="Cerrar detalle"
              >
                ✕
              </button>

              <div className="grid min-h-0 grid-cols-1 gap-6 lg:grid-cols-[1.55fr_1fr]">
                <div className="relative flex min-h-0 flex-col bg-[#111111] p-6 sm:p-8 lg:p-10">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.995 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.995 }}
                    transition={{ duration: 0.32, ease: 'easeOut' }}
                    className="relative aspect-[4/3] min-h-[280px] flex-1 overflow-hidden rounded-[2rem] bg-black lg:aspect-auto lg:min-h-[420px]"
                  >
                    {selectedImages[currentSlide]?.src ? (
                      <Image
                        src={selectedImages[currentSlide].src}
                        alt={selectedImages[currentSlide].alt}
                        fill
                        className="h-full w-full object-contain"
                        sizes="(min-width: 1024px) 55vw, 90vw"
                      />
                    ) : (
                      <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-5 p-8 text-center text-white/90"><Image src="/logo-tajiri.webp" alt="" width={120} height={120} /><p>Fotografía del producto próximamente.</p></div>
                    )}
                  </motion.div>

                  <div className="mt-5">
                    <p className="max-w-2xl text-sm leading-7 text-white/70">{selectedProduct.imageLabel}</p>
                  </div>

                  <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
                    {selectedImages.map((image, index) => (
                      <button
                        key={index}
                        type="button"
                        aria-label={`Ver imagen ${index + 1}: ${image.label}`}
                        aria-pressed={currentSlide === index}
                        onClick={() => setCurrentSlide(index)}
                        className={`relative h-20 min-w-[5.5rem] overflow-hidden rounded-[1.5rem] border transition duration-300 ${
                          currentSlide === index
                            ? 'border-white/90 shadow-[0_15px_40px_rgba(0,0,0,0.25)]'
                            : 'border-white/15'
                        }`}
                      >
                        {image?.src ? (
                          <>
                            <Image src={image.src} alt={image.alt} fill sizes="88px" className="object-cover" />
                            <div
                              className={`absolute inset-0 transition ${
                                currentSlide === index ? 'bg-black/10' : 'bg-black/20'
                              }`}
                            />
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-white/10" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex min-h-0 flex-col justify-between overflow-y-auto bg-white p-6 sm:p-8 lg:p-10">
                  <div className="space-y-8 overflow-y-auto pr-1 sm:pr-2">
                    <div className="space-y-4">
                      <p className="text-xs uppercase tracking-[0.4em] text-[#4a2b22]/60">Producto exclusivo</p>
                      <div className="space-y-2">
                        <h2 id="product-title" className="text-4xl font-semibold tracking-tight text-[#4a2b22] sm:text-5xl">{selectedProduct.title}</h2>
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
                      <p className="text-sm leading-7 text-[#4a2b22]/80">{activeProductDetails}</p>
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
                              aria-pressed={selectedVariant === variant}
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
                    <Link href={{ pathname: '/contacto', query: { producto: selectedProduct.title, ...(selectedVariant ? { presentacion: selectedVariant } : {}) } }} className="rounded-full bg-[#8f1111] px-6 py-3 text-center font-semibold text-white">Consultar por este producto</Link>
                    {selectedVariant ? (
                      <p className="text-sm text-[#4a2b22]/75">Presentación seleccionada: {selectedVariant}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          </DialogShell>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
