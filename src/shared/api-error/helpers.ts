import type { ErrorCode } from '@/shared/api-error/codes';
import type { ApiError, ApiErrorDetails } from '@/shared/api-error/type';

type CreateApiErrorInput = {
  status: number;
  code: ErrorCode;
  message: string;
  details?: ApiErrorDetails;
};

export const createApiError = (input: CreateApiErrorInput): ApiError => {
  return {
    name: 'ApiError',
    status: input.status,
    code: input.code,
    message: input.message,
    ...(input.details && { details: input.details }),
  };
};
