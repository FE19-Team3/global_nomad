import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import CategoryIcon from '@/shared/assets/icons/ic_bell_on.svg';
import { Checkbox } from '@/shared/ui/CheckBox/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/CategoryCheckbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const categories = [
  { label: '문화·예술' },
  { label: '음식', icon: <CategoryIcon /> },
  { label: '투어', icon: <CategoryIcon /> },
  { label: '관광', icon: <CategoryIcon /> },
  { label: '체험', icon: <CategoryIcon /> },
];

const CategoryCheckboxExample = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (label: string, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, label] : prev.filter((v) => v !== label)));
  };

  return (
    <div className="flex flex-wrap gap-2">
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
  );
};

export const CategoryExample: Story = {
  render: () => <CategoryCheckboxExample />,
};
