'use client';

import { useForm } from 'react-hook-form';

import { createZodResolver } from '@/shared/lib/createZodResolver';
import { LoginFormValues, LoginSchema } from '@/shared/schema/auth';

export const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: createZodResolver(LoginSchema),
    mode: 'onChange',
  });

  return form;
};
