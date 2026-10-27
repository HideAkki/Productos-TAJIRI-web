'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
const STORAGE_KEY = 'tajiri_cookie_consent';
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const check = () => {
      try { setVisible(window.localStorage.getItem(STORAGE_KEY) !== 'accepted'); }
      catch { setVisible(true); }
    };
    check();
    window.addEventListener('tajiri:preferences-reset', check);
    return () => window.removeEventListener('tajiri:preferences-reset', check);
  }, []);
  const dismiss = (remember: boolean) => {
    if (remember) { try { window.localStorage.setItem(STORAGE_KEY, 'accepted'); } catch { /* La navegación continúa sin almacenamiento. */ } }
    setVisible(false);
  };
  if (!visible) return null;
  return <aside aria-label="Preferencias de privacidad" className="cookie-notice fixed inset-x-0 bottom-0 z-40 bg-[#1f3d1c] px-4 py-4 text-white shadow-xl sm:px-6">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-3xl text-sm leading-6">Este sitio no incorpora cookies de publicidad ni analítica. Si lo eliges, guardaremos en este navegador que cerraste este aviso. <Link href="/cookies" className="font-semibold text-[#f3d48a] underline">Más información</Link>.</p>
      <div className="flex shrink-0 flex-wrap gap-3">
        <button type="button" onClick={() => dismiss(false)} className="rounded-full border border-white px-4 py-2 text-sm">Cerrar sin guardar</button>
        <button type="button" onClick={() => dismiss(true)} className="rounded-full bg-[#f3d48a] px-4 py-2 text-sm font-semibold text-[#1f3d1c]">Recordar mi elección</button>
      </div>
    </div>
  </aside>;
}
