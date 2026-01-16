export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null; // 사용자 정보 (없으면 null)
  isAuthenticated: boolean; // 로그인 여부 (!!user와 동일)
  isLoading: boolean; // 로딩 중인지
}
