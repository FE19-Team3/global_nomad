'use client';

import { useModalStore } from '@/shared/stores/useModalStore';
import Modal from '@/shared/ui/Modal';
import Text from '@/shared/ui/Text';

const ModalTest = () => {
  const { openModal } = useModalStore();

  return (
    <div className="w-full min-h-screen flex justify-center items-center border border-gray-300">
      <button onClick={openModal}>모달 열기</button>
      <Modal>
        <Text.B18 as="p">비밀번호가 일치하지 않습니다.</Text.B18>
        <button>확인</button>
      </Modal>
    </div>
  );
};

export default ModalTest;
