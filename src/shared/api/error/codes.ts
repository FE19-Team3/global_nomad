export const ERROR_CODES = [
  'AUTH_REQUIRED',
  'FORBIDDEN',
  'VALIDATION_ERROR',
  'NOT_FOUND',
  'CONFLICT',
  'RATE_LIMITED',
  'UPSTREAM_ERROR',
  'INTERNAL_ERROR',
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];
