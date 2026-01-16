'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateMyActivity } from '@/features/activity/model/useUpdateMyActivity';
import { isApiError } from '@/shared/api';
import { createZodResolver } from '@/shared/lib/createZodResolver';
import {
  createActivityApiRequestSchema,
  type CreateActivityFormValues,
} from '@/shared/schema/activity';
import { useModalStore } from '@/shared/stores/useModalStore';

type ActivityEditSchedule = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
};

type ActivityEditSubImage = {
  id: number;
  imageUrl: string;
};

export type ActivityEditInitialData = {
  activityId: number;
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: ActivityEditSubImage[];
  schedules: {
    date: string;
    times: { id: number; startTime: string; endTime: string }[];
  }[];
};

const getErrorMessage = (error: unknown) => {
  if (isApiError(error)) {
    const raw = error.details?.meta?.raw;
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.message === 'string') return parsed.message;
      } catch {
        return error.message;
      }
    }
    return error.message;
  }

  if (error instanceof Error) return error.message;
  return '요청 중 오류가 발생했습니다.';
};

const toScheduleKey = (schedule: { date: string; startTime: string; endTime: string }) =>
  `${schedule.date}|${schedule.startTime}|${schedule.endTime}`;

export const useActivityEditForm = (initialData: ActivityEditInitialData) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openAlert } = useModalStore();
  const { mutate: updateActivity, isPending } = useUpdateMyActivity();

  const initialSchedules = useMemo<ActivityEditSchedule[]>(
    () =>
      initialData.schedules.flatMap((schedule) =>
        schedule.times.map((time) => ({
          id: time.id,
          date: schedule.date,
          startTime: time.startTime,
          endTime: time.endTime,
        })),
      ),
    [initialData.schedules],
  );

  const initialSubImages = useMemo<ActivityEditSubImage[]>(
    () => initialData.subImages,
    [initialData.subImages],
  );

  const detailAddress = useMemo(() => {
    const parts = initialData.address.split(',').map((part) => part.trim());
    return parts.slice(1).join(', ');
  }, [initialData.address]);

  const form = useForm<CreateActivityFormValues>({
    resolver: createZodResolver(createActivityApiRequestSchema),
    mode: 'onChange',
    defaultValues: {
      title: initialData.title,
      category: initialData.category,
      description: initialData.description,
      price: String(initialData.price),
      address: initialData.address,
      detailAddress,
      schedules: initialSchedules.map(({ date, startTime, endTime }) => ({
        date,
        startTime,
        endTime,
      })),
      bannerImageUrl: initialData.bannerImageUrl,
      subImageUrls: initialSubImages.map((image) => image.imageUrl),
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const currentSchedules = data.schedules ?? [];
    const initialScheduleKeys = new Map<string, number>(
      initialSchedules.map((schedule) => [toScheduleKey(schedule), schedule.id]),
    );
    const currentScheduleKeys = new Set(currentSchedules.map(toScheduleKey));

    const scheduleIdsToRemove = initialSchedules
      .filter((schedule) => !currentScheduleKeys.has(toScheduleKey(schedule)))
      .map((schedule) => schedule.id);

    const schedulesToAdd = currentSchedules.filter(
      (schedule) => !initialScheduleKeys.has(toScheduleKey(schedule)),
    );

    const currentSubImageUrls = data.subImageUrls ?? [];
    const initialSubImageUrlMap = new Map(
      initialSubImages.map((image) => [image.imageUrl, image.id]),
    );

    const subImageIdsToRemove = initialSubImages
      .filter((image) => !currentSubImageUrls.includes(image.imageUrl))
      .map((image) => image.id);

    const subImageUrlsToAdd = currentSubImageUrls.filter((url) => !initialSubImageUrlMap.has(url));

    updateActivity(
      {
        activityId: initialData.activityId,
        title: data.title,
        category: data.category,
        description: data.description,
        price: Number(data.price),
        address: data.address,
        bannerImageUrl: data.bannerImageUrl ?? '',
        ...(subImageIdsToRemove.length > 0 && { subImageIdsToRemove }),
        ...(subImageUrlsToAdd.length > 0 && { subImageUrlsToAdd }),
        ...(scheduleIdsToRemove.length > 0 && { scheduleIdsToRemove }),
        ...(schedulesToAdd.length > 0 && { schedulesToAdd }),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['my-activities'] });
          openAlert({
            message: '수정이 완료되었습니다.',
            onClose: () => {
              router.push('/my-activities');
            },
          });
        },
        onError: (error) => {
          openAlert(getErrorMessage(error));
        },
      },
    );
  });

  return { form, handleSubmit, isPending };
};
