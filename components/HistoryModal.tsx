'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import type { TimelineItem } from '@/components/TimelineCard';

interface HistoryModalProps {
  item: TimelineItem | null;
  open: boolean;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
};

export default function HistoryModal({ item, open, onClose }: HistoryModalProps) {
  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={backdropVariants}
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/30 backdrop-blur-lg px-4 py-10"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/20 bg-white/95 shadow-[0_40px_100px_rgba(0,0,0,0.22)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="history-modal-title"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#4a2b22]/10 bg-white/90 text-[#4a2b22] transition hover:bg-[#4a2b22]/5 focus:outline-none focus:ring-2 focus:ring-[#e4b45f]/40"
            >
              ✕
            </button>

            <div className="relative h-96 overflow-hidden">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a2b22]/85 via-transparent to-transparent" />
            </div>

            <div className="space-y-8 p-6 sm:p-8 lg:p-10">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/70">{item.year}</p>
                <h2 id="history-modal-title" className="text-3xl font-semibold tracking-tight text-[#4a2b22] sm:text-4xl">
                  {item.title}
                </h2>
                <p className="max-w-3xl text-base leading-8 text-[#4a2b22]/80">{item.excerpt}</p>
              </div>

              <div className="space-y-6 max-h-[38vh] overflow-y-auto pr-3 text-[#4a2b22]/80">
                {item.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-base leading-8">{paragraph}</p>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-full bg-[#4a2b22] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3a1a12] focus:outline-none focus:ring-2 focus:ring-[#e4b45f]/40"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
