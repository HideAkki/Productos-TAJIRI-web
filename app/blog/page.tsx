import { Suspense } from 'react';
import Content from '@/components/BlogContent';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Actualidad', 'Publicaciones y novedades de Productos TAJIRI en Instagram.', '/blog');
export default function Page() { return <Suspense fallback={<main className="p-8">Cargando...</main>}><Content /></Suspense>; }
