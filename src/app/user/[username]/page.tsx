'use client';

import { use, useEffect } from 'react';
import { Spinner } from '@/components/Spinner';
import { RepositoryList } from '@/components/RepositoryList';
import { UserProfile } from '@/components/UserProfile';
import { useRouter } from 'next/navigation';
import { useUserDataStore } from '@/store/useUserDataStore';
import {
  useGitHubUserData,
  useGitHubUserReposData,
} from '@/hooks/useGitHubUserData';
import { ErrorMessage } from '@/components/ErrorMessage';

interface UserPageParams {
  params: Promise<{ username: string }>;
}

export default function UserPage({ params }: UserPageParams) {
  const router = useRouter();

  const { username } = use(params);
  const { userData: storeUserData, loading: storeUserLoading } =
    useUserDataStore();
  const {
    repos: fetchedRepos,
    loading: fetchReposLoading,
    error: fetchReposError,
  } = useGitHubUserReposData(username);

  if (!username) {
    router.push(`/?error=${encodeURIComponent('No username was provided.')}`);
  }

  const {
    user: fetchedUserData,
    loading: fetchUserLoading,
    error: fetchUserError,
  } = useGitHubUserData(storeUserData ? '' : username);

  const userData = storeUserData || fetchedUserData;
  const loading = storeUserLoading || fetchUserLoading;

  useEffect(() => {
    if (!storeUserData && !storeUserLoading && fetchUserError) {
      router.push(`/?error=${encodeURIComponent(fetchUserError)}`);
    }
  }, [storeUserData, storeUserLoading, fetchUserError, router]);

  if (loading || !userData) {
    return <Spinner />;
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <UserProfile user={userData} />
          {fetchReposLoading && <Spinner />}
          {!fetchReposLoading && fetchReposError && (
            <ErrorMessage message={fetchReposError} />
          )}
          {fetchedRepos && <RepositoryList repositories={fetchedRepos} />}
        </div>
      </div>
    </main>
  );
}
