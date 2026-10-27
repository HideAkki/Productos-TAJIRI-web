import { Suspense } from 'react';
import Content from '@/components/ContactoContent';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Contacto', 'Consulta productos, presentaciones y pedidos de Productos TAJIRI en Bucaramanga.', '/contacto');
export default function Page() { return <Suspense fallback={<main className="p-8">Cargando...</main>}><Content /></Suspense>; }
