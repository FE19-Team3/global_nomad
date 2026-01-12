'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { useCreateActivity } from '@/features/activity/model/useCreateActivity';
import ReservationScheduleSection from '@/features/activity/ui/ReservationScheduleSection';
import UploadIntroImage from '@/features/activity/ui/UploadIntroImage';
import UploadMainImage from '@/features/activity/ui/UploadMainImage';
import {
  createActivityApiRequestSchema,
  type CreateActivityFormValues,
} from '@/shared/schema/activity';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import Label from '@/shared/ui/Label';
import { Select } from '@/shared/ui/Select';
import { Text } from '@/shared/ui/Text';
import Textarea from '@/shared/ui/Textarea/Textarea';

const MyActivites = () => {
  const form = useForm<CreateActivityFormValues>({
    resolver: zodResolver(createActivityApiRequestSchema as unknown as never),
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

  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;
  const { mutate: createActivity, isPending } = useCreateActivity();

  const handleSubmit = form.handleSubmit((data) => {
    createActivity({
      ...data,
      bannerImageUrl: data.bannerImageUrl || undefined,
      subImageUrls: data.subImageUrls ?? [],
    });
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
        <Text.B18 as="h2" className="mb-8">
          내 체험 등록
        </Text.B18>
        <div className="mb-8 flex flex-col gap-6">
          <section>
            <Label htmlFor="title" className="text-b-16 block mb-2">
              제목
            </Label>
            <Input
              id="title"
              placeholder="제목을 입력해 주세요"
              error={!!errors.title}
              errorMsg={errors.title?.message}
              {...register('title')}
            />
          </section>
          <section>
            <Label className="text-b-16 block mb-2">카테고리</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger variant="input-like" placeholder="카테고리를 선택해 주세요" />
                  <Select.Content>
                    <Select.Item value="문화 예술">문화 예술</Select.Item>
                    <Select.Item value="식음료">식음료</Select.Item>
                    <Select.Item value="스포츠">스포츠</Select.Item>
                    <Select.Item value="투어">투어</Select.Item>
                    <Select.Item value="관광">관광</Select.Item>
                    <Select.Item value="웰빙">웰빙</Select.Item>
                  </Select.Content>
                </Select.Root>
              )}
            />
            {errors.category?.message && (
              <p className="mt-2 text-m-14 text-red-500">{errors.category.message}</p>
            )}
          </section>
          <section>
            <Label htmlFor="description" className="text-b-16 block mb-2">
              설명
            </Label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  id="description"
                  placeholder="체험에 대한 설명을 입력해 주세요"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.description}
                  errorMsg={errors.description?.message}
                />
              )}
            />
          </section>
          <section>
            <Label htmlFor="price" className="text-b-16 block mb-2">
              가격
            </Label>
            <Input
              id="price"
              placeholder="체험 금액을 입력해 주세요"
              inputMode="numeric"
              error={!!errors.price}
              errorMsg={errors.price?.message}
              {...register('price')}
            />
          </section>
          <section>
            <Label htmlFor="address" className="text-b-16 block mb-2">
              주소
            </Label>
            <Input
              id="address"
              placeholder="주소를 입력해 주세요"
              error={!!errors.address}
              errorMsg={errors.address?.message}
              {...register('address')}
            />
          </section>
        </div>

        <div className="mb-4 flex flex-col gap-8">
          <fieldset>
            <legend className="text-b-16 block mb-3">예약 가능한 시간대</legend>
            <ReservationScheduleSection />
          </fieldset>

          <fieldset>
            <legend className="text-b-16 block mb-3">메인 이미지 등록</legend>
            <UploadMainImage />
          </fieldset>

          <fieldset>
            <legend className="text-b-16 block mb-2">소개 이미지 등록</legend>
            <UploadIntroImage />
          </fieldset>
        </div>

        <div className="flex justify-center">
          <Button
            variant="primary"
            size="sm"
            className="mx-auto block"
            type="submit"
            disabled={isSubmitting || isPending}
          >
            <Button.Label>등록하기</Button.Label>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default MyActivites;
