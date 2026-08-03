'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

export interface TimelineItem {
  year: string;
  title: string;
  excerpt: string;
  description: string;
  image: string;
  caption: string;
}

interface TimelineCardProps {
  item: TimelineItem;
  onOpen: () => void;
}

export default function TimelineCard({ item, onOpen }: TimelineCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 210, damping: 18 }}
      className="group relative w-full max-w-full overflow-hidden rounded-[2rem] border border-[#e4b45f]/15 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-[#e4b45f]/30"
    >
      <div className="grid gap-6 p-6 sm:grid-cols-[0.55fr_0.45fr] sm:items-center sm:p-8">
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-5xl font-semibold tracking-[-0.03em] text-[#4a2b22] sm:text-6xl">{item.year}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.35em] text-[#4a2b22]/60">{item.caption}</p>
              </div>
              <div className="hidden h-14 w-14 rounded-full border border-[#e4b45f]/20 bg-[#fff7ee] shadow-sm sm:block" />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-[#4a2b22]">{item.title}</h3>
            <p className="max-w-xl text-base leading-7 text-[#4a2b22]/75">{item.excerpt}</p>
          </div>

          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-3 rounded-full border border-[#e4b45f]/30 bg-[#e4b45f]/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#4a2b22] transition duration-200 hover:bg-[#e4b45f]/20 focus:outline-none focus:ring-2 focus:ring-[#e4b45f]/40"
          >
            Conocer este capítulo →
          </button>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-[#f3d48a]/15 bg-[#fdf7ef] shadow-inner">
          <div className="relative h-64 w-full sm:h-72">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#f7f1e8] text-center text-sm uppercase tracking-[0.3em] text-[#4a2b22]/60">
                Imagen por definir
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
