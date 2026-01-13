'use client';

import Image from 'next/image';
import { useState } from 'react';

import { getKakaoAuthUrl } from '@/features/auth/kakaoAuth';
import KakaoIcon from '@/shared/assets/icons/ic_kakao.png';
import Button from '@/shared/ui/Button/Button';
import Divider from '@/shared/ui/Divider/Divider';
import Input from '@/shared/ui/Input/Input';
import Label from '@/shared/ui/Label';

import { useLoginForm } from '../../model/useLoginForm';
import { useLoginSubmit } from '../../model/useLoginSubmit';

import VisibleButton from './VisibleButton';

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useLoginForm();

  const handleLogin = useLoginSubmit();

  const handleVisiblity = () => {
    setIsVisible(!isVisible);
  };

  const handlePasswordKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const caps = e.getModifierState('CapsLock');
    setIsCapsLockOn(caps);
  };

  return (
    <form className="flex flex-col gap-5 w-full max-w-160" onSubmit={handleSubmit(handleLogin)}>
      <div className="flex flex-col gap-2.5">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          placeholder="이메일을 입력해 주세요."
          {...register('email')}
          error={!!errors.email}
        />
      </div>
      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      <div className="flex flex-col gap-2.5">
        <Label htmlFor="password">비밀번호</Label>
        <div className="relative">
          <Input
            id="password"
            type={isVisible ? 'text' : 'password'}
            {...register('password')}
            placeholder="비밀번호를 입력해 주세요."
            onKeyDown={handlePasswordKeyEvent}
            onKeyUp={handlePasswordKeyEvent}
            error={!!errors.password}
          />
          <VisibleButton isVisible={isVisible} onClick={handleVisiblity} />
          {isCapsLockOn && (
            <div
              className="absolute top-3.5 right-15 bg-gray-700 text-white text-xs px-2 py-1 rounded"
              role="status"
              aria-live="polite"
              aria-label="Caps Lock이 켜져있습니다."
            >
              Caps Lock이 켜져 있습니다
            </div>
          )}
        </div>
      </div>
      {/* 에러 예시 */}
      {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      <Button variant="primary" size="full" type="submit" disabled={!isValid || isSubmitting}>
        <Button.Label>로그인하기</Button.Label>
      </Button>

      <div className="w-full mt-3">
        <div className="relative flex items-center justify-center mb-8">
          <Divider className="absolute" />
          <p className="text-m16 relative bg-white px-4 text-gray-600">or</p>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="full"
          className="gap-3 border-gray-200"
          onClick={() => (window.location.href = getKakaoAuthUrl({ flow: 'login' }))}
        >
          <Button.Icon>
            <Image src={KakaoIcon} width={24} height={24} alt="카카오 아이콘" />
          </Button.Icon>
          <Button.Label className="text-gray-600">카카오 로그인</Button.Label>
        </Button>
      </div>

      <div className="mt-8 text-m-16 text-gray-400 text-center">
        이미 회원이신가요?{' '}
        <Button as="link" href="/signup" variant="text">
          <Button.Label className="text-gray-400 underline">회원가입하기</Button.Label>
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
