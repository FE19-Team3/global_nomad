import ImageDelete from '@/shared/assets/images/icons/icon-image-delete.svg';

const UploadIntroImage = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {/* 이미지 추가 */}
      <label className="flex flex-col items-center justify-center w-32 h-32 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl text-gray-300">+</span>
          <span className="text-gray-400 text-sm">0 / 4</span>
        </div>
        <input type="file" className="hidden" accept="image/*" />
      </label>

      {/* 미리보기 */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="relative w-32 h-32 group" key={index}>
          <div className="w-full h-full object-cover rounded-xl border border-gray-100 shadow-sm">
            {/* 이미지 넣을 곳 */}
          </div>
          <button
            type="button"
            className="absolute -top-3 -right-3 bg-gray-800 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md"
          >
            <ImageDelete className="text-white" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default UploadIntroImage;
