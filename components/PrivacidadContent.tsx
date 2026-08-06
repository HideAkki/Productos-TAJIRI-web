'use client';

import SectionTitle from '@/components/SectionTitle';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

export default function PrivacidadContent() {
  return (
    <main className="relative overflow-hidden px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <SectionTitle
            eyebrow="Privacidad"
            title="Política de privacidad y tratamiento de datos"
            description="Protegemos tu información con compromiso y transparencia en cada proceso."
          />
          <div className="mt-10 rounded-[2rem] border border-[#4a2b22]/10 bg-white/95 p-8 shadow-[0_40px_90px_-65px_rgba(74,43,34,0.12)]">
            <section className="space-y-8 text-[#4a2b22]">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Recopilación de datos</h2>
                <p className="leading-8 text-[#4a2b22]/85">
                  Recopilamos únicamente la información que tú nos proporcionas de forma voluntaria, como nombre, correo electrónico y mensaje cuando usas el formulario de contacto.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Uso de la información</h2>
                <p className="leading-8 text-[#4a2b22]/85">
                  Usamos tus datos para responder a tus consultas, coordinar pedidos o brindarte información sobre nuestros productos y servicios.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Tratamiento y conservación</h2>
                <p className="leading-8 text-[#4a2b22]/85">
                  Conservamos tus datos solo mientras sean necesarios para atender tu solicitud o cumplir con obligaciones legales. No compartimos tu información con terceros sin tu consentimiento explícito.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Derechos de los usuarios</h2>
                <p className="leading-8 text-[#4a2b22]/85">
                  Tienes derecho a acceder, rectificar, eliminar o solicitar limitación del uso de tus datos. Si deseas ejercer alguno de estos derechos, contáctanos a través de <strong>isusedia@gmail.com</strong>.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Seguridad</h2>
                <p className="leading-8 text-[#4a2b22]/85">
                  Adoptamos medidas razonables para proteger tus datos contra accesos no autorizados, pérdida o alteración. Sin embargo, ningún método de transmisión por Internet es completamente seguro.
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
