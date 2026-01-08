import type { ApiError } from '@/shared/api';

export const respondError = (e: ApiError) => {
  return Response.json(e, {
    status: e.status,
    headers: { 'Content-Type': 'application/json' },
  });
};
