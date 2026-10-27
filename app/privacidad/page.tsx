import { pageMetadata } from '@/lib/site';
import PrivacidadContent from '@/components/PrivacidadContent';

export const metadata = pageMetadata('Privacidad', 'Cómo Productos TAJIRI trata los datos de tus consultas.', '/privacidad');

export default function PrivacidadPage() {
  return <PrivacidadContent />;
}
