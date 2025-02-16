import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GitHub User Finder',
  description: 'Find GitHub users and explore their analytical data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <div className='flex-grow'>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </div>
        <Footer />
      </body>
    </html>
  );
}
