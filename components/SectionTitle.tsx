'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionTitle({ eyebrow, title, description, className = '' }: SectionTitleProps) {
  return (
    <motion.div variants={fadeUp} className={`space-y-4 ${className}`}>
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/80">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-[#4a2b22] sm:text-4xl md:text-5xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-[#4a2b22]/80 sm:text-base">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
