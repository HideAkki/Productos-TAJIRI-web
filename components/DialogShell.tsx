'use client';
import { useEffect, useRef, type ReactNode } from 'react';

// El diálogo nativo mantiene el foco dentro, hace inerte el fondo y admite Escape.
export default function DialogShell({ children, onClose, label }: {
  children: ReactNode; onClose: () => void; label: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    dialog?.querySelector<HTMLElement>('button, a[href], input, textarea, [tabindex]')?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  return (
    <dialog ref={ref} aria-label={label} onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const elements = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])')]
        .filter(element => element.getClientRects().length > 0 && !element.closest('[hidden]'));
      const first = elements[0]; const last = elements[elements.length - 1];
      if (!first) { event.preventDefault(); event.currentTarget.focus(); return; }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }} onCancel={(event) => { event.preventDefault(); onClose(); }}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-inherit backdrop:bg-black/60">
      {children}
    </dialog>
  );
}
