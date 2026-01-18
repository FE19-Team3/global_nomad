import { cn } from '@/shared/lib/cn';
import Text from '@/shared/ui/Text';

export type BadgeVariant =
  | 'cancel'
  | 'done'
  | 'reject'
  | 'complete'
  | 'approve'
  | 'pending'
  | 'confirmed'
  | 'declined';

interface StateBadgeProps {
  variant: BadgeVariant;
  className?: string;
}

export const BADGE_CONFIG: Record<BadgeVariant, { label: string; style: string }> = {
  cancel: { label: '예약 취소', style: 'bg-gray-200 text-gray-600' },
  done: { label: '예약 완료', style: 'bg-green-100 text-green-600' },
  reject: { label: '예약 거절', style: 'bg-red-100 text-red-500' },
  complete: { label: '체험 완료', style: 'bg-blue-100 text-blue-600' },
  approve: { label: '예약 승인', style: 'bg-cyan-100 text-cyan-600' },
  pending: { label: '신청', style: 'bg-blue-100 text-blue-600' },
  confirmed: { label: '승인', style: 'bg-amber-100 text-amber-600' },
  declined: { label: '거절', style: 'bg-red-100 text-red-500' },
};

const StateBadge = ({ variant, className }: StateBadgeProps) => {
  const { label, style } = BADGE_CONFIG[variant];

  return (
    <Text.B13
      className={cn(
        'inline-flex items-center justify-center px-5 py-2 rounded-full',
        style,
        className,
      )}
    >
      {label}
    </Text.B13>
  );
};

export default StateBadge;
