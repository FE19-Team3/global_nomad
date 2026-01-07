'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { LoginFormValues, LoginSchema } from '@/shared/schema/auth';

export const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema as any),
    mode: 'onChange',
  });

  return form;
};
