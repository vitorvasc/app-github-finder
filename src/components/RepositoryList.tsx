'use client';

import StarIcon from '@/assets/icons/star.svg';
import WatcherIcon from '@/assets/icons/watcher.svg';
import Image from 'next/image';
import { Repository, SortField, SortOrder } from '@/types';
import { useState } from 'react';

interface RepositoryListProps {
  repositories: Repository[];
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  const [sortField, setSortField] = useState<SortField>('stars');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const sortedRepositories = [...repositories].sort((a, b) => {
    const modifier = sortOrder === 'asc' ? 1 : -1;

    if (sortField === 'name') {
      return modifier * a.name.localeCompare(b.name);
    }

    return modifier * (a.stargazers_count - b.stargazers_count);
  });

  return (
    <div className='space-y-4'>
      <div className='flex gap-4 mb-4'>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value as SortField)}
          className='px-3 py-2 border rounded-lg'
          aria-label='Sort by field'
        >
          <option value='stars'>Stars</option>
          <option value='name'>Name</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          className='px-3 py-2 border rounded-lg'
          aria-label='Sort order'
        >
          <option value='desc'>Descending</option>
          <option value='asc'>Ascending</option>
        </select>
      </div>

      <ul className='max-w md bg-white rounded-lg shadow-lg p-6 divide-y divide-gray-200 dark:divide-gray-700'>
        {sortedRepositories.map((repo) => (
          <li key={repo.id} className='py-3 sm:py-4'>
            <div className='flex items-center space-x-4 rtl:space-x-reverse'>
              <div className='shrink-0'>
                <img
                  src='/docs/images/people/profile-picture-1.jpg'
                  alt=''
                  className='w-8 h-8 rounded-full'
                />
              </div>
              <div className='flex-1 min-w-0'>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xl font-medium text-neutral-700 truncate hover:underline'
                >
                  {repo.name}
                </a>
                <p className='text-md mt-2 text-neutral-600 truncate'>
                  {repo.description}
                </p>
              </div>
              <div className='flex flex-col space-y-1 text-sm font-light text-neutral-700'>
                <div className='flex align-center space-x-1'>
                  <Image src={StarIcon} alt='Stars' width='18' height='18' />
                  <span>{repo.stargazers_count} stars</span>
                </div>
                <div className='flex align-center space-x-1'>
                  <Image
                    src={WatcherIcon}
                    alt='Watchers'
                    width='18'
                    height='18'
                  />
                  <span>{repo.watchers_count} watchers</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
