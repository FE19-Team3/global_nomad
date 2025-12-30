import { Skeleton } from './Skeleton';

const MainCardSkeleton = () => {
  return (
    <div className="flex gap-6 w-full p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="relative justify-end w-full h-[360px] rounded-[32px] bg-gray-100 relative"
        >
          <div className="absolute left-0 bottom-0 bg-white w-full h-[170px] rounded-[32px] p-6 shadow-sm flex flex-col gap-3">
            <Skeleton.Row width="85%" height={22} className="rounded-full" />

            <div className="flex items-center gap-2">
              <Skeleton.Circle size={20} />
              <Skeleton.Row width="20%" height={16} className="rounded-full" />
            </div>

            <div className="mt-4.5">
              <Skeleton.Row width={80} height={24} className="rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainCardSkeleton;
