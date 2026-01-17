import { Skeleton } from '@/shared/ui/Skeleton';

const MyActivityCardSkeleton = () => {
  return (
    <article className="relative flex bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]">
      <div className="flex flex-col flex-1 px-6 py-8 md:pl-10 md:pr-0 gap-3">
        <Skeleton.Row width="60%" height={20} className="rounded-full" />
        <div className="flex items-center gap-2">
          <Skeleton.Circle size={20} />
          <Skeleton.Row width={60} height={16} className="rounded-full" />
        </div>
        <Skeleton.Row width={120} height={20} className="rounded-full" />
        <div className="flex w-full items-center gap-2 mt-2">
          <Skeleton.Row width={120} height={36} className="rounded-md" />
          <Skeleton.Row width={120} height={36} className="rounded-md" />
        </div>
      </div>
      <div className="absolute right-6 top-6 shrink-0 md:m-8 h-24 w-24 md:h-auto md:w-35 order-2 overflow-hidden md:relative md:right-auto md:top-auto">
        <Skeleton.Rect width="100%" height="100%" className="rounded-xl md:rounded-4xl" />
      </div>
    </article>
  );
};

export default MyActivityCardSkeleton;
