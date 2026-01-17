'use client';

import Image from 'next/image';

import type { ActivityDetail } from '@/features/activity/activity-detail/model/activity-detail.types';
import MoreIcon from '@/shared/assets/icons/ic_kebab.svg';
import LocationIcon from '@/shared/assets/icons/ic_map.svg';
import StarIcon from '@/shared/assets/icons/ic_star_on.png';
import PopoverContent from '@/shared/ui/Popover/Content';
import Popover from '@/shared/ui/Popover/Popover';
import { usePopover } from '@/shared/ui/Popover/PopoverContext';
import PopoverTrigger from '@/shared/ui/Popover/Trigger';

interface ActivityOverviewProps {
  experience: ActivityDetail;
  onEdit?: (experience: ActivityDetail) => void;
  onDelete?: (experience: ActivityDetail) => void;
}

interface ActivityMenuProps {
  experience: ActivityDetail;
  onEdit?: (experience: ActivityDetail) => void;
  onDelete?: (experience: ActivityDetail) => void;
}

const ActivityMenu = ({ experience, onEdit, onDelete }: ActivityMenuProps) => {
  const { close } = usePopover();

  const handleEdit = () => {
    close();
    onEdit?.(experience);
  };

  const handleDelete = () => {
    close();
    onDelete?.(experience);
  };

  return (
    <PopoverContent popoverKey="activity-overview-menu" placement="bottom-end">
      <button
        type="button"
        onClick={handleEdit}
        className="cursor-pointer flex w-full items-center rounded-lg px-4 py-2 text-left text-m-14 text-gray-900 hover:bg-primary-100 hover:text-primary"
      >
        수정하기
      </button>
      <button
        type="button"
        onClick={handleDelete}
        className="cursor-pointer flex w-full items-center rounded-lg px-4 py-2 text-left text-m-14 text-gray-900 hover:bg-primary-100 hover:text-primary"
      >
        삭제하기
      </button>
    </PopoverContent>
  );
};

export const ActivityOverview = ({ experience, onEdit, onDelete }: ActivityOverviewProps) => {
  const { category, title, rating, reviewCount, address } = experience;

  return (
    <section className="relative flex flex-col gap-3 bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          {category && <p className="text-m-14 text-gray-500">{category}</p>}
          <h1 className="text-b-24 text-gray-950">{title}</h1>
        </div>
        <Popover>
          <PopoverTrigger
            popoverKey="activity-overview-menu"
            label="메뉴 열기"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-50"
          >
            <MoreIcon className="h-7 w-7" />
          </PopoverTrigger>
          <ActivityMenu experience={experience} onEdit={onEdit} onDelete={onDelete} />
        </Popover>
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
    </section>
  );
};
