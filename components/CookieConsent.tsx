'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'tajiri_cookie_consent';

export default function CookieConsent() {
  const [isAccepted, setIsAccepted] = useState<boolean>(true);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setIsAccepted(saved === 'accepted');
  }, []);

  const handleAccept = () => {
    window.localStorage.setItem(STORAGE_KEY, 'accepted');
    setIsAccepted(true);
  };

  if (isAccepted) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-[#1f3d1c]/95 px-4 py-4 text-white shadow-[0_-12px_45px_rgba(0,0,0,0.18)] sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2 text-sm leading-6 sm:space-y-0">
          <p className="font-semibold">Usamos cookies para mejorar tu experiencia.</p>
          <p className="max-w-3xl text-[#d9e8cf]">
            Acepta nuestras cookies para guardar tus preferencias y asegurar el funcionamiento correcto del sitio. Consulta nuestra <Link href="/cookies" className="font-semibold text-[#f3d48a] hover:text-white">política de cookies</Link> para más información.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAccept}
          className="inline-flex shrink-0 rounded-full bg-[#f3d48a] px-6 py-3 text-sm font-semibold text-[#1f3d1c] transition hover:bg-[#e6c35d]"
        >
          Aceptar cookies
        </button>
      </div>
    </div>
  );
}
