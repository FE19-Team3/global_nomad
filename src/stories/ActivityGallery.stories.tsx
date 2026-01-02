import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ActivityGallery } from '@/widgets/gallery/ActivityGallery';

const meta: Meta<typeof ActivityGallery> = {
  title: 'Widgets/ActivityGallery',
  component: ActivityGallery,
  decorators: [
    (Story) => (
      <div className="w-[670px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ActivityGallery>;

export const Empty: Story = {
  args: { subImageUrls: [] },
};

export const OneImage: Story = {
  args: { subImageUrls: ['/sub1.png'] },
};

export const TwoImages: Story = {
  args: { subImageUrls: ['/sub1.png', '/sub2.png'] },
};

export const ThreeImages: Story = {
  args: { subImageUrls: ['/sub1.png', '/sub2.png', '/sub3.png'] },
};

export const FourImages: Story = {
  args: { subImageUrls: ['/sub1.png', '/sub2.png', '/sub3.png', '/sub4.png'] },
};
