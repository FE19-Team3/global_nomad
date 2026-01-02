import { respondError, toApiError } from '@/app/api/_lib';

export async function GET() {
  try {
    return Response.json({ ok: true });
  } catch (e) {
    return respondError(toApiError(e));
  }
}
