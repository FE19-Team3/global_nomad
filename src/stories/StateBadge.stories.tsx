import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import StateBadge, { BadgeVariant, BADGE_CONFIG } from '@/shared/ui/StateBadge';

const meta: Meta<typeof StateBadge> = {
  title: 'Components/StateBadge',
  component: StateBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(BADGE_CONFIG) as BadgeVariant[],
      description: '배지의 상태 타입을 선택합니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StateBadge>;

export const Default: Story = {
  args: {
    variant: 'approve',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-800 rounded-lg">
      {(Object.keys(BADGE_CONFIG) as BadgeVariant[]).map((variant) => (
        <StateBadge key={variant} variant={variant} />
      ))}
    </div>
  ),
};

export const Cancel: Story = { args: { variant: 'cancel' } };
export const Done: Story = { args: { variant: 'done' } };
export const Reject: Story = { args: { variant: 'reject' } };
export const Complete: Story = { args: { variant: 'complete' } };
export const Approve: Story = { args: { variant: 'approve' } };
