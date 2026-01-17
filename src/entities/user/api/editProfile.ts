import { clientApi } from '@/shared/api/client';

import { type EditProfileReq, editProfileResSchema } from '../schema/editProfileSchema';

export const editProfile = async (data: EditProfileReq) => {
  const path = '/users/me';
  const res = await clientApi.patch({
    path,
    body: data,
    schema: editProfileResSchema,
  });

  return res.data;
};
