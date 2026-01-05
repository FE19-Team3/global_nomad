import Text from '@/shared/ui/Text';

// CSS - scoped 해당 파일에서만 사용하도록 정의
const heroKeyframes = `
  @keyframes hero-shake {
    0% { transform: scale(1.4) translate(-10%, -5%) }
    25% { transform: scale(1.2) translate(8%, 12%) }
    50% { transform: scale(1.3) translate(-12%, 10%) }
    75% { transform: scale(1.1) translate(5%, -8%) }
    100% { transform: scale(1) translate(0, 0) }
  }
  @keyframes hero-slide-up {
    from { opacity: 0; transform: translateY(0); }
    to { opacity: 1; transform: translateY(-20px); }
  }
`;

const MainHero = () => {
  return (
    <div className="relative flex flex-col items-center overflow-hidden w-full h-125 rounded-3xl bg-gray-100">
      <style>{heroKeyframes}</style>

      {/* 이미지 */}
      <div className="absolute -inset-[20%] animate-[hero-shake_2.8s_cubic-bezier(0.19,1,0.22,1)_forwards]">
        {/* 임시 이미지 */}
        <img
          src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=2070"
          alt="임시 이미지"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* 텍스트 */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mt-80 opacity-0 animate-[hero-slide-up_1s_ease-out_1.5s_forwards]">
          <Text.B32 className="text-white-force text-shadow-lg">
            함께 배우면 즐거운 스트릿 댄스
          </Text.B32>
        </div>
        <div className="mt-5 opacity-0 animate-[hero-slide-up_1s_ease-out_1.7s_forwards]">
          <Text.B18 className="text-white-force text-shadow-md">1월의 인기 체험 BEST 🔥</Text.B18>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
