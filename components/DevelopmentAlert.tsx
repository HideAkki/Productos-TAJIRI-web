'use client';

import { useEffect, useState } from 'react';

export default function DevelopmentAlert() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
      <div className="w-full max-w-xl rounded-[2rem] border border-[#e4b45f]/30 bg-white p-8 shadow-[0_40px_120px_rgba(0,0,0,0.25)]">
        <h2 className="text-2xl font-semibold text-[#4a2b22]">Aviso de desarrollo</h2>
        <p className="mt-4 text-base leading-7 text-[#4a2b22]/80">
          Esta página aún está en desarrollo, por lo que pueden aparecer pequeñas inconsistencias en el diseño o el contenido.
        </p>
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full bg-[#4a2b22] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3a1a12]"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
