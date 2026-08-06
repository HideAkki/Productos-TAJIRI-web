'use client';

import { motion } from 'framer-motion';

type FloatingDecorationProps = {
  className?: string;
  delay?: number;
  children: React.ReactNode;
};

export default function FloatingDecoration({ className, delay = 0, children }: FloatingDecorationProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: [0, -10, 0], scale: [1, 1.02, 1] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
}
