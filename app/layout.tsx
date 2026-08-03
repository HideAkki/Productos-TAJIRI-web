import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import VoiceReader from '@/components/VoiceReader';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Productos Tajiri',
  description: 'Productos Tajiri es una marca artesanal premium de leche de búfala con suero costeño, yogur griego, yogur bebible y snacks hechos con dedicación.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.className}>
      <body className="min-h-screen bg-[#fff8f0] text-[#4a2b22] antialiased">
        <Navbar />
        <VoiceReader />
        {children}
        <Footer />
      </body>
    </html>
  );
}