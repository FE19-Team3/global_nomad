'use client';

import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import ImageDelete from '@/shared/assets/icons/ic_image_delete.svg';
import { useFileInput } from '@/shared/hooks/useFileInput';
import { useUploadImageToUrl } from '@/shared/hooks/useUploadImageToUrl';
import { validateImageFile } from '@/shared/lib/validateImageFile';
import type { CreateActivityFormValues } from '@/shared/schema/activity';
import { useModalStore } from '@/shared/stores/useModalStore';

const UploadMainImage = () => {
  const { setValue, watch } = useFormContext<CreateActivityFormValues>();
  const bannerImageUrl = watch('bannerImageUrl') ?? '';
  const { ref: fileInputRef, open: openFilePicker, reset: resetFileInput } = useFileInput();
  const prevUrlRef = useRef<string>('');
  const { openAlert } = useModalStore();

  const { mutate, isPending } = useUploadImageToUrl('activity', {
    onSuccess: (url) => {
      setValue('bannerImageUrl', url, { shouldDirty: true, shouldValidate: true });
    },
    onError: (e) => {
      console.error('메인 이미지 업로드 실패:', e);
      openAlert('이미지 업로드에 실패했습니다.');
    },
  });

  useEffect(() => {
    const prev = prevUrlRef.current;
    if (prev && prev.startsWith('blob:') && prev !== bannerImageUrl) {
      URL.revokeObjectURL(prev);
    }
    prevUrlRef.current = bannerImageUrl;
  }, [bannerImageUrl]);

  useEffect(() => {
    return () => {
      const prev = prevUrlRef.current;
      if (prev && prev.startsWith('blob:')) {
        URL.revokeObjectURL(prev);
      }
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.ok) {
      openAlert(validation.error);
      resetFileInput();
      return;
    }

    mutate(file, { onSettled: resetFileInput });
  };

  const handleRemove = () => {
    if (bannerImageUrl && bannerImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(bannerImageUrl);
    }
    setValue('bannerImageUrl', '', { shouldDirty: true, shouldValidate: true });
    resetFileInput();
  };

  return (
    <div className="flex flex-wrap gap-4">
      {/* 이미지 추가 */}
      <button
        type="button"
        onClick={openFilePicker}
        disabled={isPending}
        className="flex flex-col items-center justify-center w-32 h-32 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors disabled:cursor-not-allowed"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl text-gray-300">+</span>
          <span className="text-gray-400 text-sm">{bannerImageUrl ? '1' : '0'} / 1</span>
        </div>
      </button>

      {/* 미리보기 */}
      {bannerImageUrl && (
        <div className="relative w-32 h-32 group">
          <img
            src={bannerImageUrl}
            alt="메인 이미지"
            className="w-full h-full object-cover rounded-xl border border-gray-100 shadow-sm"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-3 -right-3 bg-gray-800 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md"
          >
            <ImageDelete className="text-white" />
          </button>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadMainImage;
