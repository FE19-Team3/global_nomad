'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { ZodType } from 'zod';

import { LoginFormValues, LoginSchema } from '@/shared/schema/auth';

const loginSchema: ZodType<LoginFormValues> = LoginSchema;

export const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  return form;
};
