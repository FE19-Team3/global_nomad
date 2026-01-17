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
    <main className="bg-[linear-gradient(180deg,#BBDDFF_-6.85%,#F7FBFF_22.43%,#FFFFFF_100%)]">
      <div className="flex-1 mx-auto w-full max-w-350 px-6 py-26 md:px-10">
        <div className="mb-11">
          <MainHero />
        </div>
        {/* 검색 */}
        <section className="flex flex-col items-center gap-9 mb-7 py-8 px-10">
          <Text.B16 as="h2" className="md:text-[32px] md:font-bold">
            무엇을 체험하고 싶으신가요?
          </Text.B16>
          <SearchForm onSearch={handleSearch} />
        </section>

        {searchKeyword ? (
          <SearchSection keyword={searchKeyword} />
        ) : (
          <div>
            <section className="mb-13">
              <PopularSection />
            </section>
            <section>
              <AllSection initialData={initialData} />
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;
