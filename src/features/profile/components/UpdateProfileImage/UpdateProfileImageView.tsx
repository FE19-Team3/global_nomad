import Image from 'next/image';

import EditBtnIcon from '@/shared/assets/icons/EditBtnIcon.svg';
import XBtnIcon from '@/shared/assets/icons/XBtnIcon.svg';

type Props = {
  displayImage: string;
  isPending: boolean;
  showRemoveBtn: boolean;
  onPickFile: () => void;
  onRemove: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UpdateProfileImageView = ({
  displayImage,
  isPending,
  showRemoveBtn,
  onPickFile,
  onRemove,
  fileInputRef,
  onFileChange,
}: Props) => {
  return (
    <div className="relative w-30 h-30 md:w-18 md:h-18 lg:w-30 lg:h-30">
      <div className="relative w-full h-full overflow-hidden rounded-full">
        <Image src={displayImage} alt="프로필 이미지" fill className="object-cover" />
        {isPending && <p className="absolute bottom-0">업로드 중...</p>}
      </div>

      <button
        type="button"
        onClick={onPickFile}
        className="absolute bottom-0 right-0 cursor-pointer"
        aria-label="프로필 이미지 변경"
      >
        <EditBtnIcon className="size-8 md:size-6 lg:size-8" />
      </button>

      {showRemoveBtn && (
        <button
          type="button"
          onClick={onRemove}
          disabled={isPending}
          className="absolute top-2 right-2 md:right-1 lg:right-2 cursor-pointer"
          aria-label="업로드한 이미지 삭제"
        >
          <XBtnIcon className="size-5 md:size-3 lg:size-5" />
        </button>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        className="hidden"
      />
    </div>
  );
};
