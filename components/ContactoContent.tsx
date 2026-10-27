'use client';

import { useSearchParams } from 'next/navigation';
import SectionTitle from '@/components/SectionTitle';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { useEffect, useRef, useState, type FormEvent } from 'react';

export default function ContactoPage() {
  const searchParams = useSearchParams();
  const requestRef = useRef<{ payload: string; id: string } | null>(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const [website, setWebsite] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const product = searchParams.get('producto');
    const variant = searchParams.get('presentacion');
    if (product) setMessage(`Hola, quisiera consultar por ${product.slice(0, 100)}${variant ? `, presentación ${variant.slice(0, 50)}` : ''}.`);
  }, [searchParams]);

  const validateEmail = (value: string) => {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setError('');
    setSuccess('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Por favor completa todos los campos antes de enviar.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor ingresa un correo válido.');
      return;
    }

    setSending(true);
    const payload = JSON.stringify({ name, email, message, website });
    if (requestRef.current?.payload !== payload) requestRef.current = { payload, id: crypto.randomUUID() };
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website, requestId: requestRef.current.id }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'No pudimos enviar tu mensaje.');
      setSuccess(result.message);
      setName(''); setEmail(''); setMessage(''); requestRef.current = null;
    } catch (error) {
      setError(error instanceof Error && error.name !== 'TimeoutError' ? error.message : 'No pudimos confirmar el envío. Inténtalo de nuevo o escríbenos directamente.');
    } finally { setSending(false); }

  };

  return (
    <main className="relative overflow-hidden px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <SectionTitle
            as="h1"
            eyebrow="Contacto"
            title="Escríbenos y descubre cómo llevar TAJIRI a tu mesa"
            description="Si tienes preguntas, pedidos especiales o quieres conocer nuestros productos, estamos listos para ayudarte."
          />
          <div className="mt-10 rounded-[2rem] border border-[#4a2b22]/10 bg-white/95 p-8 shadow-[0_40px_90px_-65px_rgba(74,43,34,0.12)]">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/80">Ponte en contacto</p>
                <p className="text-lg leading-8 text-[#4a2b22]/80">
                  Estamos encantados de ayudarte a encontrar el producto perfecto, resolver dudas o compartir más sobre nuestra producción artesanal.
                </p>
                <div className="space-y-4 text-sm text-[#4a2b22]/85">
                  <div>
                    <p className="font-semibold text-[#4a2b22]">Correo</p>
                    <a href="mailto:isusedia@gmail.com" className="underline">isusedia@gmail.com</a>
                  </div>
                  <div>
                    <p className="font-semibold text-[#4a2b22]">Teléfono</p>
                    <a href="tel:+573133761781" className="underline">+57 313 3761781</a>
                  </div>
                  <div>
                    <p className="font-semibold text-[#4a2b22]">Ubicación</p>
                    <p>Calle 104 #23-21, Provenza, Bucaramanga, Colombia</p>
                  </div>
                </div>
              </div>
              <form aria-busy={sending} onSubmit={handleSubmit} className="space-y-4 rounded-[1.75rem] bg-[#fff8f0] p-6 shadow-[0_20px_60px_-30px_rgba(74,43,34,0.08)]">
                <label htmlFor="contact-name" className="block text-sm font-medium text-[#4a2b22]">Nombre</label>
                <input
                  id="contact-name" name="name" autoComplete="name" disabled={sending} required maxLength={100}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-3xl border border-[#4a2b22]/10 bg-white px-4 py-3 text-sm text-[#4a2b22] outline-none transition focus:border-[#e4b45f]/70"
                  placeholder="Tu nombre"
                />
                <label htmlFor="contact-email" className="block text-sm font-medium text-[#4a2b22]">Correo</label>
                <input
                  id="contact-email" name="email" autoComplete="email" disabled={sending} required maxLength={254}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-3xl border border-[#4a2b22]/10 bg-white px-4 py-3 text-sm text-[#4a2b22] outline-none transition focus:border-[#e4b45f]/70"
                  placeholder="hola@ejemplo.com"
                  type="email"
                />
                <label htmlFor="contact-message" className="block text-sm font-medium text-[#4a2b22]">Mensaje</label>
                <textarea
                  id="contact-message" name="message" disabled={sending} required maxLength={4000}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={5}
                  className="w-full rounded-3xl border border-[#4a2b22]/10 bg-white px-4 py-3 text-sm text-[#4a2b22] outline-none transition focus:border-[#e4b45f]/70"
                  placeholder="Cuéntanos qué necesitas"
                />
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Sitio web</label>
                  <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} />
                </div>
                <p className="text-sm">Usaremos tus datos para responder esta consulta. Consulta la <a className="underline" href="/privacidad">política de privacidad</a>.</p>
                {success && <p role="status" className="rounded-xl bg-green-50 p-4 text-green-900">{success}</p>}
                {error ? (
                  <p role="alert" className="rounded-3xl border border-[#f8d7da] bg-[#fff1f2] px-4 py-3 text-sm text-[#9f1f2c]">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit" disabled={sending}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#8f1111] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60 transition hover:-translate-y-0.5 hover:bg-[#9f1515]"
                >
                  {sending ? 'Enviando…' : 'Enviar mensaje'}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
