import { clientApi } from '@/shared/api/client';
import { uploadActivityImageResponseSchema } from '@/shared/schema/activity';

export const uploadImageToUrl = async (file: File): Promise<string> => {
  const form = new FormData();
  form.append('image', file);

  const response = await clientApi.upload({
    path: '/activities/image',
    body: form,
    schema: uploadActivityImageResponseSchema,
  });

  return response.activityImageUrl ?? response.imageUrl ?? response.url ?? '';
};
