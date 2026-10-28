import { pageMetadata } from '@/lib/site';

const presentationUrl = 'https://www.canva.com/design/DAHYGAQSHE4/IkFY7Xt6UDaSOi2gKMvUtQ/view';
const embedUrl = `${presentationUrl}?embed`;

export const metadata = pageMetadata(
  'Portafolio',
  'Conoce el portafolio y la propuesta de Productos TAJIRI.',
  '/conocenos/portafolio',
);

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/80">Conócenos</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#4a2b22] sm:text-5xl">Nuestro portafolio</h1>
          <p className="mt-6 text-lg leading-8 text-[#4a2b22]/80">
            Descubre más sobre Productos TAJIRI, nuestra propuesta y lo que nos inspira.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#4a2b22]/10 bg-[#fff8f0] shadow-[0_24px_70px_-45px_rgba(74,43,34,0.35)]">
          <iframe
            src={embedUrl}
            title="Presentación del portafolio de Productos TAJIRI"
            className="aspect-video w-full"
            loading="lazy"
            allowFullScreen
          />
        </div>

        <p className="mt-6 text-center text-sm leading-6 text-[#4a2b22]/70">
          ¿No puedes ver la presentación?{' '}
          <a
            href={presentationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#8f1111] underline underline-offset-4 transition hover:text-[#9f1515]"
          >
            Ábrela directamente en Canva
          </a>
          .
        </p>
      </section>
    </main>
  );
}
