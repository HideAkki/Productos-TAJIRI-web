'use client';

import SectionTitle from '@/components/SectionTitle';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { useState, type FormEvent } from 'react';

export default function ContactoPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value: string) => {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Por favor completa todos los campos antes de enviar.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor ingresa un correo válido.');
      return;
    }

    const subject = encodeURIComponent('Contacto desde Productos TAJIRI');
    const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\n${message}`);
    window.location.href = `mailto:isusedia@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="relative overflow-hidden px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <SectionTitle
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
                <div className="space-y-4 text-sm text-slate-300">
                  <div>
                    <p className="font-semibold text-white">Correo</p>
                    <p>isusedia@gmail.com</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Teléfono</p>
                    <p>+57 313 3761781</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Ubicación</p>
                    <p>Calle 104 #23-21, Provenza, Bucaramanga, Colombia</p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.75rem] bg-[#fff8f0] p-6 shadow-[0_20px_60px_-30px_rgba(74,43,34,0.08)]">
                <label className="block text-sm font-medium text-[#4a2b22]">Nombre</label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-3xl border border-[#4a2b22]/10 bg-white px-4 py-3 text-sm text-[#4a2b22] outline-none transition focus:border-[#e4b45f]/70"
                  placeholder="Tu nombre"
                />
                <label className="block text-sm font-medium text-[#4a2b22]">Correo</label>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-3xl border border-[#4a2b22]/10 bg-white px-4 py-3 text-sm text-[#4a2b22] outline-none transition focus:border-[#e4b45f]/70"
                  placeholder="hola@ejemplo.com"
                  type="email"
                />
                <label className="block text-sm font-medium text-[#4a2b22]">Mensaje</label>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={5}
                  className="w-full rounded-3xl border border-[#4a2b22]/10 bg-white px-4 py-3 text-sm text-[#4a2b22] outline-none transition focus:border-[#e4b45f]/70"
                  placeholder="Cuéntanos qué necesitas"
                />
                {error ? (
                  <p className="rounded-3xl border border-[#f8d7da] bg-[#fff1f2] px-4 py-3 text-sm text-[#9f1f2c]">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#8f1111] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#9f1515]"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
