'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { staggerContainer } from '@/lib/motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export default function AnimatedSection({ children, className = '', threshold = 0.18 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}
