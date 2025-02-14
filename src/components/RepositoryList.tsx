'use client';

import { Repository, SortField, SortOrder } from '@/types';
import { useState } from 'react';
import { RepositoryItem } from './RepositoryItem';

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
    <div className='space-y-4 font-sm'>
      <div className='flex flex-row align-center justify-end space-x-2'>
        <div className='flex gap-4 mb-2 text-sm text-neutral-600'>
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
      </div>

      <ul className='max-w md bg-white rounded-lg shadow-lg p-6 divide-y divide-gray-200'>
        {sortedRepositories.map((repo) => (
          <RepositoryItem
            key={repo.id}
            id={repo.id}
            url={repo.html_url}
            name={repo.name}
            description={repo.description}
            stars_count={repo.stargazers_count}
            watchers_count={repo.watchers_count}
          />
        ))}
      </ul>
    </div>
  );
}
