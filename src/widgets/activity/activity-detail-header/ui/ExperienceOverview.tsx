'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import type { Activity } from '@/entities/activity';
import LocationIcon from '@/shared/assets/icons/icon-location.svg';
import MoreIcon from '@/shared/assets/icons/icon-more.svg';
import StarIcon from '@/shared/assets/icons/icon-star-xs.png';
import Button from '@/shared/ui/Button/Button';

interface ExperienceOverviewProps {
  experience: Activity;
  onEdit?: (experience: Activity) => void;
  onDelete?: (experience: Activity) => void;
}

export const ExperienceOverview = ({ experience, onEdit, onDelete }: ExperienceOverviewProps) => {
  const { category, title, rating, reviewCount, address, description } = experience;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit?.(experience);
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete?.(experience);
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <section className="relative flex flex-col gap-3 bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          {category && <p className="text-m-14 text-gray-500">{category}</p>}
          <h1 className="text-b-24 text-gray-950">{title}</h1>
        </div>
        <div className="relative" ref={menuRef}>
          <Button
            variant="icon"
            size="md"
            iconOnly
            radius="full"
            className="h-7 w-7"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="메뉴 열기"
          >
            <Button.Icon>
              <MoreIcon className="h-7 w-7" />
            </Button.Icon>
          </Button>

          {isMenuOpen && (
            <div className="absolute right-7 top-0 w-32 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
              <button
                type="button"
                onClick={handleEdit}
                className="cursor-pointer flex w-full items-center px-4 py-2 rounded-lg text-left text-m-14 text-gray-900 hover:text-primary hover:bg-primary-100"
              >
                수정하기
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="cursor-pointer flex w-full items-center px-4 py-2 rounded-lg text-left text-m-14 text-gray-900 hover:text-primary hover:bg-primary-100"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-gray-700">
        <div className="flex items-center gap-1">
          <div className="relative h-4 w-4">
            <Image src={StarIcon} alt="별점" fill className="object-contain" />
          </div>
          <p>
            <span className="text-m-14 text-gray-700">{rating?.toFixed(1) ?? '-'}</span>
            <span className="text-m-14 text-gray-700"> ({reviewCount ?? 0})</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-gray-700">
        <LocationIcon />
        <span className="text-m-14">{address ?? '주소 정보가 없습니다.'}</span>
      </div>

      {description && <p className="mt-1 text-body-16 text-gray-700">{description}</p>}
    </section>
  );
};
