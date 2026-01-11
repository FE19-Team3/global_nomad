import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useRef } from 'react';

import { UpdateProfileImageView } from '@/features/profile/components/UpdateProfileImage/UpdateProfileImageView';
import { SideNav } from '@/widgets/side-nav/ui/side-nav';

const ProfileImageHeader = ({ imageUrl }: { imageUrl: string | null }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <UpdateProfileImageView
      displayImage={imageUrl || '/default-profile.svg'}
      isPending={false}
      showRemoveBtn={false}
      onPickFile={() => console.log('Pick file')}
      onRemove={() => console.log('Remove')}
      fileInputRef={ref}
      onFileChange={() => console.log('File changed')}
    />
  );
};

const meta = {
  title: 'Widgets/SideNav',
  component: SideNav,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/side',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[384px] min-h-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof SideNav>;

export const Default: Story = {
  args: {
    header: <ProfileImageHeader imageUrl={null} />,
  },
};

export const WithProfileImage: Story = {
  args: {
    header: (
      <ProfileImageHeader imageUrl="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2025/04/29/7b72e65a-eeb0-4810-8b36-e026dc210c47.jpg" />
    ),
  },
};

export const BookingPage: Story = {
  args: {
    header: <ProfileImageHeader imageUrl={null} />,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/booking',
      },
    },
  },
};

export const MyExperiencePage: Story = {
  args: {
    header: <ProfileImageHeader imageUrl={null} />,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/my-experience',
      },
    },
  },
};

export const BookingStatusPage: Story = {
  args: {
    header: <ProfileImageHeader imageUrl={null} />,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/booking-status',
      },
    },
  },
};
