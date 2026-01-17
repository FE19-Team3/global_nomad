'use client';

import { useMutation } from '@tanstack/react-query';

import { updateMyActivity } from '@/features/activity/api/update-my-activity';

export const useUpdateMyActivity = () => {
  return useMutation({
    mutationFn: updateMyActivity,
  });
};
