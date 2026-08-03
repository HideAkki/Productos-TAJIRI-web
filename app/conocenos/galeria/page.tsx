'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';

interface GalleryItemData {
  id: number;
  type: 'image' | 'video';
  title: string;
  year: string;
  description: string;
  thumbnail: string;
  source: string;
}

const galleryItems: GalleryItemData[] = [
  {
    id: 1,
    type: 'image',
    title: 'Tradición y sabor',
    year: '2009',
    description: 'Momentos de la inspiración inicial que dieron origen a Productos Tajiri.',
    thumbnail: '',
    source: '',
  },
  {
    id: 2,
    type: 'image',
    title: 'Identidad visual',
    year: '2014',
    description: 'Primeros pasos de la marca con diseño, etiqueta y presencia comercial.',
    thumbnail: '',
    source: '',
  },
  {
    id: 3,
    type: 'image',
    title: 'Proceso artesanal',
    year: '2024',
    description: 'Determinantes momentos del desarrollo artesanal y de la nueva etapa.',
    thumbnail: '',
    source: '',
  },
  {
    id: 4,
    type: 'image',
    title: 'Cercanía y propósito',
    year: '2024',
    description: 'Una mirada cercana a la esencia de la marca y su conexión con las personas.',
    thumbnail: '',
    source: '/',
  },
];

export default function NuestraCulturaPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const [activeRatio, setActiveRatio] = useState<number | null>(null);

  const activeItem = useMemo(() => {
    if (activeIndex === null) return null;
    return galleryItems[activeIndex];
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current === null ? 0 : (current + 1) % galleryItems.length));
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => (current === null ? galleryItems.length - 1 : (current - 1 + galleryItems.length) % galleryItems.length));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setShowInfo(true);
  }, [isOpen]);

  const openItem = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  useEffect(() => {
    if (activeItem) {
      const img = new window.Image();
      img.src = activeItem.source;
      img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight;
        setActiveRatio(Number(ratio.toFixed(3)));
      };
    } else {
      setActiveRatio(null);
    }
  }, [activeIndex]);

  const closeModal = () => setIsOpen(false);

  const goToNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % galleryItems.length);
  };

  const goToPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-[110rem] px-8 py-24 sm:px-10 lg:px-12 xl:px-14">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={fadeUp} className="max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/80">Galería</p>
            <h1 className="text-5xl font-semibold tracking-tight text-[#4a2b22] sm:text-6xl">
              Galería
            </h1>
            <p className="text-lg leading-8 text-[#4a2b22]/80">
              Descubre algunos de los momentos, productos, eventos y procesos que forman parte de la historia de Productos Tajiri.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[110rem] px-8 pb-24 sm:px-10 lg:px-12 xl:px-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto grid max-w-6xl grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-5"
        >
          {galleryItems.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => openItem(index)}
              className="group overflow-hidden rounded-[2rem] border border-[#f3d48a]/20 bg-[#fff8f0] text-left shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
            >
              <div
                className={`relative overflow-hidden ${ratios[index] ? '' : 'aspect-[4/5]'}`}
                style={ratios[index] ? { aspectRatio: ratios[index] } : undefined}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  onLoadingComplete={(img) => {
                    const ratio = img.naturalWidth / img.naturalHeight;
                    setRatios((prev) => ({ ...prev, [index]: Number(ratio.toFixed(3)) }));
                  }}
                />
                <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                  <div className="rounded-full border border-white/70 bg-white/20 p-4 backdrop-blur-sm">
                    <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Ver detalle</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>

      <AnimatePresence>
        {isOpen && activeItem ? (
          <motion.div
            key="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative h-[90vh] w-[90vw] max-w-[1800px] max-h-[95vh] overflow-hidden rounded-[2rem] bg-[#111111]/10 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition hover:bg-black/70"
              >
                ✕
              </button>

              <button
                type="button"
                onClick={() => setShowInfo((current) => !current)}
                className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/70"
              >
                {showInfo ? 'Ocultar info' : 'Mostrar info'}
              </button>

              <button
                type="button"
                onClick={goToPrev}
                className="absolute left-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition hover:bg-black/70"
              >
                ←
              </button>

              <button
                type="button"
                onClick={goToNext}
                className="absolute right-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition hover:bg-black/70"
              >
                →
              </button>

              <div className="relative h-full w-full bg-black">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="relative h-full w-full flex items-center justify-center"
                >
                  <div
                    className={`relative flex items-center justify-center ${
                      activeRatio == null
                        ? 'w-[80%] max-h-[80%]'
                        : activeRatio > 1.15
                        ? 'w-[95%] max-h-[85%]'
                        : activeRatio < 0.9
                        ? 'h-[95%] w-auto max-w-[60%]'
                        : 'w-[80%] max-h-[80%]'
                    }`}
                  >
                    <img
                      src={activeItem.source}
                      alt={activeItem.title}
                      className="object-contain"
                      style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
                    />
                  </div>

                  <AnimatePresence>
                    {showInfo && (
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 24 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute left-0 right-0 bottom-0 z-10 overflow-hidden px-6 pb-6 pt-4"
                      >
                        <div className="max-w-2xl rounded-[1.5rem] border border-white/10 bg-black/50 p-5 backdrop-blur-xl">
                          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                          <div className="relative space-y-3 text-white">
                            <p className="text-sm uppercase tracking-[0.35em] text-white/70">{activeItem.year}</p>
                            <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{activeItem.title}</h3>
                            <p className="text-sm leading-7 text-white/80">{activeItem.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}