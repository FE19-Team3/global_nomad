import { ErrorCode } from '@/shared/api';

export function mapStatusToCode(status: number): ErrorCode {
  switch (status) {
    case 400:
      return 'VALIDATION_ERROR';
    case 401:
      return 'AUTH_REQUIRED';
    case 403:
      return 'FORBIDDEN';
    case 404:
      return 'NOT_FOUND';
    case 409:
      return 'CONFLICT';
    case 429:
      return 'RATE_LIMITED';
    case 499:
      return 'ABORTED';
    case 502:
    case 503:
      return 'UPSTREAM_ERROR';
    case 504:
      return 'TIMEOUT';
    default:
      return 'INTERNAL_ERROR';
  }
}
