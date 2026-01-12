import { NotificationEntity } from '@/entities/notification/model/notification.type';
import { timeAgo } from '@/shared/lib/timeAgo';
import Text from '@/shared/ui/Text';

import { notificationCardStyles } from './NotificationModal.styles';

type Props = {
  item: NotificationEntity;
  _onDelete?: (id: number) => void;
};

const NotificationCard = ({ item }: Props) => {
  const styles = notificationCardStyles({ type: item.type });

  return (
    <div className={styles.root()}>
      {/* 헤더 */}
      <div className={styles.header()}>
        <Text.B14 className="text-gray-950">{item.title}</Text.B14>
        <Text.M12 className="text-gray-400">{timeAgo(item.createdAt)}</Text.M12>
      </div>

      {/* 내용 */}
      <div className="text-gray-800">
        <Text.Body14>{item.activityName}</Text.Body14>
        <Text.Body14>({item.dateTime})</Text.Body14>
        <Text.Body14>
          예약이{' '}
          <span className={item.type === 'confirmed' ? styles.confirmed() : styles.rejected()}>
            {item.type === 'confirmed' ? '승인' : '거절'}
          </span>
          되었어요.
        </Text.Body14>
      </div>
    </div>
  );
};

export default NotificationCard;
