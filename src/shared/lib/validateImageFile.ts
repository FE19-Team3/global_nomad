export type ValidateImageResult = { ok: true } | { ok: false; error: string };

const MAX_IMAGE_SIZE_MB = 5;
const ALLOWED_MIME_PREFIX = 'image/';

export const validateImageFile = (file: File): ValidateImageResult => {
  if (!file.type.startsWith(ALLOWED_MIME_PREFIX)) {
    return { ok: false, error: '이미지 파일만 업로드 가능합니다.' };
  }

  const maxBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      ok: false,
      error: `이미지 파일 크기는 ${MAX_IMAGE_SIZE_MB}MB 이하로 업로드 가능합니다.`,
    };
  }

  return { ok: true };
};
