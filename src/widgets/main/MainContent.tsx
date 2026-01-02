import Text from '@/shared/ui/Text';

import AllSection from './AllSection';
import PopularSection from './PopularSection';

const MainContent = () => {
  return (
    <div className="flex flex-col justify-center max-w-330">
      <div className="mb-11">
        {/* <MainHero /> */}
        <div className="border w-full h-125 rounded-3xl" />
      </div>
      {/* 검색*/}
      <section className="flex flex-col items-center gap-9 mb-7 py-8 px-10">
        <Text.B16 as="h2" className="md:text-[32px] md:font-bold">
          무엇을 체험하고 싶으신가요?
        </Text.B16>
        {/* <SearchInput /> */}
        <div className="w-full border h-17.5" />
      </section>
      <div>
        {/* 인기 체험 */}
        <section className="mb-15">
          <Text.B18 as="h2" className="md:text-[32px] md:font-bold">
            🔥 인기 체험
          </Text.B18>{' '}
          {/* 왜 classname 적용 안되지*/}
          <PopularSection />
        </section>
        {/* 모든 체험 */}
        <section>
          <Text.B18 as="h2" className="md:text-[32px] md:font-bold">
            🛼 모든 체험
          </Text.B18>
          <AllSection />
        </section>
      </div>
    </div>
  );
};

export default MainContent;
