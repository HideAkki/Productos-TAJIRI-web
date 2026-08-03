'use client';

import SectionTitle from '@/components/SectionTitle';
import SocialFeed from '@/components/SocialFeed';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

export default function BlogPage() {
  return (
    <main className="relative overflow-hidden px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <SectionTitle
            eyebrow="Blog"
            title="Explora historias y novedades de TAJIRI"
          />
          <div className="mt-12 space-y-12">
            <div className="mx-auto w-full max-w-3xl">
              <SocialFeed />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
