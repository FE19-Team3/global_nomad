const PopularSection = () => {
  return (
    <div className="relative mt-5">
      {/* 아래 내용들을 지우고 실제 요소로 작성 */}
      <div className="rounded-full w-13.5 h-13.5 border absolute -left-6.5 top-1/2 -translate-y-1/2" />
      <div className="flex gap-6">
        <div className="w-78 h-91.5 rounded-3xl border" />
        <div className="w-78 h-91.5 rounded-3xl border" />
        <div className="w-78 h-91.5 rounded-3xl border" />
        <div className="w-78 h-91.5 rounded-3xl border" />
      </div>
      <div className="rounded-full w-13.5 h-13.5 border absolute -right-6.5 top-1/2 -translate-y-1/2" />
    </div>
  );
};

export default PopularSection;
