import { respondError } from '@/app/api/_lib/respond-error';
import { toApiError } from '@/app/api/_lib/to-api-error';

export async function GET() {
  try {
    return Response.json({ ok: true });
  } catch (e) {
    return respondError(toApiError(e));
  }
}
