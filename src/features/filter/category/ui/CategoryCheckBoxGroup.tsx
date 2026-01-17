'use client';

import { ActivityCategory, ActivityCategoryValues } from '@/shared/constants/activity';
import { Checkbox } from '@/shared/ui/CheckBox/Checkbox';

interface Props {
  selected?: ActivityCategory;
  setSelected: React.Dispatch<React.SetStateAction<ActivityCategory | undefined>>;
}

export const CategoryCheckBoxGroup = ({ selected, setSelected }: Props) => {
  const handleChange = (category: ActivityCategory, checked: boolean) => {
    setSelected(checked ? category : undefined);
  };

  return (
    <div className="flex-1 overflow-x-auto custom-scrollbar py-1 px-1">
      <div className="flex gap-2 min-w-fit">
        {ActivityCategoryValues.map((category) => (
          <Checkbox
            key={category.value}
            label={category.label}
            icon={category.icon}
            checked={selected?.value === category.value}
            onChange={(checked) => handleChange(category, checked)}
          />
        ))}
      </div>
    </div>
  );
};
