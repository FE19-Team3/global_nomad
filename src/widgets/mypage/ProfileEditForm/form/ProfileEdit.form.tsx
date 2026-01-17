'use client';

import { useState } from 'react';

import { UpdateProfileImage } from '@/features/profile/components/UpdateProfileImage/UpdateProfileImage';
import { useToggle } from '@/shared/hooks/useToggle';
import Button from '@/shared/ui/Button/Button';
import Text from '@/shared/ui/Text';
import { LabeledInput } from '@/widgets/mypage/ProfileEditForm/ui/LabeledInput';

import { useProfileEditForm } from '../hooks/useProfileEditForm';
import PasswordToggleBtn from '../ui/PasswordToggleBtn';

import { mapFormToSubmitValues } from './ProfileEdit.mapper';

type onSubmitValues = {
  nickname: string;
  newPassword: string;
  profileImageUrl: string | null;
};
interface ProfileEditFormProps {
  nickname: string;
  email: string;
  currentImageUrl: string | null;
  onSubmit: (values: onSubmitValues) => void;
}

export const ProfileEditForm = ({
  nickname,
  email,
  currentImageUrl,
  onSubmit,
}: ProfileEditFormProps) => {
  const form = useProfileEditForm(nickname, currentImageUrl);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid: canSubmit },
  } = form;
  const [pwVisible, togglePwVisible] = useToggle();
  const [cpwVisible, toggleCpwVisible] = useToggle();
  const [imageResetKey, setImageResetKey] = useState(0);

  const handleImageUpdate = (newImageUrl: string | null) => {
    setValue('profileImageUrl', newImageUrl);
  };

  return (
    <form
      className="flex flex-col gap-6 w-94 md:w-186"
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(mapFormToSubmitValues(values));

        setImageResetKey((prev) => prev + 1);
        reset();
      })}
    >
      <div className="flex w-full justify-center">
        <UpdateProfileImage
          key={imageResetKey}
          currentImageUrl={currentImageUrl}
          onImageUpdate={handleImageUpdate}
        />
      </div>
      <div className="flex flex-col py-2 gap-1">
        <Text.B18 as="h2">내 정보</Text.B18>
        <Text.M14 as="span" className="text-gray-500">
          닉네임과 비밀번호를 수정하실 수 있습니다.
        </Text.M14>
      </div>

      <LabeledInput
        label="닉네임"
        type="text"
        error={!!errors.nickname}
        errorMsg={errors.nickname?.message ?? ''}
        value={watch('nickname')}
        {...register('nickname')}
      />

      <LabeledInput label="이메일" type="text" value={email} disabled />

      <LabeledInput
        label="비밀번호"
        type={pwVisible ? 'text' : 'password'}
        placeholder="8자 이상 입력해주세요"
        error={!!errors.password}
        errorMsg={errors.password?.message ?? ''}
        value={watch('password')}
        {...register('password')}
      >
        <PasswordToggleBtn visible={pwVisible} onToggle={togglePwVisible} />
      </LabeledInput>

      <LabeledInput
        label="비밀번호 확인"
        type={cpwVisible ? 'text' : 'password'}
        placeholder="비밀번호를 한 번 더 입력해 주세요"
        error={!!errors.confirmPassword}
        errorMsg={errors.confirmPassword?.message ?? ''}
        value={watch('confirmPassword')}
        {...register('confirmPassword')}
      >
        <PasswordToggleBtn visible={cpwVisible} onToggle={toggleCpwVisible} />
      </LabeledInput>

      <div className="flex">
        <Button type="submit" variant="primary" size="full" disabled={!canSubmit}>
          저장하기
        </Button>
      </div>
    </form>
  );
};
