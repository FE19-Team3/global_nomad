import { z } from 'zod';

export const ActivitySubImageSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
});

export type ActivitySubImage = z.infer<typeof ActivitySubImageSchema>;
