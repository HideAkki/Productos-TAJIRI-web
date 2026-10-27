import { pageMetadata } from '@/lib/site';
import CookiePolicyContent from '@/components/CookiePolicyContent';

export const metadata = pageMetadata('Cookies y almacenamiento local', 'Información sobre el almacenamiento de preferencias en Productos TAJIRI.', '/cookies');

export default function CookiePolicyPage() {
  return <CookiePolicyContent />;
}
