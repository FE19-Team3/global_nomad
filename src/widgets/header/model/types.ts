// widgets/header/model/types.ts
// **추후수정** entities/user에서 User import로 변경
// import type { User } from 'entities/user';
export interface User {
  id: number;
  nickname: string;
  profileImageUrl?: string;
}

export interface AuthState {
  user: User | null; // 사용자 정보 (없으면 null)
  isAuthenticated: boolean; // 로그인 여부 (!!user와 동일)
  isLoading: boolean; // 로딩 중인지
}
