'use client';

import Button from '@/shared/ui/Button/Button';
import Text from '@/shared/ui/Text';
import Textarea from '@/shared/ui/Textarea/Textarea';
import { useReviewModalForm } from '@/widgets/BookingCard/components/hook/useReviewModalForm';

import { Rating } from './Rating';

type ReviewModalFormProps = {
  onSubmit: (values: { rating: number; content: string }) => void;
  onClose: () => void;
};

export const ReviewModalForm = ({ onSubmit, onClose }: ReviewModalFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid: canSubmit },
  } = useReviewModalForm();

  const content = watch('content') ?? '';
  const contentLength = content.length;
  const MAX_CONTENT_LENGTH = 100;

  return (
    <form
      className="flex flex-col gap-6 w-full items-center"
      onSubmit={handleSubmit(async (values) => {
        try {
          await onSubmit(values);
          onClose();
        } catch (e) {
          console.error(e);
        }
      })}
    >
      <Rating register={register} name="rating" />
      <div className="flex flex-col gap-4 w-full">
        <Text.B18>소중한 경험을 들려주세요</Text.B18>
        <Textarea
          aria-label="리뷰 작성"
          placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
          className="w-82"
          rows={5}
          {...register('content')}
          error={!!errors.content}
          errorMsg={errors.content?.message ?? ''}
        />
        <div className="text-right text-gray-500">
          {contentLength} / {MAX_CONTENT_LENGTH}
        </div>
      </div>

      <Button type="submit" disabled={!canSubmit} size="full">
        작성하기
      </Button>
    </form>
  );
};
