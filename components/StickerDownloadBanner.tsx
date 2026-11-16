'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import DialogShell from '@/components/DialogShell';

export default function StickerDownloadBanner() {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <>
      <section aria-label="Stickers de Nala para WhatsApp" className="mx-auto max-w-7xl px-4 pb-12 sm:px-8 sm:pb-16">
        <a
          href="/NALA%20-%20Productos%20TAJIRI%C2%AE.wastickers"
          download="NALA - Productos TAJIRI®.wastickers"
          onClick={() => setShowTutorial(true)}
          aria-label="Descargar el pack de stickers de Nala para WhatsApp"
          className="group block overflow-hidden rounded-2xl transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8f1111]"
        >
          <Image
            src="/¡Descarga el pack de stickers de Nala!.png"
            alt="¡Descarga el pack de stickers de Nala!"
            width={2172}
            height={724}
            sizes="(min-width: 1280px) 1216px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
            className="h-auto w-full transition group-hover:brightness-[0.98]"
          />
        </a>
      </section>

      {showTutorial && (
        <DialogShell onClose={() => setShowTutorial(false)} label="Guía para instalar los stickers de Nala en WhatsApp">
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowTutorial(false)}>
            <div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowTutorial(false)}
                aria-label="Cerrar guía de stickers"
                className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#4a2b22] shadow transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f1111]"
              >
                <X className="h-5 w-5" />
              </button>
              <Image
                src="/Tutorial_%20Stickers%20de%20Nala%20en%20WhatsApp.png"
                alt="Guía para instalar los stickers de Nala en WhatsApp"
                width={1672}
                height={941}
                sizes="(min-width: 896px) 896px, calc(100vw - 32px)"
                className="h-auto max-h-[calc(100dvh-2rem)] w-full object-contain"
                priority
              />
            </div>
          </div>
        </DialogShell>
      )}
    </>
  );
}
