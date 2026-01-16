'use client';

import { NotificationEntity } from '@/entities/notification/model/notification.type';
import IC_Close from '@/shared/assets/icons/ic_delete.svg';
import Button from '@/shared/ui/Button/Button';
import Text from '@/shared/ui/Text';

import NotificationCard from './NotificationCard';
import { notificationModalStyles } from './NotificationModal.styles';

type Props = {
  open: boolean;
  onClose: () => void;
  items: NotificationEntity[];
  _onDelete?: (id: number) => void;
};

const NotificationModal = ({ open, onClose, items, _onDelete }: Props) => {
  const styles = notificationModalStyles();

  if (!open) return null;

  return (
    <div className={styles.root()}>
      {/* 헤더 */}
      <div className={styles.header()}>
        <Text.B16>알림 {items.length}개</Text.B16>
        <Button variant="icon" iconOnly onClick={onClose} className="p-0!">
          <Button.Icon>
            <IC_Close className="w-6 h-6" />
          </Button.Icon>
        </Button>
      </div>

      {/* 리스트 */}
      <div className={styles.list()}>
        {items.length === 0 ? (
          <div className={styles.empty()}>알림이 없습니다</div>
        ) : (
          <div>
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
