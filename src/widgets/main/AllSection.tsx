const AllSection = () => {
  return (
    <div className="flex flex-col items-center mt-5">
      {/* header */}
      <div className="flex justify-between mb-7.5 w-full">
        <div className="flex gap-5">
          <span className="border rounded-full px-2 py-1">뱃지</span>
          <span className="border rounded-full px-2 py-1">뱃지</span>
          <span className="border rounded-full px-2 py-1">뱃지</span>
          <span className="border rounded-full px-2 py-1">뱃지</span>
          <span className="border rounded-full px-2 py-1">뱃지</span>
        </div>
        <div>가격 ▼</div>
      </div>
      {/* body */}
      <div className="w-full">
        <div className="flex gap-6 mb-5">
          <div className="w-78 h-91.5 rounded-3xl border" />
          <div className="w-78 h-91.5 rounded-3xl border" />
          <div className="w-78 h-91.5 rounded-3xl border" />
          <div className="w-78 h-91.5 rounded-3xl border" />
          <div className="w-78 h-91.5 rounded-3xl border" />
        </div>
        <div className="flex gap-6 mb-5">
          <div className="w-78 h-91.5 rounded-3xl border" />
          <div className="w-78 h-91.5 rounded-3xl border" />
          <div className="w-78 h-91.5 rounded-3xl border" />
          <div className="w-78 h-91.5 rounded-3xl border" />

          <div className="w-78 h-91.5 rounded-3xl border" />
        </div>
        <div className="flex gap-6 mb-5">
          <div className="w-78 h-91.5 rounded-3xl border" />
          <div className="w-78 h-91.5 rounded-3xl border" />
          <div className="w-78 h-91.5 rounded-3xl border" />
          <div className="w-78 h-91.5 rounded-3xl border" />

          <div className="w-78 h-91.5 rounded-3xl border" />
        </div>
      </div>
      {/* pagination */}
      <div className="border w-76 h-10"></div>
    </div>
  );
};

export default AllSection;
