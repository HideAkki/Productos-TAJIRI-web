import { Suspense } from 'react';
import Content from '@/components/ProductosContent';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Productos', 'Conoce el catálogo artesanal de TAJIRI: suero costeño, yogures y especialidades.', '/productos');
export default function Page() { return <Suspense fallback={<main className="p-8">Cargando...</main>}><Content /></Suspense>; }
