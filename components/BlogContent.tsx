import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Instagram } from 'lucide-react';
import SocialFeed from '@/components/SocialFeed';
import { INSTAGRAM_HANDLE, INSTAGRAM_PROFILE } from '@/lib/instagram-feed';

export default function BlogContent() {
  return (
    <main className="relative bg-[#fff8f0] pb-20">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-16">
        <div className="grid items-center gap-8 rounded-[2rem] border border-[#4a2b22]/10 bg-[#f5eadb] p-6 sm:rounded-[2.5rem] sm:p-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16 lg:p-14">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#8f1111]"><span className="h-px w-8 bg-[#8f1111]" />El diario de TAJIRI</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight text-[#4a2b22] sm:text-5xl lg:text-6xl">Historias que<br className="hidden sm:block" /> saben a casa.</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#4a2b22]/80 sm:text-base sm:leading-8">Nuevos sabores, ideas para tu mesa y pequeños momentos detrás de nuestros productos. Todo lo que compartimos, en un solo lugar.</p>
            <a href="#publicaciones" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#8f1111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6f0d0d]">Explorar publicaciones <ArrowDown className="h-4 w-4" aria-hidden="true" /></a>
          </div>
          <aside aria-label="Nuestra comunidad en Instagram" className="relative overflow-hidden rounded-[1.75rem] bg-[#4a2b22] p-5 text-[#fff8f0] sm:p-8">
            <Instagram className="absolute -right-5 -top-5 h-40 w-40 rotate-12 text-white/5" aria-hidden="true" />
            <div className="relative flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#fff8f0] p-2"><Image src="/logo-tajiri.webp" alt="TAJIRI" width={48} height={48} /></div>
              <div><p className="hidden text-xs uppercase tracking-[0.2em] text-[#f3d48a] lg:block">Nos encontramos en</p><p className="mt-1 text-xl font-semibold">Instagram</p><a href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-[#f3d48a] underline lg:hidden">Visitar nuestro perfil <ArrowUpRight className="h-3 w-3" aria-hidden="true" /></a></div>
            </div>
            <p className="relative mt-4 break-words text-sm font-medium text-[#f3d48a] lg:mt-7">{INSTAGRAM_HANDLE}</p>
            <p className="relative mt-3 hidden text-sm leading-7 text-white/80 lg:block">Acompáñanos en la cocina, conoce nuestras novedades y comparte tus momentos con TAJIRI.</p>
            <a href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer" className="relative mt-6 hidden items-center gap-2 border-b border-[#f3d48a]/50 pb-1 text-sm font-semibold text-[#fff8f0] hover:text-[#f3d48a] lg:inline-flex">Visitar nuestro perfil <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          </aside>
        </div>
      </section>
      <section id="publicaciones" aria-labelledby="publicaciones-title" className="mx-auto max-w-7xl scroll-mt-32 px-4 sm:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8f1111]">De nuestra comunidad</p><h2 id="publicaciones-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Lo último que compartimos</h2></div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4a2b22]/15 px-4 py-2 text-xs font-medium"><Instagram className="h-4 w-4" aria-hidden="true" /> Publicaciones de Instagram</span>
        </div>
        <SocialFeed showFilters />
      </section>
      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col gap-5 rounded-3xl border border-[#4a2b22]/10 bg-white p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div><h2 className="text-xl font-semibold">¿Se te antojó algo?</h2><p className="mt-2 text-sm leading-6 text-[#4a2b22]/75">Conoce nuestras presentaciones y encuentra tu próximo favorito.</p></div>
          <Link href="/productos" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#4a2b22] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6a3b2f]">Conocer los productos <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
