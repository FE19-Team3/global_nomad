import { NotificationEntity } from '@/entities/notification/model/notification.type';
import { timeAgo } from '@/shared/lib/timeAgo';

type Props = {
  item: NotificationEntity;
  _onDelete?: (id: number) => void;
};

const NotificationCard = ({ item, _onDelete }: Props) => {
  return (
    <div className="px-6 py-4 bg-gray-50">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
        <span className="text-sm text-gray-400">{timeAgo(item.createdAt)}</span>
      </div>

      {/* 내용 */}
      <div className="text-sm text-gray-700 leading-relaxed">
        <p className="mb-1">{item.activityName}</p>
        <p className="mb-1">({item.dateTime})</p>
        <p>
          예약이{' '}
          <span className={item.type === 'confirmed' ? 'text-blue-600' : 'text-red-600'}>
            {item.type === 'confirmed' ? '승인' : '거절'}
          </span>
          되었어요.
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
