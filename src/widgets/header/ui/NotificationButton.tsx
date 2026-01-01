import Notification from '@/shared/assets/images/icon/ic_bell_off.svg';
import Button from '@/shared/ui/Button/Button';

// **추후 수정** 알림 로직은 다른 이슈에서 이어서 작업하겠습니다.
export const NotificationButton = () => {
  return (
    <>
      <Button variant="icon" iconOnly>
        <Notification alt="알림" />
      </Button>
    </>
  );
};
