import type { ApiError } from '@/shared/api-error';

export const respondError = (e: ApiError) => {
  return Response.json(e, {
    status: e.status,
    headers: { 'Content-Type': 'application/json' },
  });
};
