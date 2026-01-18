'use client';

import { useQueryClient } from '@tanstack/react-query';

import { isApiError } from '@/shared/api';
import { clientApi } from '@/shared/api/client';
import Ic_delete from '@/shared/assets/icons/ic_delete.svg';
import { useModalStore } from '@/shared/stores/useModalStore';
import Button from '@/shared/ui/Button/Button';
import Text from '@/shared/ui/Text';

import { buildDescription } from '../util/buildDescription';

import { ReviewModalForm } from './ReviewModalForm';
import { reviewSchema } from './schema/schema';

type ReviewModalProps = {
  reservation: {
    title: string;
    startTime: string;
    entTime: string;
    headCount: number;
    date: string;
    reservationId: number;
    activityId: number;
  };
  onClose: () => void;
};

export const ReviewModal = ({
  reservation: { title, startTime, entTime, headCount, date, reservationId, activityId },
  onClose,
}: ReviewModalProps) => {
  const queryClient = useQueryClient();
  const { openAlert } = useModalStore();
  const description = buildDescription({ startTime, endTime: entTime, headCount, date });
  const handleSubmit = async (values: { rating: number; content: string }) => {
    try {
      await clientApi.post({
        path: `/my-reservations/${reservationId}/reviews`,
        body: values,
        schema: reviewSchema,
      });
      await queryClient.invalidateQueries({ queryKey: ['activityReviews', activityId] });
      await queryClient.invalidateQueries({ queryKey: ['my-reservations'] });
      openAlert({
        message: '후기 작성 완료',
        onClose,
      });
    } catch (e) {
      if (isApiError(e)) {
        openAlert({ message: e.message });
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-96 h-137 bg-white px-6 py-4 rounded-4xl">
      <Button iconOnly variant="icon" className="self-end" onClick={onClose}>
        <Button.Icon>
          <Ic_delete />
        </Button.Icon>
      </Button>
      <div className="flex flex-col gap-1 text-center">
        <Text.B16 as="h2">{title}</Text.B16>
        <Text.M14 className="text-gray-500">{description}</Text.M14>
      </div>
      <ReviewModalForm onSubmit={handleSubmit} onClose={onClose} />
    </div>
  );
};
