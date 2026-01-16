'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import Ic_calender from '@/shared/assets/icons/ic_calender.svg';
import Ic_setting from '@/shared/assets/icons/ic_setting.svg';
import Ic_speech from '@/shared/assets/icons/ic_speech.svg';
import Ic_user from '@/shared/assets/icons/ic_user.svg';
import { cn } from '@/shared/lib/cn';
import { useAuth } from '@/widgets/header/model/useAuth';

import { NavMenu } from '../components/nav-menu';

import { styles } from './side-nav.style';

type BaseNavItem = {
  value: string;
  href: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
};

type SideNavProps = {
  className?: string;
};

// 경로는 임시 경로 설정한 것임
const navItems: BaseNavItem[] = [
  { value: '내 정보', href: '/side', icon: <Ic_user /> },
  { value: '예약내역', href: '/booking', icon: <Ic_speech /> },
  { value: '내 체험 관리', href: '/my-experience', icon: <Ic_setting /> },
  { value: '예약 현황', href: '/booking-status', icon: <Ic_calender /> },
];

export const SideNav = ({ className }: SideNavProps) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const slots = styles();
  const navMenuItems = navItems.map((item) => ({
    ...item,
    selected: pathname === item.href,
  }));

  return (
    <aside className={cn(slots.root(), className)}>
      <div className={slots.profileImage()}>
        <Image
          src={user?.profileImageUrl ?? '/default-profile.svg'}
          alt="프로필 이미지"
          fill
          className="object-cover"
        />
      </div>
      <NavMenu items={navMenuItems} className={slots.nav()} />
    </aside>
  );
};
