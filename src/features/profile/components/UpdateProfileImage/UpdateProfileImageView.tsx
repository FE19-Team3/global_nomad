import Image from 'next/image';

import XBtnIcon from '@/shared/assets/icons/ic_close_btn_gray.svg';
import EditBtnIcon from '@/shared/assets/icons/ic_edit_btn.svg';

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
    <div className="relative size-30">
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
          className="absolute top-2 right-2cursor-pointer"
          aria-label="업로드한 이미지 삭제"
        >
          <XBtnIcon className="size-5" />
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
