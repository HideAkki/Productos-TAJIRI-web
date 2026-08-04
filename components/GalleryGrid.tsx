'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  date: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
};

const isVideoUrl = (url: string) => {
  const normalized = url.split('?')[0].split('#')[0].toLowerCase();
  return [
    '.mp4',
    '.webm',
    '.ogg',
    '.mov',
    '.m4v',
    '.avi',
    '.mkv',
  ].some((extension) => normalized.endsWith(extension)) || normalized.includes('/video/upload/');
};

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [hideInfo, setHideInfo] = useState(false);

  const formattedDate = useMemo(() => {
    if (!selectedItem?.date) return '';
    return new Date(selectedItem.date).toLocaleDateString('es-ES', {
      year: 'numeric',
    });
  }, [selectedItem]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isVideo = isVideoUrl(item.image_url);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedItem(item);
                setHideInfo(false);
              }}
              className="group overflow-hidden rounded-[2rem] border border-[#f3d48a]/10 bg-[#f6eddf] p-0 shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition hover:shadow-[0_28px_50px_rgba(0,0,0,0.14)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f5efe7]">
                {isVideo ? (
                  <video
                    src={item.image_url}
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedItem ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="relative mx-auto w-full max-w-[90vw] overflow-hidden rounded-[2rem] bg-[#000] shadow-[0_40px_80px_rgba(0,0,0,0.35)] md:max-w-[85vw] lg:max-w-[75vw]"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xl text-white transition hover:bg-black/70"
                aria-label="Cerrar imagen"
              >
                ×
              </button>

              <div className="relative aspect-[16/10] bg-black">
                {isVideoUrl(selectedItem.image_url) ? (
                  <video
                    src={selectedItem.image_url}
                    controls
                    controlsList="nodownload"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <img
                    src={selectedItem.image_url}
                    alt={selectedItem.title}
                    className="h-full w-full object-contain"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                <div className="absolute top-4 right-16 z-30 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHideInfo((current) => !current)}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/50 p-3 text-white transition hover:bg-black/70"
                    aria-label={hideInfo ? 'Mostrar información' : 'Ocultar información'}
                  >
                    {hideInfo ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>

                {!hideInfo && (
                  <div className="absolute bottom-5 left-5 right-5 rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-white/70">{formattedDate}</p>
                        <h2 className="mt-2 text-2xl font-semibold text-white">{selectedItem.title}</h2>
                      </div>
                    </div>

                    {selectedItem.description ? (
                      <p className="mt-4 text-sm leading-7 text-white/80">
                        {selectedItem.description}
                      </p>
                    ) : null}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
