import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { PAGE_SIZE_MAP } from '../shared/ui/Pagination/model/types';
import { Pagination } from '../shared/ui/Pagination/ui/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationStoryWrapper = (props: {
  pageType: keyof typeof PAGE_SIZE_MAP;
  totalCount: number;
}) => {
  const { pageType, totalCount } = props;
  const pageSize = PAGE_SIZE_MAP[pageType];

  const [page, setPage] = useState(1);

  const offset = (page - 1) * pageSize;

  return (
    <div className="w-[420px] space-y-4">
      <div className="text-xs text-gray-600">
        page: <b>{page}</b> / size: <b>{pageSize}</b> / offset: <b>{offset}</b> / total:{' '}
        <b>{totalCount}</b>
      </div>

      <Pagination
        currentPage={page}
        pageType={pageType}
        totalCount={totalCount}
        onPageChange={(nextPage) => {
          setPage(nextPage);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <PaginationStoryWrapper pageType="main" totalCount={203} />,
};

export const SmallPageSize: Story = {
  name: 'Small page size (review)',
  render: () => <PaginationStoryWrapper pageType="review" totalCount={27} />,
};

export const SinglePage: Story = {
  render: () => <PaginationStoryWrapper pageType="main" totalCount={10} />,
};

export const ZeroItem: Story = {
  render: () => <PaginationStoryWrapper pageType="main" totalCount={0} />,
};
