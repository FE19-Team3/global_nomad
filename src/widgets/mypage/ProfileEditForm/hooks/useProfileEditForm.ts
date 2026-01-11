'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { profileEditSchema, type ProfileEditFormValues } from '../model/validators';

export const useProfileEditForm = (defaultNickname: string) => {
  return useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    mode: 'onBlur',
    defaultValues: {
      nickname: defaultNickname,
      password: '',
      confirmPassword: '',
    },
  });
};
