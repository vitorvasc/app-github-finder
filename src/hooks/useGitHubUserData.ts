import { User, Repository } from '@/types';
import { useEffect, useState } from 'react';

export function useGitHubUserData(username: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;

      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/github/user/${username}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch user data');
        }

        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error ocurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { user, loading, error };
}

export function useGitHubUserReposData(username: string) {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;

      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/github/user/${username}/repos`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch user data');
        }

        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error ocurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { repos, loading, error };
}
