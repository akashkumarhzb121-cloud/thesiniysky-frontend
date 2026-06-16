import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      login: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken, isAuthenticated: true, isLoading: false }),
      logout: () =>
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    { name: 'auth-storage' }
  )
);

// Helper: Get role string from stored user
export function getStoredRole(): string {
  const state = useAuthStore.getState();
  const role = state.user?.role;
  if (!role) return '';
  if (typeof role === 'string') return role;
  if (typeof role === 'object' && role.name) return role.name;
  return '';
}

// Helper: Check if stored user is admin
export function isStoredUserAdmin(): boolean {
  const role = getStoredRole();
  return ['super_admin', 'admin', 'editor'].includes(role);
}