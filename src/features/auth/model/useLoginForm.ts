'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ZodType } from 'zod'; // ZodType 추가

import { LoginFormValues, LoginSchema } from '@/shared/schema/auth';

export const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    // LoginSchema를 ZodType<LoginFormValues>로 단언합니다.
    resolver: zodResolver(LoginSchema as ZodType<LoginFormValues>),
    mode: 'onChange',
  });
  return form;
};
