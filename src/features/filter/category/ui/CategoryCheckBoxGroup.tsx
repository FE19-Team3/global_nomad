'use client';

import { ActivityCategoryValues } from '@/shared/constants/activity';
import { Checkbox } from '@/shared/ui/CheckBox/Checkbox';

interface Props {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CategoryCheckBoxGroup = ({ selected, setSelected }: Props) => {
  const toggle = (label: string, checked: boolean) => {
    setSelected((prev: string[]) => (checked ? [...prev, label] : prev.filter((v) => v !== label)));
  };
  return (
    <div className="flex-1 overflow-x-auto custom-scrollbar py-1 px-1">
      <div className="flex gap-2 min-w-fit">
        {ActivityCategoryValues.map(({ value, label, icon }) => (
          <Checkbox
            key={value}
            label={label}
            icon={icon}
            checked={selected.includes(value)}
            onChange={(checked) => toggle(value, checked)}
          />
        ))}
      </div>
    </div>
  );
};
