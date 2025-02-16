import StarIcon from '@/assets/icons/star.svg';
import WatcherIcon from '@/assets/icons/watcher.svg';
import RepositoryIcon from '@/assets/icons/repository.svg';
import Image from 'next/image';

interface RepositoryItemProps {
  id: number;
  name: string;
  description?: string | null;
  url: string;
  stars_count: number;
  watchers_count: number;
}

export function RepositoryItem({
  name,
  description,
  url,
  stars_count,
  watchers_count,
}: RepositoryItemProps) {
  return (
    <li className='py-3 sm:py-4'>
      <div className='flex items-center space-x-4 rtl:space-x-reverse'>
        <div className='shrink-0'>
          <Image src={RepositoryIcon} alt='Repository' />
        </div>
        <div className='flex-1 min-w-0'>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-l-1 text-blue-700 truncate hover:underline'
          >
            {name}
          </a>
          <p className='text-sm font-light mt-1 text-neutral-600 truncate'>
            {description}
          </p>
        </div>
        <div className='flex flex-col space-y-1 text-sm font-light text-neutral-700'>
          <div className='flex align-center space-x-1'>
            <Image src={StarIcon} alt='Stars' width='18' height='18' />
            <span>{stars_count} stars</span>
          </div>
          <div className='flex align-center space-x-1'>
            <Image src={WatcherIcon} alt='Watchers' width='18' height='18' />
            <span>{watchers_count} watchers</span>
          </div>
        </div>
      </div>
    </li>
  );
}
