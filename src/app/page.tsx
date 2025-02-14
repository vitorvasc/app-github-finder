'use client';

import { ErrorMessage } from '@/components/ErrorMessage';
import { Spinner } from '@/components/Spinner';
import { useGitHubUserData } from '@/hooks/useGitHubUserData';
import { useUserDataStore } from '@/store/useUserDataStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setState = useUserDataStore((state) => state.setState);

  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTrigger, setSearchTrigger] = useState('');
  const {
    user,
    loading,
    error: userDataError,
  } = useGitHubUserData(searchTrigger);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Initial validation for username
    const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    if (!regex.test(username)) {
      setSearchTrigger('');
      return;
    }

    setSearchTrigger(username);
  };

  useEffect(() => {
    if (!loading && !userDataError && user && searchTrigger) {
      setState({ userData: user, loading: loading });
      router.push(`/user/${searchTrigger}`);
    }

    const errorParam = searchParams.get('error');
    if (errorParam || userDataError) {
      setErrorMessage(errorParam ?? userDataError);
    }
  }, [
    loading,
    user,
    searchTrigger,
    userDataError,
    searchParams,
    router,
    setState,
  ]);

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      {errorMessage && (
        <div className='max-w-md w-full mb-10'>
          <ErrorMessage message={errorMessage} />
        </div>
      )}
      <div className='max-w-md w-full p-6 bg-white rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center mb-6 text-neutral-700'>
          GitHub User Finder
        </h1>

        <form onSubmit={handleSearch} className='space-y-4'>
          <div>
            <label htmlFor='username' className='sr-only'>
              GitHub Username
            </label>
            <input
              id='username'
              value={username}
              type='text'
              onChange={(e) => setUsername(e.target.value)}
              placeholder='E.g: vitorvasc'
              aria-label='GitHub Username'
              className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-500'
              disabled={loading}
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
            disabled={loading}
          >
            {loading ? (
              <span className='flex items-center justify-center'>
                <Spinner />
                Searching...
              </span>
            ) : (
              'Search'
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
