'use client';

import { useActivityForm } from '@/features/activity/hooks/useActivityForm';
import ActivityFormContent from '@/widgets/mypage/ActivityFormContent';

const MyActivitiesCreateContent = () => {
  const { form, handleSubmit, isPending } = useActivityForm();

  return (
    <ActivityFormContent
      form={form}
      onSubmit={handleSubmit}
      isPending={isPending}
      title="내 체험 등록"
      submitLabel="등록하기"
    />
  );
};

export default MyActivitiesCreateContent;
