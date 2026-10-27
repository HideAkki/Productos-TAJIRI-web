import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import MotionProvider from '@/components/MotionProvider';
import { siteUrl, socialImage } from '@/lib/site';
import Navbar from '@/components/Navbar';
import VoiceReader from '@/components/VoiceReader';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? 'http://localhost:3000'),
    title: {
    default: 'Productos TAJIRI',
    template: '%s | Productos TAJIRI',
  },
  description:
    'Productos TAJIRI es una marca artesanal premium de leche de búfala con suero costeño, yogur griego, yogur bebible y snacks hechos con dedicación.',
  openGraph: {
    title: 'Productos TAJIRI',
    description:
      'Productos TAJIRI es una marca artesanal premium de leche de búfala con suero costeño, yogur griego y snacks hechos con dedicación.',
    url: siteUrl ?? undefined,
    siteName: 'Productos TAJIRI',
    type: 'website',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: Boolean(siteUrl),
    follow: Boolean(siteUrl),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.className}>
      <body className="min-h-screen bg-[#fff8f0] text-[#4a2b22] antialiased">
        <MotionProvider>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:p-4">Saltar al contenido</a>
        <Navbar />
        <VoiceReader />
        <div id="contenido" tabIndex={-1}>{children}</div>
        <Footer />
        <CookieConsent />
        </MotionProvider>
      </body>
    </html>
  );
}
