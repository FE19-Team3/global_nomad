'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useDeleteMyActivity } from '@/features/activity/model/useDeleteMyActivity';
import { useMyActivities } from '@/features/activity/model/useMyActivities';
import { isApiError } from '@/shared/api';
import LogoImg from '@/shared/assets/logo/logo_img.svg';
import { useModalStore } from '@/shared/stores/useModalStore';
import Button from '@/shared/ui/Button/Button';
import Text from '@/shared/ui/Text';
import { ManageActivityCard } from '@/widgets/manage-activity-card/ManageActivityCard';

const MyActivitiesManageContent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openAlert, openConfirm } = useModalStore();
  const { data, isLoading, isError } = useMyActivities();
  const deleteMutation = useDeleteMyActivity();

  if (isLoading) {
    return <p className="text-m-16 text-gray-500">불러오는 중...</p>;
  }

  if (isError || !data) {
    return <p className="text-m-16 text-red-500">내 체험 목록을 불러오지 못했습니다.</p>;
  }

  const activities = data.activities.map((activity) => ({
    id: activity.id,
    title: activity.title,
    rating: activity.rating,
    reviewCount: activity.reviewCount,
    price: activity.price,
    bannerImageUrl: activity.bannerImageUrl,
  }));

  const handleDelete = (activityId: number) => {
    openConfirm({
      message: '정말 삭제하시겠습니까?',
      onConfirm: () => {
        if (deleteMutation.isPending) return;

        deleteMutation.mutate(activityId, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-activities'] });
            openAlert('체험이 삭제되었습니다.');
          },
          onError: (e) => {
            if (!isApiError(e)) {
              openAlert('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
              return;
            }

            if (e.status === 0 || e.status >= 500) {
              openAlert('요청에 실패했습니다. 잠시 후 다시 시도해 주세요.');
              return;
            }

            openAlert(e.message);
          },
        });
      },
    });
  };

  const handleEdit = (activityId: number) => {
    router.push(`/my-activities/${activityId}/edit`);
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-3">
          <h2 className="text-b-18">내 체험 관리</h2>
          <p className="text-m-14 text-gray-500">체험을 등록하거나 수정 및 삭제가 가능합니다.</p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="md"
          radius="md"
          onClick={() => router.push('/my-activities/new')}
        >
          <Text.B16>체험 등록하기</Text.B16>
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {activities.map((activity) => (
          <ManageActivityCard
            key={activity.id}
            activity={activity}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {activities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <LogoImg className="h-30 w-30 opacity-40" />
            <p className="mt-8 text-m-18 text-gray-600">아직 등록한 체험이 없어요</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyActivitiesManageContent;
