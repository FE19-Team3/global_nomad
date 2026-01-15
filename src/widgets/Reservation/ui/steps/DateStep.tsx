import DatePicker from '@/shared/ui/DatePicker/DatePicker';

interface DateStepProps {
  className?: string;
}
export const DateStep = ({ className }: DateStepProps) => (
  <div className={className}>
    <DatePicker />
  </div>
);
