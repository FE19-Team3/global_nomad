'use client';

import { useQuery } from '@tanstack/react-query';

import type { AuthState, User } from './types';

export function useAuth(): AuthState {
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const res = await fetch('/api/users/me');

      if (res.status === 401 || res.status === 404) {
        return null; // 인증 실패 or 유저 없음 → null 반환
      }

      if (!res.ok) {
        throw new Error('Failed to fetch user');
      }

      return res.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    user: user ?? null,
    isAuthenticated: !!user,
    isLoading,
  };
}
