import { clientApi } from '@/shared/api/client';

export const logoutApi = async (): Promise<void> => {
  await clientApi.requestVoid({
    method: 'POST',
    path: '/auth/logout',
  });
};
