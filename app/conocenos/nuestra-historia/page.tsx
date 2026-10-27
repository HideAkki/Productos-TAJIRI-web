import { Suspense } from 'react';
import Content from '@/components/NuestraHistoriaContent';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Nuestra historia', 'Descubre los orígenes, la familia y la evolución de Productos TAJIRI.', '/conocenos/nuestra-historia');
export default function Page() { return <Suspense fallback={<main className="p-8">Cargando...</main>}><Content /></Suspense>; }
