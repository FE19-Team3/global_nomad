'use client';

import {
  useActivityEditForm,
  type ActivityEditInitialData,
} from '@/features/activity/hooks/useActivityEditForm';
import ActivityFormContent from '@/widgets/mypage/ActivityFormContent';

type MyActivitiesEditContentProps = {
  initialData: ActivityEditInitialData;
};

const MyActivitiesEditContent = ({ initialData }: MyActivitiesEditContentProps) => {
  const { form, handleSubmit, isPending } = useActivityEditForm(initialData);

  return (
    <ActivityFormContent
      form={form}
      onSubmit={handleSubmit}
      isPending={isPending}
      title="내 체험 수정"
      submitLabel="수정하기"
    />
  );
};

export default MyActivitiesEditContent;
