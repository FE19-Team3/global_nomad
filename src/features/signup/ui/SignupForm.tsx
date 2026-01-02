'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import EyeIcon from '@/shared/assets/images/icons/icon-eye.svg';
import KakaoIcon from '@/shared/assets/images/icons/icon-kakao.svg';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';

import { signupSchema, type SignupFormValues } from '../model/signupSchema';

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '', passwordConfirm: '' },
  });

  const onSubmit = (data: SignupFormValues) => {
    console.warn('가입 데이터:', data);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-160 mx-auto p-6">
      <div className="mb-10 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center opacity-60">
          <span className="text-gray-400 text-xs">LOGO</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        {/* 이메일 */}
        <div className="flex flex-col gap-3">
          <label htmlFor="signup-email" className="text-m-16 text-gray-700 ml-1">
            이메일
          </label>
          <Input
            {...register('email')}
            id="signup-email"
            placeholder="이메일을 입력해주세요"
            error={!!errors.email}
            errorMsg={errors.email?.message}
            size="md"
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-3">
          <label htmlFor="signup-password" className="text-m-16 text-gray-700 ml-1">
            비밀번호
          </label>
          <div className="relative">
            <Input
              {...register('password')}
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="8자 이상 입력해 주세요"
              error={!!errors.password}
              errorMsg={errors.password?.message}
              size="md"
            />
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-400 z-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeIcon className={showPassword ? 'w-6 h-6 opacity-50' : 'w-6 h-6'} />
            </button>
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col gap-3">
          <label htmlFor="signup-password-confirm" className="text-m-16 text-gray-700 ml-1">
            비밀번호 확인
          </label>
          <div className="relative">
            <Input
              {...register('passwordConfirm')} // 여기도 마찬가지입니다
              id="signup-password-confirm"
              type={showConfirm ? 'text' : 'password'}
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              error={!!errors.passwordConfirm}
              errorMsg={errors.passwordConfirm?.message}
              size="md"
            />
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-400 z-10"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              <EyeIcon className={showConfirm ? 'w-6 h-6 opacity-50' : 'w-6 h-6'} />
            </button>
          </div>
        </div>

        <Button type="submit" variant="primary" size="full" disabled={!isValid} className="mt-2">
          <Button.Label>가입하기</Button.Label>
        </Button>
      </form>

      <div className="w-full mt-8">
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute w-full border-b border-gray-200" />
          <span className="relative px-4 text-sm text-gray-400 bg-white font-medium">or</span>
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
        <Button
          as="link"
          href="/login"
          variant="text"
          className="text-gray-400 underline p-0 h-auto inline-flex font-normal"
        >
          <Button.Label className="text-gray-400">로그인하기</Button.Label>
        </Button>
      </div>
    </div>
  );
};
