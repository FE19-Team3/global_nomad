import { imageUrlSchema } from '@/shared/types/updateImage';
import type { ImageUploadType } from '@/shared/types/updateImage';

import { clientApi } from '../client';

export const uploadImageToUrl = async (file: File, type: ImageUploadType): Promise<string> => {
  const fd = new FormData();
  fd.append('image', file);

  const path = type === 'profile' ? '/users/me/image' : '/activities/image';
  const res = await clientApi.upload({
    path,
    body: fd,
    schema: imageUrlSchema,
  });

  return res.profileImageUrl ?? res.activityImageUrl!;
};
