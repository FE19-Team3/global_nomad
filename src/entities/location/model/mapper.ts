import { z } from 'zod';

import { LocationSchema, LocationEntity } from './schema';

const ServerLocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  address: z.string().optional(),
  title: z.string().optional(),
});

export const toLocationEntity = (serverData: unknown): LocationEntity => {
  const parsed = ServerLocationSchema.parse(serverData);

  return LocationSchema.parse({
    lat: parsed.latitude,
    lng: parsed.longitude,
    address: parsed.address ?? '',
    placeName: parsed.title,
  });
};
