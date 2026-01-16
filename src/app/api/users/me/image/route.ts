import { NextRequest, NextResponse } from 'next/server';

import { toApiError, createApiError } from '@/shared/api';
import { respondError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { imageUrlSchema } from '@/shared/types/updateImage';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_PREFIX = 'image/';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const form = await req.formData();
    const file = form.get('image');

    if (!(file instanceof File)) {
      throw createApiError({
        status: 400,
        message: '이미지 파일이 제공되지 않았습니다.',
      });
    }

    if (!file.type.startsWith(ALLOWED_IMAGE_PREFIX)) {
      throw createApiError({
        status: 400,
        message: '잘못된 파일 형식입니다. 이미지를 업로드해주세요.',
      });
    }

    if (file.size > MAX_FILE_SIZE) {
      throw createApiError({
        status: 413,
        message: '파일 크기가 5MB를 초과합니다.',
      });
    }
    const path = req.nextUrl.pathname.replace('/api', '');
    const res = await serverApi.upload({
      path,
      body: form,
      schema: imageUrlSchema,
    });

    return NextResponse.json(res.data);
  } catch (e) {
    return respondError(toApiError(e));
  }
}
