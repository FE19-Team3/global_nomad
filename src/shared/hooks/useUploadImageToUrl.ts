'use client';

import { useMutation } from '@tanstack/react-query';

import type { ImageUploadType } from '@/shared/types/updateImage';

import { ApiError } from '../api';
import { uploadImageToUrl } from '../api/images/uploadImageToUrl';

type Options = {
  onSuccess?: (url: string) => void;
  onError?: (error: ApiError) => void;
};

export const useUploadImageToUrl = (type: ImageUploadType, options?: Options) => {
  return useMutation<string, ApiError, File>({
    mutationFn: (file) => uploadImageToUrl(file, type),
    ...options,
  });
};
