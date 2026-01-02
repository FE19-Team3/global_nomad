'use client';

import NotificationCard from './NotificationCard';
// import IcClosed from '@/shared/assets/icons/icon_delete.svg';

export type Notification = {
  id: string;
  content: string;
  createdAt: string;
  read: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  items: Notification[];
};

const NotificationModal = ({ open, onClose, items }: Props) => {
  if (!open) return null;

  return (
    <div
      className="
        absolute top-full right-0 mt-2
        w-[368px] h-[419px]
        rounded-[10px]
        border border-gray-200
        bg-white shadow
        flex flex-col
        overflow-hidden
        z-50
      "
    >
      {/* 헤더 */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold">알림 {items.length}개</h2>
        <button onClick={onClose}>{/* <IcClosed className="w-4 h-4" /> */}X</button>
      </div>

      {/* 리스트 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {items.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NotificationModal;
