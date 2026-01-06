'use client';

import { useState } from 'react';

import { LoginFormValues } from '@/shared/schema/auth';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import Label from '@/shared/ui/Label';

import { useLoginForm } from '../../model/useLoginForm';

import VisibleButton from './VisibleButton';

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useLoginForm();

  // TODO: 로그인 api 연결
  const handleLogin = (data: LoginFormValues) => {
    console.log(data);
  };

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
      <Button variant="primary" size="full" type="submit" disabled={!isValid}>
        <Button.Label>로그인하기</Button.Label>
      </Button>
    </form>
  );
};

export default LoginForm;
