import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ProfileEditForm } from '@/widgets/mypage/ProfileEditForm/form/ProfileEdit.form';

const meta: Meta<typeof ProfileEditForm> = {
  title: 'mypage/ProfileEditForm/ProfileEditForm',
  component: ProfileEditForm,
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
    onCancel: () => alert('cancel'),
    onSubmit: (values: { nickname: string; password: string }) => {
      alert(`submit\nnickname=${values.nickname}\npassword=${values.password}`);
    },
  },
};
