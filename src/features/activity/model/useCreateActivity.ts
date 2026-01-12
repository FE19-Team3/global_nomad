import { useMutation } from '@tanstack/react-query';

import {
  createActivity,
  type CreateActivityPayload,
} from '@/features/activity/api/create-activity';

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: (payload: CreateActivityPayload) => createActivity(payload),
  });
};
