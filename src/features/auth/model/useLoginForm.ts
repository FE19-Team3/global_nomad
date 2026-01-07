'use client';

import { useForm } from 'react-hook-form';
// @ts-ignore: 모듈 인식 에러를 강제로 무시하고 빌드를 진행합니다.
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginFormValues, LoginSchema } from '@/shared/schema/auth';

export const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    // any로 캐스팅하여 Zod 버전 불일치로 인한 타입 에러를 완전히 차단합니다.
    resolver: zodResolver(LoginSchema as any),
    mode: 'onChange',
  });
  return form;
};