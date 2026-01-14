import type { ErrorCode } from '@/shared/api';
export type FieldErrors = Record<string, string[] | undefined>;

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
