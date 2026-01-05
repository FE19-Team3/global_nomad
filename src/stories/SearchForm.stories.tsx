import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SearchForm from '@/features/main/SearchForm/SearchForm';

const meta = {
  title: 'Components/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SearchForm>;

export default meta;

export const Default: StoryObj<typeof SearchForm> = {
  render: () => (
    <div data-testid="search-form-submit">
      <SearchForm />
    </div>
  ),
};
