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

export const OnlyMainImage: Story = {
  args: {
    subImageUrls: ['/sub1.png'],
  },
};

export const OneSubImage: Story = {
  args: {
    subImageUrls: ['/sub1.png', '/sub2.png'],
  },
};

export const TwoSubImages: Story = {
  args: {
    subImageUrls: ['/sub1.png', '/sub2.png', '/sub3.png'],
  },
};

export const ThreeSubImages: Story = {
  args: {
    subImageUrls: ['/sub1.png', '/sub2.png', '/sub3.png', '/sub4.png'],
  },
};

export const FourSubImages: Story = {
  args: {
    subImageUrls: ['/sub1.png', '/sub2.png', '/sub3.png', '/sub4.png', '/sub5.png'],
  },
};
