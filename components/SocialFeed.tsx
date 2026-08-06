'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, BookOpen, Facebook, Instagram, MessageCircle, Sparkles, Twitter, Video } from 'lucide-react';

type SocialPost = {
  id: string;
  platform: string;
  author: string;
  text: string;
  date: string;
  link: string;
  image?: string | null;
};

export default function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeed() {
      try {
        const response = await fetch('/api/social-feed', { cache: 'no-store' });
        if (!response.ok) throw new Error('No se pudo cargar el feed');
        const data = await response.json();
        setPosts(data.posts || []);
        if (data.error) {
          setError(data.error);
        } else if (!data.posts?.length) {
          setError('No se encontraron publicaciones disponibles.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudieron obtener las publicaciones sociales.');
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, []);

  const getPlatformIcon = (platform: string) => {
    const normalized = platform.toLowerCase();
    if (normalized.includes('instagram')) return Instagram;
    if (normalized.includes('tiktok')) return Video;
    if (normalized.includes('facebook')) return Facebook;
    if (normalized.includes('x') || normalized.includes('twitter')) return Twitter;
    if (normalized.includes('blogger')) return BookOpen;
    return MessageCircle;
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-[#4a2b22]/10 bg-[#fff8f0]/95 p-5 shadow-[0_30px_60px_-40px_rgba(74,43,34,0.12)] sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#4a2b22]/60">Actualidad social</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#4a2b22]">Últimas publicaciones</h2>
          </div>
          <Sparkles className="h-6 w-6 shrink-0 text-[#e4b45f]" />
        </div>
      </div>

      {loading ? (
        <div className="rounded-[2rem] border border-[#4a2b22]/10 bg-white/95 p-8 text-center text-[#4a2b22]/80">Cargando publicaciones...</div>
      ) : error ? (
        <div className="rounded-[2rem] border border-[#8f1111]/10 bg-[#fff1ef]/95 p-8 text-center text-[#8f1111]">{error}</div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {posts.slice(0, 5).map((post) => {
            const Icon = getPlatformIcon(post.platform);
            return (
              <article key={post.id} className="w-full overflow-hidden rounded-[1.1rem] border border-[#4a2b22]/10 bg-white/95 shadow-sm transition hover:-translate-y-1 hover:border-[#e4b45f]/30">
                <a href={post.link} target="_blank" rel="noreferrer" className="flex h-full min-h-[18rem] flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f5efe7]">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={`${post.platform} preview`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(event) => {
                          (event.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#f5efe7] text-[#c9b59b]">
                        <Instagram className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                    <div className="space-y-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-2">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[#f3d48a]/15 text-[#4a2b22] ring-1 ring-[#f3d48a]/30">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-[#4a2b22]">{post.author}</p>
                            <p className="text-[10px] uppercase tracking-[0.35em] text-[#4a2b22]/50">{post.platform}</p>
                          </div>
                        </div>
                        <span className="text-[11px] text-[#4a2b22]/60">{post.date}</span>
                      </div>
                      <p className="line-clamp-3 text-sm leading-6 text-[#4a2b22]/80">{post.text}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#8f1111] transition group-hover:text-[#e4b45f]">
                      Ver en red
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
