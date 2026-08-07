'use client';

import { useEffect, useState } from 'react';

export default function DevelopmentAlert() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dismissed = window.localStorage.getItem('developmentAlertDismissed') === 'true';
    if (!dismissed) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('developmentAlertDismissed', 'true');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        role="status"
        className="w-full max-w-xl rounded-[2rem] border border-[#e4b45f]/30 bg-white/95 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl"
      >
        <h2 className="text-2xl font-semibold text-[#4a2b22]">Aviso de desarrollo</h2>
        <p className="mt-4 text-base leading-7 text-[#4a2b22]/80">
          Esta página aún está en desarrollo, por lo que pueden aparecer pequeñas inconsistencias en el diseño o el contenido.
        </p>
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full bg-[#4a2b22] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3a1a12]"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
