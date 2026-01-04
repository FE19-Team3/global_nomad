'use client';

import { NotificationEntity } from '@/entities/notification/model/notification.type';

import NotificationCard from './NotificationCard';

type Props = {
  open: boolean;
  onClose: () => void;
  items: NotificationEntity[];
  _onDelete?: (id: number) => void;
};

const NotificationModal = ({ open, onClose, items, _onDelete }: Props) => {
  if (!open) return null;

  return (
    <div
      className="
        fixed md:absolute
        inset-0 md:inset-auto
        md:top-full md:right-0 md:mt-2
        w-full md:w-[368px] 
        h-full md:h-auto md:max-h-[600px]
        md:rounded-lg
        border-0 md:border md:border-gray-200
        bg-white md:shadow-lg
        flex flex-col
        overflow-hidden
        z-50
      "
    >
      {/* 헤더 */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">알림 {items.length}개</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* 리스트 */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center text-gray-400 py-12">알림이 없습니다</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <NotificationCard key={item.id} item={item} _onDelete={_onDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
