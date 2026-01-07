'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { ZodTypeAny } from 'zod';

import { LoginSchema, type LoginFormValues } from '@/shared/schema/auth';

export const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema as ZodTypeAny),
    mode: 'onChange',
  });

  return {
    ...form,
  };
};
