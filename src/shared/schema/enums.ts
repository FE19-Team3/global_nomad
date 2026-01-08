import { z } from 'zod';

// 페이지네이션 방식에서 사용됨
export const MethodEnumSchema = z.enum(['offset', 'cursor']);
export type MethodEnum = z.infer<typeof MethodEnumSchema>;

// Oauth가 전역 로그인 시스템 전용이라 shared에 위치
export const OauthProviderEnumSchema = z.enum(['google', 'kakao']);
export type OauthProviderEnum = z.infer<typeof OauthProviderEnumSchema>;
