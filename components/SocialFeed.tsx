'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Images, Instagram, Play, RefreshCw, Search, X } from 'lucide-react';
import { INSTAGRAM_HANDLE, INSTAGRAM_PROFILE, type SocialPost } from '@/lib/instagram-feed';

type Filter = 'all' | SocialPost['mediaType'];
const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Todas' }, { value: 'IMAGE', label: 'Fotos' },
  { value: 'VIDEO', label: 'Vídeos' }, { value: 'CAROUSEL_ALBUM', label: 'Carruseles' },
];
function PostImage({ post }: { post: SocialPost }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => { if (ref.current?.complete && ref.current.naturalWidth === 0) setFailed(true); }, [post.image]);
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[#eee2d3]">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#f3d48a]/25 to-[#4a2b22]/10 text-[#4a2b22]/70"><Instagram className="h-9 w-9" aria-hidden="true" /><span className="text-xs font-medium">Un momento de TAJIRI</span></div>
      {/* Las URLs de Instagram usan un CDN variable y firmado. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {post.image && !failed && <img ref={ref} src={post.image} alt="" loading="lazy" decoding="async" className="relative h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" onError={() => setFailed(true)} />}
      {post.mediaType === 'VIDEO' && <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white"><Play className="h-3.5 w-3.5" aria-hidden="true" fill="currentColor" />Vídeo</span>}
      {post.mediaType === 'CAROUSEL_ALBUM' && <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white"><Images className="h-3.5 w-3.5" aria-hidden="true" />Carrusel</span>}
    </div>
  );
}
function PostCard({ post }: { post: SocialPost }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article aria-label={`Publicación de ${post.author} · ${post.date}`} className="group flex min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-[#4a2b22]/10 bg-white shadow-[0_8px_35px_-25px_rgba(74,43,34,0.3)] transition hover:border-[#4a2b22]/25 hover:shadow-[0_15px_40px_-25px_rgba(74,43,34,0.4)]">
      <a href={post.link} target="_blank" rel="noreferrer" aria-label={`Ver publicación de ${post.date} en Instagram`}><PostImage post={post} /></a>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-2 text-xs text-[#4a2b22]/65"><span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#8f1111]" />TAJIRI · Instagram</span><time dateTime={post.publishedAt || undefined}>{post.date}</time></div>
        <p className={`whitespace-pre-line break-words text-sm leading-7 text-[#4a2b22]/90 ${expanded ? '' : 'line-clamp-3'}`}>{post.text}</p>
        {(post.text.length > 150 || post.text.split('\n').length > 3) && <button type="button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)} className="mt-2 self-start text-xs font-semibold text-[#8f1111] underline decoration-[#8f1111]/25 underline-offset-4">{expanded ? 'Leer menos' : 'Leer más'}</button>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6"><span className="min-w-0 truncate text-xs text-[#4a2b22]/65">{post.author}</span><a href={post.link} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#8f1111] hover:underline">Ver en Instagram<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></div>
      </div>
    </article>
  );
}
export default function SocialFeed({ limit, showFilters = false }: { limit?: number; showFilters?: boolean }) {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [configurationRequired, setConfigurationRequired] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    let active = true;
    setLoading(true); setFailed(false); setConfigurationRequired(false);
    async function load() {
      try {
        const response = await fetch('/api/social-feed', { signal: controller.signal });
        const data = await response.json();
        if (!response.ok) { if (active) setConfigurationRequired(data.configurationRequired === true); throw new Error('unavailable'); }
        if (!Array.isArray(data.posts)) throw new Error('format');
        if (active) { setPosts(data.posts); setVisibleCount(9); }
      } catch { if (active) setFailed(true); }
      finally { window.clearTimeout(timeout); if (active) setLoading(false); }
    }
    void load();
    return () => { active = false; window.clearTimeout(timeout); controller.abort(); };
  }, [attempt]);
  const gridClass = limit ? 'grid gap-6 sm:grid-cols-2 xl:grid-cols-4' : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3';
  if (loading) return (
    <div aria-busy="true"><p role="status" className="sr-only">Cargando publicaciones…</p><div className={gridClass} aria-hidden="true">{Array.from({ length: limit || 6 }, (_, index) => <div key={index} className="overflow-hidden rounded-3xl border border-[#4a2b22]/10 bg-white"><div className="aspect-[4/3] animate-pulse bg-[#eee2d3]" /><div className="space-y-4 p-6"><div className="h-3 w-1/3 rounded-full bg-[#f5efe7]" /><div className="h-3 rounded-full bg-[#f5efe7]" /><div className="h-3 w-2/3 rounded-full bg-[#f5efe7]" /></div></div>)}</div></div>
  );
  if (failed || !posts.length) return (
    <div>
      <div role="status" className="flex flex-col items-center gap-6 rounded-[1.75rem] border border-[#4a2b22]/10 bg-white px-6 py-10 text-center sm:px-10 sm:py-14">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5eadb] text-[#8f1111]"><Instagram className="h-7 w-7" aria-hidden="true" /></span>
        <div className="max-w-md"><h3 className="text-xl font-semibold">Nos vemos en Instagram</h3><p className="mt-3 text-sm leading-7 text-[#4a2b22]/75">{failed ? 'No pudimos cargar las publicaciones aquí en este momento. Puedes seguir nuestras novedades directamente en Instagram.' : 'Todavía no hay publicaciones disponibles aquí. Visita nuestro perfil para conocer las novedades de TAJIRI.'}</p></div>
        <div className="flex flex-wrap justify-center gap-3"><a className="inline-flex items-center gap-2 rounded-full bg-[#8f1111] px-5 py-3 text-sm font-semibold text-white hover:bg-[#6f0d0d]" href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer">Visitar Instagram <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>{failed && <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#4a2b22]/20 px-5 py-3 text-sm font-medium hover:bg-[#fff8f0]" onClick={() => setAttempt(value => value + 1)}><RefreshCw className="h-4 w-4" aria-hidden="true" />Reintentar</button>}</div>
        <span className="text-xs text-[#4a2b22]/65">{INSTAGRAM_HANDLE}</span>
      </div>
      {showFilters && process.env.NODE_ENV === 'development' && configurationRequired && <aside aria-label="Configuración local de Instagram" className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950"><h3 className="font-semibold">Conexión de Instagram pendiente en local</h3><p>Completa <code>INSTAGRAM_ACCESS_TOKEN</code> en <code>.env.local</code> con el token de tu cuenta profesional. Si utilizas Facebook Login, configura también <code>INSTAGRAM_LOGIN_TYPE=facebook</code> e <code>INSTAGRAM_USER_ID</code>. Reinicia <code>npm run dev</code> después de guardar los valores.</p></aside>}
    </div>
  );
  const normalizedQuery = query.trim().toLocaleLowerCase('es');
  const matchingPosts = posts.filter(post => (!showFilters || filter === 'all' || post.mediaType === filter) && (!showFilters || !normalizedQuery || post.text.toLocaleLowerCase('es').includes(normalizedQuery)));
  const visiblePosts = matchingPosts.slice(0, limit ?? visibleCount);
  return (
    <div>
      {showFilters && <div className="mb-6 flex flex-col gap-5 rounded-2xl border border-[#4a2b22]/10 bg-white p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filtrar publicaciones" className="flex flex-wrap gap-2">{filters.map(item => <button key={item.value} type="button" aria-pressed={filter === item.value} onClick={() => { setFilter(item.value); setVisibleCount(9); }} className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${filter === item.value ? 'bg-[#4a2b22] text-white' : 'bg-[#f5efe7] text-[#4a2b22] hover:bg-[#eee2d3]'}`}>{filter === item.value && <Check className="h-3 w-3" aria-hidden="true" />}{item.label}</button>)}</div>
        <div className="relative w-full lg:max-w-xs"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4a2b22]/60" aria-hidden="true" /><label htmlFor="instagram-search" className="sr-only">Buscar publicaciones</label><input id="instagram-search" type="search" value={query} onChange={event => { setQuery(event.target.value); setVisibleCount(9); }} placeholder="Buscar una historia…" className="w-full rounded-xl border border-[#4a2b22]/15 bg-[#fff8f0]/60 py-2.5 pl-9 pr-9 text-sm" />{query && <button aria-label="Borrar búsqueda" type="button" onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#4a2b22]"><X className="h-4 w-4" /></button>}</div>
      </div>}
      {showFilters && <p role="status" className="mb-5 text-xs text-[#4a2b22]/65">{matchingPosts.length} {matchingPosts.length === 1 ? 'publicación' : 'publicaciones'} · Más recientes primero</p>}
      {visiblePosts.length ? <div className={gridClass}>{visiblePosts.map(post => <PostCard key={post.id} post={post} />)}</div> : <div className="rounded-3xl border border-dashed border-[#4a2b22]/20 p-10 text-center"><h3 className="font-semibold">No encontramos publicaciones con esa búsqueda.</h3><button type="button" onClick={() => { setFilter('all'); setQuery(''); setVisibleCount(9); }} className="mt-4 text-sm font-semibold text-[#8f1111] underline">Ver todas las publicaciones</button></div>}
      {!limit && matchingPosts.length > visibleCount && <div className="mt-9 text-center"><button type="button" onClick={() => setVisibleCount(count => count + 9)} className="inline-flex items-center gap-2 rounded-full border border-[#4a2b22]/25 bg-white px-7 py-3 text-sm font-semibold hover:bg-[#f5eadb]">Ver más publicaciones <ArrowDown className="h-4 w-4" aria-hidden="true" /></button></div>}
      {showFilters && <p className="mt-8 text-center text-xs leading-6 text-[#4a2b22]/65">Mostramos hasta 24 publicaciones recientes. <a className="font-semibold underline underline-offset-4" href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer">Encuentra más historias en Instagram.</a></p>}
    </div>
  );
}
