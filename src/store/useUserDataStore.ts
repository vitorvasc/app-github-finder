import { create } from 'zustand';
import { User } from '@/types';

interface UserDataStore {
  userData: User | null;
  loading: boolean;
  setState: (data: { userData: User; loading: boolean }) => void;
  reset: () => void;
}

export const useUserDataStore = create<UserDataStore>((set) => ({
  userData: null,
  reposData: null,
  loading: false,
  setState: (data) => set(data),
  reset: () => set({ userData: null, loading: false }),
}));
