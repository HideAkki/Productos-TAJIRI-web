'use client';

import SectionTitle from '@/components/SectionTitle';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

export default function CookiePolicyContent() {
  return (
    <main className="relative overflow-hidden px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <SectionTitle
            eyebrow="Cookies"
            title="Política de cookies"
            description="Entiende cómo usamos cookies y cómo aceptarlas para mejorar tu experiencia." 
          />
          <div className="mt-10 rounded-[2rem] border border-[#4a2b22]/10 bg-white/95 p-8 shadow-[0_40px_90px_-65px_rgba(74,43,34,0.12)]">
            <section className="space-y-8 text-[#4a2b22]">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">¿Qué son las cookies?</h2>
                <p className="leading-8 text-[#4a2b22]/85">
                  Las cookies son pequeños archivos que se almacenan en tu navegador para recordar preferencias y mejorar la navegación en el sitio.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">¿Para qué las usamos?</h2>
                <p className="leading-8 text-[#4a2b22]/85">
                  Utilizamos cookies para guardar tu consentimiento, permitir funciones de navegación y ofrecer una experiencia más fluida y personalizada.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Consentimiento</h2>
                <p className="leading-8 text-[#4a2b22]/85">
                  Al aceptar el banner de cookies, permites que guardemos tu preferencia para que no se vuelva a mostrar en futuras visitas.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Gestión de cookies</h2>
                <p className="leading-8 text-[#4a2b22]/85">
                  Puedes borrar las cookies desde tu navegador en cualquier momento. Si eliminas las cookies, es posible que debas aceptar nuevamente la política la próxima vez que visites el sitio.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Más información</h2>
                <p className="leading-8 text-[#4a2b22]/85">
                  Si tienes dudas sobre privacidad o cookies, contáctanos en <strong>isusedia@gmail.com</strong> para recibir asistencia.
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
