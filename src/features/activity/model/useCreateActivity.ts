import { useMutation } from '@tanstack/react-query';

import { createActivity } from '@/features/activity/api/create-activity';

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: createActivity,
  });
};
