import { respondError, toApiError } from '@/shared/api';

export async function GET() {
  try {
    return Response.json({ ok: true });
  } catch (e) {
    return respondError(toApiError(e));
  }
}
