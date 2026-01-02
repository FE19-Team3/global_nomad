// **추후수정** 로그인 api가 추가되면 주석 해제
// import { useQuery } from '@tanstack/react-query';
// import { getCurrentUser } from 'entities/user';

import type { AuthState } from './types';

// **추후수정** 임시 목 데이터
export function useAuth(): AuthState {
  const isLoggedIn = false;

  if (isLoggedIn) {
    return {
      user: {
        id: 1,
        nickname: '정만철',
        profileImageUrl: '',
      },
      isAuthenticated: true,
      isLoading: false,
    };
  }

  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  };
}

// **추후수정** 로그인 api가 추가되면 주석 해제
// export function useAuth(): AuthState {
//   const { data: user, isLoading } = useQuery({
//     queryKey: ['user', 'current'],
//     queryFn: getCurrentUser, // ← entities/user에서 import
//     retry: false,
//     staleTime: 1000 * 60 * 5, // ← 5분 캐시
//   });

//   return {
//     user: user ?? null,
//     isAuthenticated: !!user,
//     isLoading,
//   };
// }
