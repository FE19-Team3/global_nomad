'use client';

import { ReactElement, SVGProps } from 'react';

import { cn } from '@/shared/lib/cn';
import Button from '@/shared/ui/Button/Button';

type NavButtonProps = {
  children: ReactElement<SVGProps<SVGSVGElement>>;
  value: string;
  selected?: boolean;
  href: string;
};

export const NavButton = ({ children, value, selected, href }: NavButtonProps) => {
  return (
    <Button
      as="link"
      href={href}
      variant="tertiary"
      size="full"
      iconSize="md2"
      selected={selected}
      disabled={selected}
      // link variant에서 disabled가 aria-disabled로 처리되므로
      // 클릭 완전 차단을 위해 pointer-events-none 추가
      className={cn(selected ? 'pointer-events-none' : undefined, 'justify-start px-5')}
      aria-current={selected ? 'page' : undefined}
    >
      <Button.Icon className={cn(selected ? 'text-primary' : undefined)}>{children}</Button.Icon>
      <Button.Label>{value}</Button.Label>
    </Button>
  );
};
