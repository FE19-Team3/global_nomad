import { mapStatusToCode } from '@/shared/api-error';
import type { ApiError, ApiErrorDetails } from '@/shared/api-error';

type CreateApiErrorInput = {
  status: number;
  message: string;
  details?: ApiErrorDetails;
};

export const createApiError = (input: CreateApiErrorInput): ApiError => {
  return {
    name: 'ApiError',
    status: input.status,
    code: mapStatusToCode(input.status),
    message: input.message,
    ...(input.details && { details: input.details }),
  };
};
