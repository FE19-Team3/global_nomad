'use client';

import { timeAgo } from '@/shared/lib/timeAgo';

import { Notification } from './NotificationModal';

type Props = {
  item: Notification;
};

export default function NotificationCard({ item }: Props) {
  const timeText = timeAgo(item.createdAt);

  return (
    <div className="rounded-lg border border-gray-200 p-3 bg-white cursor-pointer">
      <div className="flex items-start gap-2">
        {/* 읽음 표시 */}
        <span
          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
            item.read ? 'bg-gray-300' : 'bg-blue-500'
          }`}
        />

        <div className="flex-1">
          <p className="text-sm leading-5 text-gray-800">{item.content}</p>
          <p className="text-xs text-gray-400 mt-1">{timeText}</p>
        </div>
      </div>
    </div>
  );
}
