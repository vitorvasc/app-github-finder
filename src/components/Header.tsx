import GitHubIcon from '@/assets/icons/github.svg';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className='w-full bg-white border-b sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link
              href='/'
              className='flex items-center space-x-2 text-neutral-700 hover:text-blue-500 transition-colors'
            >
              <span className='font-semibold'>Home</span>
            </Link>
          </div>

          <h1 className='text-xl font-bold text-neutral-700 hidden sm:block'>
            GitHub User Finder
          </h1>

          <a
            href='https://github.com/vitorvasc/app-github-finder'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center space-x-2 text-neutral-700 hover:text-blue-500 transition-colors'
          >
            <Image src={GitHubIcon} alt='GitHub' width='24' height='24' />
            <span className='hidden sm:inline'>View on GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
