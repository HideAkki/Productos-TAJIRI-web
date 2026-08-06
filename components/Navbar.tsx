'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeDown } from '@/lib/motion';
import { ChevronDown, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/productos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
];

const conocenosSubmenu = [
  { label: 'Nuestra Historia', href: '/conocenos/nuestra-historia' },
  { label: 'Galería', href: '/conocenos/galeria' },
];

export default function Navbar() {
  const [isConocenosOpen, setIsConocenosOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileConocenosOpen, setIsMobileConocenosOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsConocenosOpen(false);
    setIsMobileConocenosOpen(false);
  }, [pathname]);

  return (
    <motion.header
      variants={fadeDown}
      initial="hidden"
      animate="show"
      className="sticky top-0 z-50 border-b border-[#4a2b22]/10 bg-white/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-8 sm:py-4">
        <Link href="/" className="group inline-flex items-center gap-3">
          <Image src="/logo-tajiri.png" alt="Logo TAJIRI" width={72} height={72} className="h-12 w-12 object-contain sm:h-16 sm:w-16" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className="group text-sm font-medium text-[#4a2b22] transition duration-300 hover:text-[#8f1111]"
          >
            <span className="relative inline-flex items-center gap-2 after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-[#e4b45f] after:transition-all after:duration-300 group-hover:after:w-full">
              Inicio
            </span>
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsConocenosOpen(true)}
            onMouseLeave={() => setIsConocenosOpen(false)}
          >
            <button className="group flex items-center gap-1 text-sm font-medium text-[#4a2b22] transition duration-300 hover:text-[#8f1111]">
              <span className="relative inline-flex items-center gap-1 after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-[#e4b45f] after:transition-all after:duration-300 group-hover:after:w-full">
                Conócenos
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${isConocenosOpen ? 'rotate-180' : ''}`}
                />
              </span>
            </button>

            {isConocenosOpen && (
              <>
                <div className="absolute top-full left-0 w-48 h-2" />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 pt-2 w-48"
                >
                  <div className="rounded-[1.5rem] border border-[#4a2b22]/10 bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl">
                    <div className="space-y-1 p-2">
                      {conocenosSubmenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-[1rem] px-4 py-3 text-sm font-medium text-[#4a2b22] transition hover:bg-[#f3d48a]/20 hover:text-[#8f1111]"
                          onClick={() => setIsConocenosOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>

          {navItems.filter((item) => item.label !== 'Inicio').map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group text-sm font-medium text-[#4a2b22] transition duration-300 hover:text-[#8f1111]"
            >
              <span className="relative inline-flex items-center gap-2 after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-[#e4b45f] after:transition-all after:duration-300 group-hover:after:w-full">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#4a2b22]/10 bg-white text-[#4a2b22] transition hover:bg-[#f3f1ea] sm:h-12 sm:w-12"
          >
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
          <Link
            href="/productos"
            className="inline-flex items-center rounded-full bg-amber-200 px-3.5 py-2.5 text-sm font-semibold text-[#4a2b22] transition hover:-translate-y-0.5 hover:bg-amber-100 sm:px-4 sm:py-3"
          >
            Productos
          </Link>
        </div>

        <div className="hidden lg:inline-flex">
          <Link
            href="/productos"
            className="inline-flex items-center rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-[#4a2b22] transition hover:-translate-y-0.5 hover:bg-amber-100"
          >
            Ver Productos
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#4a2b22]/10 bg-white/95 lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 pb-6 pt-4 sm:px-8">
              <div className="space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-[1.5rem] px-4 py-3 text-sm font-medium text-[#4a2b22] transition hover:bg-[#f3d48a]/10 hover:text-[#8f1111]"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="rounded-[1.5rem] border border-[#4a2b22]/10 bg-[#fff8f0] px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setIsMobileConocenosOpen((current) => !current)}
                    className="flex w-full items-center justify-between text-sm font-medium text-[#4a2b22]"
                  >
                    <span>Conócenos</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMobileConocenosOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isMobileConocenosOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 overflow-hidden"
                      >
                        <div className="space-y-2">
                          {conocenosSubmenu.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block rounded-[1rem] px-4 py-3 text-sm font-medium text-[#4a2b22] transition hover:bg-[#f3d48a]/20 hover:text-[#8f1111]"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
