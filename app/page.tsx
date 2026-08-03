import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import WhyBuffalo from '@/components/WhyBuffalo';
import ProductShowcase from '@/components/ProductShowcase';
import StoryPreview from '@/components/StoryPreview';
import BlogPreview from '@/components/BlogPreview';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(228,180,95,0.16),transparent_28%)]" />
      <Hero />
      <StatsSection />
      <WhyBuffalo />
      <ProductShowcase />
      <StoryPreview />
      <BlogPreview />
      <CTASection />
    </main>
  );
}
