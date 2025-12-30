'use client';

import Text from '@/shared/ui/Text';

type AlertDialogProps = {
  message: string;
  onClose?: () => void;
};

const AlertDialog = ({ message, onClose = () => {} }: AlertDialogProps) => {
  return (
    <div className="flex flex-col items-center gap-y-5 text-center">
      <Text.B18>{message}</Text.B18>

      <button className="rounded-xl bg-blue-500 px-6 py-2 text-white" onClick={onClose}>
        확인
      </button>
    </div>
  );
};

export default AlertDialog;
