'use client';

import { useMutation } from '@tanstack/react-query';

import { uploadImageToUrl } from '../api/images/uploadImageToUrl';

// 추후 apiError 처리 필요
type Options = {
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
};

export const useUploadImageToUrl = (options?: Options) => {
  return useMutation<string, Error, File>({
    mutationFn: uploadImageToUrl,
    onSuccess: (url) => {
      options?.onSuccess?.(url);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
