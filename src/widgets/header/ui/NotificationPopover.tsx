import { cn } from 'tailwind-variants';

import useNotificationInfiniteList from '@/features/notification/load-notifications/api/useNotificationInfiniteList';
import Notification from '@/shared/assets/icons/ic_bell.svg';
import Popover from '@/shared/ui/Popover';
import NotificationModal from '@/widgets/notification/NotificationModal';

export const NotificationPopover = () => {
  const { notifications, fetchNextPage, hasNextPage, isLoading } = useNotificationInfiniteList({
    size: 10,
  });

  return (
    <Popover>
      <Popover.Trigger popoverKey="notification">
        {({ isActive }) => (
          <div className="relative">
            <Notification
              className={cn(
                'w-7 h-7 transition-colors',
                isActive ? 'text-primary-500' : 'text-gray-400',
              )}
            />
            {notifications.length > 0 && (
              <div className="absolute top-1 right-1 bg-red border border-white rounded-full w-2 h-2" />
            )}
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content popoverKey="notification" placement="bottom-end">
        {({ close }) => (
          <NotificationModal
            items={notifications}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            onClose={close}
          />
        )}
      </Popover.Content>
    </Popover>
  );
};
