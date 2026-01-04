'use client';

import { FormEvent } from 'react';

import Button from '@/shared/ui/Button/Button';
import Text from '@/shared/ui/Text';
import { LabeledInput } from '@/widgets/mypage/ProfileEditForm/ui/LabeledInput';

import { useField } from '../hooks/useField';
import { useToggle } from '../hooks/useToggle';
import {
  noSpaces,
  validateConfirmPassword,
  validateNickname,
  validatePassword,
} from '../lib/validators';

import PasswordToggleBtn from './PasswordToggleBtn';

interface ProfileEditFormProps {
  nickname: string;
  email: string;
  profileUrl: string;
  // 취소하기 동작 논의 필요
  onCancel: () => void;
  onSubmit: (nickname: string, password: string, profileUrl: string) => void;
}

const ProfileEditForm = ({
  nickname,
  email,
  profileUrl = '',
  onCancel,
  onSubmit,
}: ProfileEditFormProps) => {
  const user = useField(nickname, { validate: validateNickname, sanitize: noSpaces });
  const pw = useField('', { validate: validatePassword, sanitize: noSpaces });
  const cpw = useField('', { sanitize: noSpaces });

  const [pwVisible, togglePwVisible] = useToggle();
  const [cpwVisible, toggleCpwVisible] = useToggle();

  const onBlurConfirm = () => {
    cpw.setTouched(true);
    cpw.setError(validateConfirmPassword(pw.value, cpw.value));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(user.value, pw.value, profileUrl);
  };

  const hasError = user.error || pw.error || cpw.error;
  const canSubmit = !hasError;

  return (
    <form className="flex flex-col gap-6 w-94 md:w-186" onSubmit={handleSubmit}>
      <div className="flex flex-col py-2 gap-1">
        <Text.B18 as="h2">내 정보</Text.B18>
        <Text.M14 as="span" className="text-gray-500">
          닉네임과 비밀번호를 수정하실 수 있습니다.
        </Text.M14>
      </div>

      <LabeledInput
        label="닉네임"
        type="text"
        error={!!user.error}
        errorMsg={user.error ?? ''}
        value={user.value}
        onChange={user.onChange}
        onBlur={user.onBlur}
      />

      <LabeledInput label="이메일" type="text" value={email} disabled />

      <LabeledInput
        label="비밀번호"
        type={pwVisible ? 'text' : 'password'}
        placeholder="8자 이상 입력해주세요"
        error={!!pw.error}
        errorMsg={pw.error ?? ''}
        value={pw.value}
        onChange={pw.onChange}
        onBlur={pw.onBlur}
      >
        <PasswordToggleBtn visible={pwVisible} onToggle={togglePwVisible} />
      </LabeledInput>

      <LabeledInput
        label="비밀번호 확인"
        type={cpwVisible ? 'text' : 'password'}
        placeholder="비밀번호를 한 번 더 입력해 주세요"
        error={!!cpw.error}
        errorMsg={cpw.error ?? ''}
        value={cpw.value}
        onChange={cpw.onChange}
        onBlur={onBlurConfirm}
      >
        <PasswordToggleBtn visible={cpwVisible} onToggle={toggleCpwVisible} />
      </LabeledInput>

      <div className="flex md:justify-center gap-3">
        <Button
          type="button"
          onClick={onCancel}
          size="full"
          variant="secondary"
          className="md:hidden"
        >
          취소하기
        </Button>
        <Button type="submit" variant="primary" size="full" disabled={!canSubmit}>
          저장하기
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
