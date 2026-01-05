'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import EyeIcon from '@/shared/assets/images/icons/icon-eye.svg';
import KakaoIcon from '@/shared/assets/images/icons/icon-kakao.svg';
import { Email, Nickname, Password } from '@/shared/schema/auth';
import Button from '@/shared/ui/Button/Button';
import Divider from '@/shared/ui/Divider/Divider';
import Input from '@/shared/ui/Input/Input';
import Label from '@/shared/ui/Label';
import Text from '@/shared/ui/Text';

type SignupFormValues = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { email: '', nickname: '', password: '', passwordConfirm: '' },
  });

  const onSubmit = (data: SignupFormValues) => {
    // TODO: api 연결
    console.warn('가입 데이터:', data);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-160 mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        {/* 이메일 */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="signup-email" textSize="16_M">
            이메일
          </Label>
          <Input
            {...register('email', {
              required: '이메일을 입력해 주세요.',
              validate: (value) =>
                Email.safeParse(value).success || '올바른 이메일 형식을 입력해 주세요.',
            })}
            id="signup-email"
            type="email"
            placeholder="이메일을 입력해주세요"
            error={!!errors.email}
            errorMsg={errors.email?.message}
            autoComplete="email"
          />
        </div>

        {/* 닉네임 */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="signup-nickname" textSize="16_M">
            닉네임
          </Label>
          <Input
            {...register('nickname', {
              required: '닉네임을 입력해 주세요.',
              validate: (v) => Nickname.safeParse(v).success || '닉네임을 입력해주세요.',
            })}
            id="signup-nickname"
            placeholder="닉네임을 입력해주세요"
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="signup-password" textSize="16_M">
            비밀번호
          </Label>
          <div className="relative">
            <Input
              {...register('password', {
                required: '비밀번호를 입력해 주세요.',
                validate: (value) => {
                  if (!Password.safeParse(value).success) return '8자 이상 입력해 주세요.';
                  return true;
                },
              })}
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="8자 이상 입력해 주세요"
              error={!!errors.password}
              errorMsg={errors.password?.message}
              autoComplete="new-password"
            />
            <button // TODO: 추후 내정보 수정 페이지에서 쓰인 PasswordToggleBtn으로 대체
              type="button"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              className="absolute right-4 top-4 text-gray-400 z-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeIcon className={showPassword ? 'w-6 h-6 opacity-50' : 'w-6 h-6'} />
            </button>
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="signup-confirm" textSize="16_M">
            비밀번호 확인
          </Label>
          <div className="relative">
            <Input
              {...register('passwordConfirm', {
                required: '비밀번호 확인을 입력해 주세요.',
                validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
              })}
              id="signup-password-confirm"
              type={showConfirm ? 'text' : 'password'}
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              error={!!errors.passwordConfirm}
              errorMsg={errors.passwordConfirm?.message}
              autoComplete="new-password"
            />
            <button // TODO: 추후 내정보 수정 페이지에서 쓰인 PasswordToggleBtn으로 대체
              type="button"
              className="absolute right-4 top-4 text-gray-400 z-10"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              <EyeIcon className={showConfirm ? 'w-6 h-6 opacity-50' : 'w-6 h-6'} />
            </button>
          </div>
        </div>

        <Button type="submit" variant="primary" size="full" disabled={!isValid} className="mt-2">
          <Button.Label>회원가입하기</Button.Label>
        </Button>
      </form>

      <div className="w-full mt-8">
        <div className="relative flex items-center justify-center mb-8">
          <Divider className="absolute" />
          <Text.M16 className="relative bg-white px-4 text-gray-600">
            SNS 계정으로 회원가입하기
          </Text.M16>
        </div>

        <Button variant="secondary" size="full" className="gap-3 border-gray-200">
          <Button.Icon>
            <KakaoIcon className="w-6 h-6 text-gray-900" />
          </Button.Icon>
          <Button.Label className="text-gray-600">카카오 회원가입</Button.Label>
        </Button>
      </div>

      <div className="mt-8 text-m-16 text-gray-400">
        이미 회원이신가요?{' '}
        <Button as="link" href="/login" variant="text">
          <Button.Label className="text-gray-400 underline">로그인하기</Button.Label>
        </Button>
      </div>
    </div>
  );
};
