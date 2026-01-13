'use client';

import Image from 'next/image';

import ConfirmIcon from '@/shared/assets/icons/ic_modal_warning.png';
import Text from '@/shared/ui/Text';

const ConfirmDialog = ({
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <div className="flex flex-col items-center gap-y-0.5">
        <Image src={ConfirmIcon} className="w-12.25 sm:w-22" alt="confirm icon" />
        <Text.B18>{message}</Text.B18>
      </div>

      <div className="flex gap-3">
        <button className="rounded-xl bg-gray-200 px-6 py-2" onClick={onCancel}>
          {cancelText}
        </button>
        <button className="rounded-xl bg-blue-500 px-6 py-2 text-white" onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
