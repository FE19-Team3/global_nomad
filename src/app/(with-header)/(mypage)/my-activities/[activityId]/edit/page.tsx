import { notFound } from 'next/navigation';

import { getActivityDetail } from '@/entities/activity/api/getActivityDetail';
import { mapToActivityDetail } from '@/features/activity/activity-detail/lib/mapToActivityDetail';
import type { ActivityEditInitialData } from '@/features/activity/hooks/useActivityEditForm';
import { MyActivitiesEditContent } from '@/widgets/mypage';

type EditPageProps = {
  params: Promise<{ activityId: string }>;
};

const toEditInitialData = (
  activityId: number,
  detail: ReturnType<typeof mapToActivityDetail>,
): ActivityEditInitialData => ({
  activityId,
  title: detail.title,
  category: detail.category,
  description: detail.description,
  price: detail.price,
  address: detail.address,
  bannerImageUrl: detail.bannerImageUrl,
  subImages: detail.subImages,
  schedules: detail.schedules,
});

const MyActivitiesEditPage = async ({ params }: EditPageProps) => {
  const { activityId } = await params;
  const numericId = Number(activityId);
  if (!Number.isFinite(numericId)) {
    notFound();
  }
  const { data } = await getActivityDetail(numericId);
  const detail = mapToActivityDetail(data);

  return <MyActivitiesEditContent initialData={toEditInitialData(numericId, detail)} />;
};

export default MyActivitiesEditPage;
