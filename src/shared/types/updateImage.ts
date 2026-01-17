import { z } from 'zod';

export const imageUrlSchema = z
  .object({
    profileImageUrl: z.string().url().optional(),
    activityImageUrl: z.string().url().optional(),
  })
  .refine(
    (d) => (d.profileImageUrl && !d.activityImageUrl) || (!d.profileImageUrl && d.activityImageUrl),
    { message: 'profileImageUrl과 activityImageUrl 중 정확히 하나만 포함되어야 합니다.' },
  )
  .transform((d) => {
    return d.profileImageUrl ?? d.activityImageUrl!;
  });

export type ImageUrlDTO = z.infer<typeof imageUrlSchema>;
export type ImageUploadType = 'profile' | 'activity';
