'use client';

import { useMutation } from '@tanstack/react-query';

import { deleteMyActivity } from '@/features/activity/api/delete-my-activity';

export const useDeleteMyActivity = () => {
  return useMutation({
    mutationFn: deleteMyActivity,
  });
};
