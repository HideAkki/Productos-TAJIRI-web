'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, X } from 'lucide-react';

const TikTokIcon = () => (
  <svg viewBox="0 0 256 276" fill="currentColor" className="h-5 w-5">
    <path d="M198.5 0h-31.4a71.9 71.9 0 0 1-1.5 18.7 70.2 70.2 0 0 1-40.8 44.2c-23.2 9.1-48.5 6.5-69.9-7.2C44 46.1 32.5 25.8 32 3.7H0c.5 31.4 16.6 59.5 42.8 74.2 24.9 13.7 55.8 15 82.3 3.5v104.1c0 24.2-11 46.7-30.9 62.1-21.2 16-48.7 20.7-74.4 12.2-22.1-7.4-39.9-24.8-48.6-47.4-.9-2.4-.5-5.2 1.1-7.1 1.6-1.9 4.2-2.9 6.8-2.5 1.2.2 2.3.8 3.3 1.4 15.1 9.4 33.5 11.8 50.7 7.2 14.4-3.8 26.8-13.3 34.2-26.1 7.8-13.4 9.3-28.9 4.3-43.4H42.9c-3.4 0-6.2-2.8-6.2-6.2V52.8c0-3.4 2.8-6.2 6.2-6.2h92.7c2.8 0 5.2 1.8 6 4.5 3 10.6 11.8 19.1 22.8 21.2a37.7 37.7 0 0 0 11.6 0c.9-.2 1.7-.5 2.6-.8V198c0 34.2-22 63.4-53.4 73.7-13.9 4.6-28.6 4.7-42.6.4-25.9-8.4-45.9-29.6-53.2-55.2-1-3.6.9-7.3 4.5-8.4 3.6-1 7.3.9 8.4 4.5 5.7 19.8 19.4 36.3 37.4 45.5 12.9 6.7 27.8 8.1 41.7 3.9 26.1-8.7 44.7-33.2 44.7-61.9V111.6c4.9 2.7 10.4 4.3 16.2 4.5 3.8.1 7.6-.3 11.3-1.3V0Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-[#4a2b22]/10 bg-[#fff8f0] px-4 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3">
            <Image src="/logo-tajiri.png" alt="Logo TAJIRI" width={56} height={56} className="object-contain" />
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#4a2b22]/80">
            Productos TAJIRI® 
          </p>
          <div className="flex flex-wrap items-center gap-3 text-slate-300 sm:gap-4">
            <Link href="https://www.facebook.com/profile.php?id=61575655058662" target="_blank" rel="noreferrer" className="transition hover:text-amber-200"><Facebook className="h-5 w-5" /></Link>
            <Link href="https://www.instagram.com/productos___tajiri_/" target="_blank" rel="noreferrer" className="transition hover:text-amber-200"><Instagram className="h-5 w-5" /></Link>
            <Link href="https://x.com/IsnelUseda" target="_blank" rel="noreferrer" className="transition hover:text-amber-200"><X className="h-5 w-5" /></Link>
            <Link href="https://www.linkedin.com/in/isnel-useda-d%C3%ADaz-a5506b44/" target="_blank" rel="noreferrer" className="transition hover:text-amber-200"><Linkedin className="h-5 w-5" /></Link>
            <Link href="https://www.tiktok.com/@productos_tajiri" target="_blank" rel="noreferrer" className="transition hover:text-amber-200"><TikTokIcon /></Link>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/80">Enlaces rápidos</p>
            <ul className="space-y-3 text-sm text-[#4a2b22]/80">
              <li><Link href="/" className="transition hover:text-[#8f1111]">Inicio</Link></li>
              <li><Link href="/conocenos/nuestra-historia" className="transition hover:text-[#8f1111]">Conócenos</Link></li>
              <li><Link href="/productos" className="transition hover:text-[#8f1111]">Productos</Link></li>
              <li><Link href="/blog" className="transition hover:text-[#8f1111]">Blog</Link></li>
              <li><Link href="/contacto" className="transition hover:text-[#8f1111]">Contacto</Link></li>
              <li><Link href="/privacidad" className="transition hover:text-[#8f1111]">Privacidad</Link></li>
              <li><Link href="/cookies" className="transition hover:text-[#8f1111]">Cookies</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/80">Contacto</p>
            <div className="space-y-3 text-sm text-[#4a2b22]/80">
              <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> <span>Calle 104 #23-21, Provenza, Bucaramanga, Colombia</span></div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> <span>+57 313 3761781</span></div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> <span>isusedia@gmail.com</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500 sm:mt-12">
        © {new Date().getFullYear()} Productos TAJIRI®. Todos los derechos reservados.
      </div>
    </footer>
  );
}
