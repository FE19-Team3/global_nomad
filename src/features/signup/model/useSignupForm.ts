'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { SignupFormValues, SignupSchema } from '@/shared/schema/auth';

export const useSignupForm = () => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',
    defaultValues: { email: '', nickname: '', password: '', passwordConfirm: '' },
  });

  return form;
};
