'use client';

import Image from 'next/image';
import { useRef } from 'react';

import Profile from '@/shared/assets/icons/ic_profile.svg';
import Button from '@/shared/ui/Button/Button';
import Divider from '@/shared/ui/Divider/Divider';
import Popover from '@/shared/ui/Popover';
import { Text } from '@/shared/ui/Text';

import { User } from '../model/types';

import { NotificationPopover } from './NotificationPopover';

interface UserMenuProps {
  user: User;
}

export const HeaderAuth = ({ user }: UserMenuProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    // **추후수정** 로그아웃 API 연동
    console.log('로그아웃');
    alert('로그아웃 기능은 추후 구현 예정');
  };

  return (
    <div ref={dropdownRef} className="relative flex items-center gap-5 px-4 py-2">
      <NotificationPopover />
      <span className="h-4 w-px bg-gray-100" />
      {/* 프로필 버튼 */}
      <Popover>
        <Popover.Trigger popoverKey="profile" label="프로필">
          <div className="flex justify-center items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-300 relative overflow-hidden">
              {user.profileImageUrl ? (
                <Image src={user.profileImageUrl} alt={`${user.nickname}님의 프로필`} fill />
              ) : (
                <Profile className="w-full h-full object-cover" />
              )}
            </div>

            <Text.M14>{user.nickname}</Text.M14>
          </div>
        </Popover.Trigger>
        <Popover.Content popoverKey="profile" placement="bottom-end">
          <ul className="w-40 rounded-lg shadow-lg border border-gray-100 flex flex-col items-start">
            <li className="w-full">
              <Button
                as="link"
                variant="text"
                href="/my-page"
                className="px-4 w-full py-3 rounded-none hover:bg-gray-50 duration-150"
              >
                <Button.Label>
                  <Text.M16>마이페이지</Text.M16>
                </Button.Label>
              </Button>
            </li>
            <Divider />
            <li className="w-full">
              <Button
                variant="text"
                onClick={handleLogout}
                role="menuitem"
                className="px-4 w-full py-3 rounded-none hover:bg-gray-50 duration-150"
              >
                <Button.Label>
                  <Text.M16>로그아웃</Text.M16>
                </Button.Label>
              </Button>
            </li>
          </ul>
        </Popover.Content>
      </Popover>
    </div>
  );
};
