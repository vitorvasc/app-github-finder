import GitHubIcon from '@/assets/icons/github.svg';
import LocationIcon from '@/assets/icons/location.svg';
import Image from 'next/image';
import { User } from '@/types';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-lg mb-8'>
      <div className='flex items-center space-x-6'>
        <Image
          src={user.avatar_url}
          alt={`${user.name}'s profile pricture`}
          width={100}
          height={100}
          className='rounded-full'
        />
        <div>
          <div className='flex flex-row items-center text-neutral-700'>
            <h1 className='text-2xl font-bold'>{user.name}</h1>
            <a
              href={user.html_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-neutral-600 ml-3 flex space-x-2 hover:underline'
            >
              <span>@{user.login}</span>
              <Image src={GitHubIcon} alt='GitHub' width='24' height='24' />
            </a>
          </div>
          <div className='mt-2 text-neutral-600 flex space-x-4'>
            <span>{user.followers} followers</span>
            <span>{user.following} following</span>
          </div>
          {user.location && (
            <div className='mt-2 flex items-center text-neutral-600 space-x-1'>
              <Image src={LocationIcon} alt='Location' width='19' height='19' />
              <span>{user.location}</span>
            </div>
          )}
          {user.bio && <p className='mt-2 text-neutral-600'>{user.bio}</p>}
        </div>
      </div>
    </div>
  );
}
