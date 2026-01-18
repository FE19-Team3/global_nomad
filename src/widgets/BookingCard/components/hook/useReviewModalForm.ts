'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const reviewModalFormSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  content: z.string().max(100),
});

type ReviewModalFormValues = z.infer<typeof reviewModalFormSchema>;

export const useReviewModalForm = () => {
  return useForm<ReviewModalFormValues>({
    resolver: zodResolver(reviewModalFormSchema),
    mode: 'onBlur',
    defaultValues: {
      rating: 4,
      content: '',
    },
  });
};
