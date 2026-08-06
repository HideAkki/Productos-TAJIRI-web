'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFoundContent() {
  useEffect(() => {
    document.body.classList.add('not-found-page');
    return () => {
      document.body.classList.remove('not-found-page');
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-4 py-8 text-[#2E7D32] sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(238,245,238,0.8),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,245,235,0.9),transparent_35%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-4xl flex-col items-center justify-center gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full rounded-[2.5rem] border border-[#e8e1d5] bg-[#fffdf8] p-8 shadow-[0_40px_80px_rgba(46,125,50,0.08)] sm:p-10"
        >
          <div className="absolute left-8 top-8 h-16 w-16 rounded-full bg-[#ddebd9] blur-2xl opacity-90" />
          <div className="absolute right-10 top-20 h-12 w-12 rounded-full bg-[#f7ecda] blur-2xl opacity-80" />
          <div className="absolute left-1/2 top-8 h-10 w-10 -translate-x-1/2 rounded-full bg-[#fff6e8] blur-2xl opacity-90" />

          <div className="space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
              className="mx-auto flex h-32 w-32 items-center justify-center rounded-[2rem] bg-[#eaf5ea] shadow-[0_15px_30px_rgba(46,125,50,0.08)]"
            >
              <span className="text-[4rem] font-semibold tracking-[-0.03em] text-[#2E7D32]">404</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-[#2E7D32]/70">Página no disponible</p>
              <h1 className="text-4xl font-semibold leading-tight text-[#2E7D32] sm:text-5xl">
                ¡Ups! Esta página se perdió.
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-8 text-[#4f6f49] sm:text-lg">
                Parece que este camino no lleva a ningún lugar. Regresa al inicio o descubre nuestros productos artesanales.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-[#2E7D32] px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#24682a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8fcf8c]"
              >
                Ir al inicio
              </Link>
              <Link
                href="/productos"
                className="inline-flex items-center justify-center rounded-full border border-[#d8d1be] bg-white px-8 py-4 text-sm font-semibold text-[#2E7D32] transition hover:-translate-y-0.5 hover:border-[#2E7D32] hover:bg-[#eef7ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a0d8a0]"
              >
                Ver productos
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.5 }}
          className="flex justify-center"
        >
          <Image
            src="/bufalo.png"
            width={260}
            height={160}
            alt="Búfalo Tajiri"
            className="h-auto w-auto rounded-[2rem] object-cover shadow-[0_20px_40px_rgba(46,125,50,0.12)]"
          />
        </motion.div>
      </div>
    </main>
  );
}
