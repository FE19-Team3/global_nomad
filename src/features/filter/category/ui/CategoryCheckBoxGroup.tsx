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
    <div className="overflow-x-auto custom-scrollbar py-1 px-1 min-w-0 flex-1">
      <div className="inline-flex gap-2">
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
