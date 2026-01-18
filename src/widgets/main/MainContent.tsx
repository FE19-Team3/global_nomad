'use client';

import { useState } from 'react';

import { ActivityListResponse } from '@/features/activity/activity-list/schema/activity-list.schema';
import SearchForm from '@/features/main/SearchForm/SearchForm';
import Text from '@/shared/ui/Text';
import MainHero from '@/widgets/main/MainHero';

import AllSection from './AllSection';
import PopularSection from './PopularSection';
import SearchSection from './SearchSection';

const MainContent = ({ initialData }: { initialData: ActivityListResponse }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <main className="bg-[linear-gradient(180deg,#f7dba2_-6.85%,#fffff7_22.43%,#FFFFFF_100%)] [[data-theme='dark']_&]:bg-[linear-gradient(180deg,#f7dba2_-6.85%,#000007_22.43%,#000000_100%)] overflow-x-hidden">
      <div className="w-full md:mx-auto md:max-w-350 px-6 py-10 md:px-10">
        <div className="mb-11 w-full">
          <MainHero />
        </div>
        {/* 검색 */}
        <section className="flex flex-col items-center gap-9 mb-7 py-8 px-4 md:px-10 w-full">
          <Text.B16 as="h2" className="md:text-[32px] md:font-bold text-center">
            무엇을 체험하고 싶으신가요?
          </Text.B16>
          <div className="w-full max-w-full">
            <SearchForm onSearch={handleSearch} />
          </div>
        </section>

        {searchKeyword ? (
          <div className="w-full">
            <SearchSection keyword={searchKeyword} />
          </div>
        ) : (
          <div className="w-full">
            <section className="mb-13 w-full">
              <PopularSection />
            </section>
            <section className="w-full">
              <AllSection initialData={initialData} />
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;
