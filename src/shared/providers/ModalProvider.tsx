'use client';

import { useModalStore } from '@/shared/stores/useModalStore';
import AlertDialog from '@/shared/ui/modal/AlertDialog';
import BaseModal from '@/shared/ui/modal/BaseModal';
import ConfirmDialog from '@/shared/ui/modal/ConfirmDialog';

export const ModalProvider = () => {
  const { stack, closeTop } = useModalStore();

  return (
    <>
      {stack.map((modal, i) => {
        const isTop = i === stack.length - 1;

        return (
          <BaseModal
            key={i}
            isOpen
            onClose={isTop ? closeTop : () => {}}
            zIndex={50 + i}
            showCloseButton={modal.type === 'base' && modal.showCloseButton}
          >
            {modal.type === 'base' && modal.content}
            {modal.type === 'alert' && (
              <AlertDialog
                message={modal.message}
                onClose={() => {
                  modal.onClose?.();
                  closeTop;
                }}
              />
            )}
            {modal.type === 'confirm' && (
              <ConfirmDialog
                message={modal.message}
                onCancel={closeTop}
                onConfirm={() => {
                  modal.onConfirm?.();
                  closeTop();
                }}
              />
            )}
          </BaseModal>
        );
      })}
    </>
  );
};
