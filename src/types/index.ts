export interface User {
  name: string;
  login: string;
  bio: string | null;
  followers: number;
  following: number;
  location: string | null;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  watchers_count: number;
  html_url: string;
}

export type SortOrder = 'asc' | 'desc';
export type SortField = 'name' | 'stars';
