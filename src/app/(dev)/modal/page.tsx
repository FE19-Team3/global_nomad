'use client';

import { useState } from 'react';

import StarIcon from '@/shared/assets/images/modal/modal-star.svg';
import { useModalStore } from '@/shared/stores/useModalStore';
import Text from '@/shared/ui/Text';

const ReviewModal = () => {
  const { openConfirm } = useModalStore();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-y-1.5 items-center justify-between w-full">
        <Text.B16>함께 배우면 즐거운 스트릿 댄스</Text.B16>
        <Text.M14>2023. 02. 14 / 11:00 - 12:30 (10명)</Text.M14>
      </div>

      <div className="flex justify-center gap-1.5 mt-3.5">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = hover >= n || rating >= n;

          return (
            <StarIcon
              key={n}
              className={`
                w-8 h-8 cursor-pointer transition-transform
                ${active ? 'text-yellow-400' : 'text-gray-100'}
              `}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(n)}
            />
          );
        })}
      </div>

      <div className="flex flex-col my-7.5">
        <Text.B18 className="mb-4">소중한 경험을 들려주세요</Text.B18>
        <textarea
          className="w-full h-45 border border-gray-100 text-base text-gray-900 font-medium shadow-lg rounded-lg p-5 resize-none"
          placeholder="리뷰를 입력해주세요."
        />
        <Text.M14 className="mt-2 text-right">0/100</Text.M14>
      </div>

      <button
        className="w-full bg-blue-500 text-white py-3 rounded-xl disabled:opacity-30"
        disabled={rating === 0}
      >
        리뷰 등록하기(컴포넌트로 교체 필요)
      </button>

      <button
        onClick={() =>
          openConfirm({
            message: '정말 등록하시겠습니까?',
            onConfirm: () => console.log('등록!'),
          })
        }
      >
        2단 확인 모달 열기
      </button>
    </div>
  );
};

const ModalTest = () => {
  const { openAlert, openConfirm, openBaseModal } = useModalStore();

  return (
    <div className="p-10 flex flex-col gap-4">
      <button
        onClick={() => openAlert({ message: '비밀번호가 틀렸습니다.' })}
        className="border px-4 py-2 rounded"
      >
        Alert 열기
      </button>

      <button
        onClick={() =>
          openConfirm({
            message: '정말 삭제하시겠습니까?',
            onConfirm: () => console.log('삭제됨'),
          })
        }
        className="border px-4 py-2 rounded"
      >
        Confirm 열기
      </button>

      <button
        onClick={() =>
          openBaseModal({
            content: <ReviewModal />,
            showCloseButton: true,
          })
        }
        className="border px-4 py-2 rounded"
      >
        리뷰 모달 열기
      </button>
    </div>
  );
};

export default ModalTest;
