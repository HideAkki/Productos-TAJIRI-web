import SectionTitle from './SectionTitle';
import SocialFeed from './SocialFeed';
export default function BlogPreview() {
  return <section className="mx-auto mb-16 max-w-7xl px-4 sm:mb-24 sm:px-8">
    <SectionTitle eyebrow="Actualidad" title="Lo último de TAJIRI" description="Novedades e historias de nuestra marca en Instagram." />
    <div className="mt-8"><SocialFeed limit={4} /></div>
  </section>;
}
