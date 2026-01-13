'use client';

import { useForm } from 'react-hook-form';

import { createZodResolver } from '@/shared/lib/createZodResolver';
import { SignupFormValues, SignupSchema } from '@/shared/schema/auth';

export const useSignupForm = () => {
  const form = useForm<SignupFormValues>({
    resolver: createZodResolver(SignupSchema),
    mode: 'onChange',
    defaultValues: { email: '', nickname: '', password: '', passwordConfirm: '' },
  });

  return form;
};
