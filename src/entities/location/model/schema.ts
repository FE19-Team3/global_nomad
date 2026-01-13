import { z } from 'zod';

export const LocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  address: z.string(),
  placeName: z.string().optional(),
});

export type LocationEntity = z.infer<typeof LocationSchema>;
