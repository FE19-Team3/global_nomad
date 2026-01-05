import { Meta, StoryObj } from '@storybook/nextjs-vite';

import PopoverContent from '@/shared/ui/Popover/Content';
import Popover from '@/shared/ui/Popover/Popover';
import PopoverTrigger from '@/shared/ui/Popover/Trigger';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;

export const Default: StoryObj<typeof Popover> = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger popoverKey="trigger1" label="Open Popover">
        <div className="border px-2 py-1 rounded hover:bg-gray-100">Open</div>
      </PopoverTrigger>
      <PopoverContent popoverKey="trigger1">
        <div className="cursor-pointer hover:bg-gray-50">Popover Content</div>
        <div className="cursor-pointer hover:bg-gray-50">Popover Content</div>
        <div className="cursor-pointer hover:bg-gray-50">Popover Content</div>
      </PopoverContent>
    </Popover>
  ),
};
