'use client';

import { useState, ChangeEvent } from 'react';

import { useFileInput } from '@/shared/hooks/useFileInput';
import { useUploadImageToUrl } from '@/shared/hooks/useUploadImageToUrl';
import { validateImageFile } from '@/shared/lib/validateImageFile';

import { UpdateProfileImageView } from './UpdateProfileImageView';

interface UpdateProfileImageProps {
  currentImageUrl: string | null;
  onImageUpdate: (newImageUrl: string | null) => void;
}

export const UpdateProfileImage = ({ currentImageUrl, onImageUpdate }: UpdateProfileImageProps) => {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const { ref: fileInputRef, open: openFilePicker, reset: resetFileInput } = useFileInput();

  const { mutate, isPending } = useUploadImageToUrl('profile', {
    onSuccess: (url) => {
      setUploadedUrl(url);
      onImageUpdate(url);
    },
    onError: (e) => {
      // 추후 alert 대신 에러 핸들링 UI 구현 필요
      console.error('이미지 업로드 실패:', e);
      alert('이미지 업로드에 실패했습니다.');
    },
  });

  const getSelectedFile = (event: ChangeEvent<HTMLInputElement>) => event.target.files?.[0] ?? null;

  const validateOrAlert = (file: File) => {
    const validation = validateImageFile(file);
    if (!validation.ok) {
      alert(validation.error);
      return false;
    }
    return true;
  };

  const clearPreview = () => {
    setUploadedUrl(null);
    onImageUpdate(null);
    resetFileInput();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = getSelectedFile(event);
    if (!file) return;

    if (!validateOrAlert(file)) {
      resetFileInput();
      return;
    }

    mutate(file, { onSettled: resetFileInput });
  };

  const displayImage = uploadedUrl || currentImageUrl || 'default-profile.svg';
  const showRemoveBtn = !!uploadedUrl;

  return (
    <UpdateProfileImageView
      displayImage={displayImage}
      isPending={isPending}
      showRemoveBtn={showRemoveBtn}
      onPickFile={openFilePicker}
      onRemove={clearPreview}
      fileInputRef={fileInputRef}
      onFileChange={handleFileChange}
    />
  );
};
