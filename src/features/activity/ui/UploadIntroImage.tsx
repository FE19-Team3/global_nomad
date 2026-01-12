'use client';

import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import ImageDelete from '@/shared/assets/icons/ic_image_delete.svg';
import { useFileInput } from '@/shared/hooks/useFileInput';
import { useUploadImageToUrl } from '@/shared/hooks/useUploadImageToUrl';
import { validateImageFile } from '@/shared/lib/validateImageFile';
import type { CreateActivityFormValues } from '@/shared/schema/activity';

const UploadIntroImage = () => {
  const { setValue, watch } = useFormContext<CreateActivityFormValues>();
  const subImageUrls = watch('subImageUrls') ?? [];
  const { ref: fileInputRef, open: openFilePicker, reset: resetFileInput } = useFileInput();
  const prevUrlsRef = useRef<string[]>([]);

  const { mutate, isPending } = useUploadImageToUrl({
    onSuccess: (url) => {
      setValue('subImageUrls', [...subImageUrls, url], { shouldDirty: true, shouldValidate: true });
    },
    onError: (e) => {
      console.error('소개 이미지 업로드 실패:', e);
      alert('이미지 업로드에 실패했습니다.');
    },
  });

  useEffect(() => {
    const prev = prevUrlsRef.current;
    prev.forEach((url) => {
      if (url.startsWith('blob:') && !subImageUrls.includes(url)) {
        URL.revokeObjectURL(url);
      }
    });
    prevUrlsRef.current = subImageUrls;
  }, [subImageUrls]);

  useEffect(() => {
    return () => {
      prevUrlsRef.current.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.ok) {
      alert(validation.error);
      resetFileInput();
      return;
    }

    mutate(file, { onSettled: resetFileInput });
  };

  const handleRemove = (index: number) => {
    const next = subImageUrls.filter((_, i) => i !== index);
    setValue('subImageUrls', next, { shouldDirty: true, shouldValidate: true });
  };

  const isMaxReached = subImageUrls.length >= 4;

  return (
    <div className="flex flex-wrap gap-4">
      {/* 이미지 추가 */}
      <button
        type="button"
        onClick={openFilePicker}
        disabled={isPending || isMaxReached}
        className="flex flex-col items-center justify-center w-32 h-32 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors disabled:cursor-not-allowed"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl text-gray-300">+</span>
          <span className="text-gray-400 text-sm">{subImageUrls.length} / 4</span>
        </div>
      </button>

      {/* 미리보기 */}
      {subImageUrls.map((url, index) => (
        <div className="relative w-32 h-32 group" key={`${url}-${index}`}>
          <img
            src={url}
            alt={`소개 이미지 ${index + 1}`}
            className="w-full h-full object-cover rounded-xl border border-gray-100 shadow-sm"
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="absolute -top-3 -right-3 bg-gray-800 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md"
          >
            <ImageDelete className="text-white" />
          </button>
        </div>
      ))}
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

export default UploadIntroImage;
