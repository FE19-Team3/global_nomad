'use client';

import { useState, useRef, useEffect } from 'react';

import Profile from '@/shared/assets/icons/ic_profile.svg';
import Button from '@/shared/ui/Button/Button';
import { Text } from '@/shared/ui/Text';

import { User } from '../model/types';

import { NotificationButton } from './NotificationButton';

// import Image from 'next/image';

interface UserMenuProps {
  user: User;
}

export const HeaderAuth = ({ user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLogout = () => {
    // **추후수정** 로그아웃 API 연동
    console.log('로그아웃');
    alert('로그아웃 기능은 추후 구현 예정');
  };

  return (
    <div ref={dropdownRef} className="relative flex items-center gap-5 px-4 py-2">
      <NotificationButton />
      <span className="h-4 w-px bg-gray-100" />
      {/* 프로필 버튼 */}
      <Button
        variant="text"
        iconSize="md"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="프로필"
      >
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          {user.profileImageUrl ? (
            <Button.Icon>
              <Profile className="w-full h-full object-cover" />
              {/* ** 추후 수정 ** api 연결후 주석해제 */}
              {/* <Image
                src={user.profileImageUrl}
                alt={`${user.nickname}님의 프로필`}
                fill
                className="object-cover"
              /> */}
            </Button.Icon>
          ) : (
            <span className="text-sm font-medium text-gray-600">{user.nickname[0]}</span>
          )}
        </div>

        <Button.Label className="ml-3">
          <Text.M14>{user.nickname}</Text.M14>
        </Button.Label>
      </Button>

      {/* **추후 수정** 팝오버 추가되면 사용하겠습니다*/}
      {isOpen && (
        <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg border py-2">
          {/* 메뉴 아이템 */}
          <Button as="link" variant="text" href="/my-page" onClick={() => setIsOpen(false)}>
            <Button.Label>
              <Text.M16>마이페이지</Text.M16>
            </Button.Label>
          </Button>

          <div className="border-t my-2" />

          <Button variant="text" onClick={handleLogout} role="menuitem">
            <Button.Label>
              <Text.M16>로그아웃</Text.M16>
            </Button.Label>
          </Button>
        </div>
      )}
    </div>
  );
};
