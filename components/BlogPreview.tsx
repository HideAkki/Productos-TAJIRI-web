'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Instagram, Newspaper } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { fadeUp, staggerContainer } from '@/lib/motion';

type SocialPost = {
  id: string;
  platform: string;
  author: string;
  text: string;
  date: string;
  link: string;
  image?: string | null;
};

const fallbackPreviews = [
  {
    title: 'Recetas de desayuno con yogur de búfala',
    label: 'Blog',
    icon: Newspaper,
  },
  {
    title: 'Historias del campo y la familia TAJIRI',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    title: 'Testimonios y reseñas de la comunidad',
    label: 'Facebook',
    icon: Newspaper,
  },
  {
    title: 'Sabores del sur y la tradición de TAJIRI',
    label: 'TikTok',
    icon: Newspaper,
  },
];

export default function BlogPreview() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/api/social-feed', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('No se pudieron cargar las publicaciones.');
        }
        const data = await response.json();
        setPosts((data.posts || []).slice(0, 4));
        if (data.error) {
          setError(data.error);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar publicaciones.');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <section className="mx-auto mb-16 max-w-7xl px-4 sm:mb-24 sm:px-8">
      <SectionTitle
        eyebrow="Actualidad"
        title="Lo Último de TAJIRI"
        description="Mantente al tanto de las últimas novedades e historias de nuestra marca."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 sm:mt-10"
      >
        {loading || error || posts.length === 0
          ? fallbackPreviews.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  className="group overflow-hidden rounded-[2rem] border border-[#f3d48a]/25 bg-[#fff8f0]/95 p-5 transition hover:-translate-y-1 hover:border-[#e4b45f]/40 hover:bg-[#fff2e7] sm:p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.32em] text-[#4a2b22]/80">{item.label}</p>
                      <h3 className="mt-3 text-lg font-semibold text-[#4a2b22] sm:text-xl">{item.title}</h3>
                    </div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#f3d48a]/20 text-[#4a2b22] ring-1 ring-[#f3d48a]/30">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="mt-6 h-32 rounded-[1.75rem] bg-[#f3d48a]/15 p-4 sm:h-40">
                    <div className="h-full rounded-[1.5rem] bg-[#fff7ef]" />
                  </div>
                </motion.article>
              );
            })
          : posts.map((post) => (
              <motion.article
                key={post.id}
                variants={fadeUp}
                className="group overflow-hidden rounded-[2rem] border border-[#f3d48a]/25 bg-[#fff8f0]/95 transition hover:-translate-y-1 hover:border-[#e4b45f]/40 hover:bg-[#fff2e7]"
              >
                <a href={post.link} target="_blank" rel="noreferrer" className="block">
                  <div className="relative h-40 w-full overflow-hidden bg-[#f3d48a]/15 sm:h-44">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={`Publicación de ${post.platform}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#f3d48a]/15 text-[#4a2b22]/60">
                        <Instagram className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#4a2b22]/80">{post.platform}</p>
                        <p className="mt-3 text-lg font-semibold text-[#4a2b22] line-clamp-2">{post.text || 'Nueva publicación de TAJIRI'}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4 text-sm text-[#4a2b22]/60">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#8f1111] transition group-hover:text-[#e4b45f]">
                      Ver publicación
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
      </motion.div>
    </section>
  );
}
