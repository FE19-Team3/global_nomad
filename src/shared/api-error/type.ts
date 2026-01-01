import type { ErrorCode } from '@/shared/api-error/codes';

export type FieldErrors = Record<string, string[]>;

export interface ApiErrorDetails {
  fieldErrors?: FieldErrors;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  name: 'ApiError';
  status: number;
  code: ErrorCode;
  message: string;
  details?: ApiErrorDetails;
}
