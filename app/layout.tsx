import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
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
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    siteName: 'Productos TAJIRI',
    type: 'website',
    images: ['/OG Image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.className}>
      <body className="min-h-screen bg-[#fff8f0] text-[#4a2b22] antialiased">
        <Navbar />
        <VoiceReader />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}