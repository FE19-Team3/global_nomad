'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { LoginSchema, type LoginFormValues } from '@/shared/schema/auth';

export const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  return {
    ...form,
  };
};
