import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';

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
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </div>

        <footer className='w-full py-4 text-center bg-white border-t'>
          <p className='text-sm text-gray-600'>
            Created by {' '}
            <a
              href='https://github.com/vitorvasc'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:text-blue-600 transition-colors'
            >
              vitorvasc
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
