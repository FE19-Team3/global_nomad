'use client';

import { useForm } from 'react-hook-form';

import { useCreateActivity } from '@/features/activity/model/useCreateActivity';
import { isApiError } from '@/shared/api';
import { createZodResolver } from '@/shared/lib/createZodResolver';
import {
  createActivityApiRequestSchema,
  type CreateActivityFormValues,
} from '@/shared/schema/activity';
import { useModalStore } from '@/shared/stores/useModalStore';

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

export const useActivityForm = () => {
  const form = useForm<CreateActivityFormValues>({
    resolver: createZodResolver(createActivityApiRequestSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      category: '',
      description: '',
      price: '',
      address: '',
      schedules: [],
      bannerImageUrl: '',
      subImageUrls: [],
    },
  });

  const { reset } = form;
  const { mutate: createActivity, isPending } = useCreateActivity();
  const { openAlert } = useModalStore();

  const handleSubmit = form.handleSubmit((data) => {
    const bannerImageUrl =
      data.bannerImageUrl && data.bannerImageUrl.startsWith('blob:')
        ? undefined
        : data.bannerImageUrl || undefined;
    const subImageUrls = (data.subImageUrls ?? []).filter((url) => !url.startsWith('blob:'));
    createActivity(
      {
        ...data,
        bannerImageUrl,
        subImageUrls: subImageUrls.length > 0 ? subImageUrls : undefined,
      },
      {
        onSuccess: () => {
          reset();
          openAlert('체험 등록이 완료되었습니다.');
        },
        onError: (error) => {
          openAlert(getErrorMessage(error));
        },
      },
    );
  });

  return { form, handleSubmit, isPending };
};
