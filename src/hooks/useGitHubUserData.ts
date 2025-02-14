import { User, Repository } from '@/types';
import { useEffect, useState } from 'react';

const buildHeaders = () => {
  return {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };
};

export function useGitHubUserData(username: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) return;

        setLoading(true);
        setError('');

        const headers = buildHeaders();
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`,
          { headers }
        );

        if (!userResponse.ok) {
          let errorMessage: string;

          switch (userResponse.status) {
            case 403:
              errorMessage =
                'API rate limit exceeded. Please, try again later.';
              break;
            case 404:
              errorMessage = 'User not found.';
              break;
            default:
              errorMessage = 'Failed to fetch user data.';
              break;
          }

          throw new Error(errorMessage);
        }

        const userData = await userResponse.json();

        setUser(userData);
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
      try {
        if (!username) return;

        setLoading(true);
        setError('');

        const headers = buildHeaders();
        const userReposResponse = await fetch(
          `https://api.github.com/users/${username}/repos`,
          { headers }
        );

        if (!userReposResponse.ok) {
          let errorMessage: string;

          switch (userReposResponse.status) {
            case 403:
              errorMessage =
                'API rate limit exceeded. Please, try again later.';
              break;
            case 404:
              errorMessage = 'User not found.';
              break;
            default:
              errorMessage = 'Failed to fetch user data.';
              break;
          }

          throw new Error(errorMessage);
        }

        const reposData = await userReposResponse.json();

        setRepos(reposData);
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
