import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useRef } from 'react';

import { UpdateProfileImageView } from '@/features/profile/components/UpdateProfileImage/UpdateProfileImageView';

const meta: Meta<typeof UpdateProfileImageView> = {
  title: 'Profile/UpdateProfileImage',
  component: UpdateProfileImageView,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof UpdateProfileImageView>;

/**
 * file input ref는 실제로 동작할 필요 없으니
 * 스토리 내부에서 더미 ref만 만들어서 전달
 */
const FileInputRefWrapper = (args: any) => {
  const ref = useRef<HTMLInputElement>(null);
  return <UpdateProfileImageView {...args} fileInputRef={ref} />;
};

export const Default: Story = {
  render: (args) => <FileInputRefWrapper {...args} />,
  args: {
    displayImage: '/default-profile.svg',
    isPending: false,
    showRemoveBtn: false,
    onPickFile: () => {
      console.warn('pick file');
    },
    onRemove: () => {
      console.warn('remove image');
    },
    onFileChange: () => {
      console.warn('file changed');
    },
  },
};

export const WithCurrentImage: Story = {
  render: (args) => <FileInputRefWrapper {...args} />,
  args: {
    displayImage:
      'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2025/04/29/7b72e65a-eeb0-4810-8b36-e026dc210c47.jpg',
    isPending: false,
    showRemoveBtn: false,
    onPickFile: () => {},
    onRemove: () => {},
    onFileChange: () => {},
  },
};

export const UploadedImage: Story = {
  render: (args) => <FileInputRefWrapper {...args} />,
  args: {
    displayImage: 'https://www.behindpress.com/news/photo/202307/40128_56872_431.jpg',
    isPending: false,
    showRemoveBtn: true,
    onPickFile: () => {},
    onRemove: () => {
      alert('remove clicked');
    },
    onFileChange: () => {},
  },
};
