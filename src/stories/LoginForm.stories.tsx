import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import LoginForm from '@/features/auth/ui/LoginForm/LoginForm';

const meta = {
  title: 'Components/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof LoginForm>;

export default meta;

export const Default: StoryObj<typeof LoginForm> = {
  render: () => {
    const StoryComponent = () => {
      return <LoginForm />;
    };

    return <StoryComponent />;
  },
};
