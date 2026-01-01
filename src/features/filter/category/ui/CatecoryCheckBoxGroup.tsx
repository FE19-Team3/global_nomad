'use client';

import ArtIcon from '@/shared/assets/icons/ic_art.svg';
import BusIcon from '@/shared/assets/icons/ic_bus.svg';
import FoodIcon from '@/shared/assets/icons/ic_food.svg';
import TourIcon from '@/shared/assets/icons/ic_tour.svg';
import WellbeingIcon from '@/shared/assets/icons/ic_wellbeing.svg';
import { Checkbox } from '@/shared/ui/CheckBox/Checkbox';
import { useState } from 'react';

const categories = [
  { label: '문화·예술', icon: <ArtIcon /> },
  { label: '음식', icon: <FoodIcon /> },
  { label: '투어', icon: <BusIcon /> },
  { label: '관광', icon: <TourIcon /> },
  { label: '체험', icon: <WellbeingIcon /> },
];

export const CatecoryCheckBoxGroup = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (label: string, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, label] : prev.filter((v) => v !== label)));
  };
  return (
    <div className="flex-1 overflow-x-auto scrollbar-hide py-1 px-1">
      <div className="flex gap-2 min-w-fit">
        {categories.map(({ label, icon }) => (
          <Checkbox
            key={label}
            label={label}
            icon={icon}
            checked={selected.includes(label)}
            onChange={(checked) => toggle(label, checked)}
          />
        ))}
      </div>
    </div>
  );
};
