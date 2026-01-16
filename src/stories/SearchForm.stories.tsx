import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SearchForm from '@/features/main/SearchForm/SearchForm';

const meta = {
  title: 'Components/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchForm>;

export default meta;

export const Default: StoryObj<typeof SearchForm> = {
  render: () => (
    <div
      className="bg-[linear-gradient(180deg,#BBDDFF_-6.85%,#F7FBFF_22.43%,#FFFFFF_100%)] p-10"
      data-testid="search-form-submit"
    >
      <SearchForm onSearch={(keyword) => console.log(keyword)} />
    </div>
  ),
};
