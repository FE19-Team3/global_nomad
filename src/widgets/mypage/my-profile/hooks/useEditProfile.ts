'use client';

import { useMutation, type UseMutationOptions, useQueryClient } from '@tanstack/react-query';

import { editProfile } from '@/entities/user/api/editProfile';
import type { EditProfileRes, EditProfileReq } from '@/entities/user/schema/editProfileSchema';
import { ApiError } from '@/shared/api/error/type';

type Options = UseMutationOptions<EditProfileRes, ApiError, EditProfileReq>;

export const useEditProfile = (options?: Options) => {
  const queryClient = useQueryClient();

  return useMutation<EditProfileRes, ApiError, EditProfileReq>({
    mutationKey: ['user', 'editProfile'],
    mutationFn: editProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
    ...options,
  });
};
