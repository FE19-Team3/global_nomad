import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ProfileEditForm } from '@/widgets/mypage/ProfileEditForm/form/ProfileEdit.form';

// ✅ Storybook에서 React Query 훅이 터지지 않게 Provider로 감싸기
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const meta: Meta<typeof ProfileEditForm> = {
  title: 'mypage/ProfileEditForm/ProfileEditForm',
  component: ProfileEditForm,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '닉네임/비밀번호/비밀번호 확인을 입력받는 폼. 닉네임과 비밀번호는 useField로 blur 시 검증, 비밀번호 확인은 onBlurConfirm에서 setTouched + setError로 검증함.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileEditForm>;

export const Default: Story = {
  args: {
    nickname: 'nick',
    email: 'nick@example.com',
    currentImageUrl: null,
    onSubmit: (values: { nickname: string; password: string }) => {
      alert(`submit\nnickname=${values.nickname}\npassword=${values.password}`);
    },
  },
};
