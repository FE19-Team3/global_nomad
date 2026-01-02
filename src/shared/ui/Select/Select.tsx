'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

import { cn } from '@/shared/lib/cn';

import { styles } from './Select.styles';
import { SelectRootProps } from './Select.types';
import { SelectContext } from './SelectContext';

const Select = ({
  children,
  value: controlledValue, // 외부에서 value를 넘겨주면 "제어 컴포넌트"
  defaultValue = '', // 제어하지 않을 때 사용할 초기 값
  onValueChange, // 값이 바뀔 때 외부로 알려주는 콜백
  open: controlledOpen, // 외부에서 open 상태를 제어할 수 있음
  defaultOpen = false, // 제어하지 않을 때의 초기 open 값
  onOpenChange, // 열림/닫힘 변경 시 외부로 알림
  disabled = false,
}: SelectRootProps) => {
  // 제어하지 않을 때 사용하는 내부 value 상태
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  // 제어하지 않을 때 사용하는 내부 open 상태
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  // Trigger(button) DOM을 참조하기 위한 ref (외부 클릭 감지에 사용)
  const triggerRef = useRef<HTMLButtonElement>(null);
  const slots = styles();

  // value를 외부에서 제어하는지 여부
  const isControlled = controlledValue !== undefined;
  // open 상태를 외부에서 제어하는지 여부
  const isOpenControlled = controlledOpen !== undefined;

  // 실제로 사용할 value: 제어면 controlledValue 아니면 내부 state
  const value = isControlled ? controlledValue : uncontrolledValue;
  // 실제로 사용할 open 상태
  const open = isOpenControlled ? controlledOpen : uncontrolledOpen;

  /**
   * open 상태 변경 함수
   * - disabled면 아무 동작 안 함
   * - open이 제어되지 않으면 내부 state 변경
   * - 항상 외부 콜백(onOpenChange) 호출
   */
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (disabled) return;
      // 제어 컴포넌트가 아니면 내부 state 변경
      if (!isOpenControlled) setUncontrolledOpen(newOpen);
      onOpenChange?.(newOpen);
    },
    [disabled, isOpenControlled, onOpenChange],
  );

  /**
   * value 변경 함수
   * - 제어 컴포넌트가 아니면 내부 value 변경
   * - 외부 콜백 호출
   * - 값 선택 후 Select는 닫힘
   */
  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) setUncontrolledValue(newValue);
      onValueChange?.(newValue);
      handleOpenChange(false);
    },
    [isControlled, onValueChange, handleOpenChange],
  );

  /**
   * 외부 클릭 시 Select 닫기
   * - open 상태일 때만 이벤트 등록
   * - trigger 영역 밖을 클릭하면 닫힘
   */
  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        handleOpenChange(false);
      }
    };

    document.addEventListener('click', onClick);
    // 컴포넌트 언마운트 or open 변경 시 이벤트 제거
    return () => document.removeEventListener('click', onClick);
  }, [open, handleOpenChange]);

  return (
    <SelectContext.Provider
      value={{
        value,
        open,
        disabled,
        onValueChange: handleValueChange,
        onOpenChange: handleOpenChange,
        triggerRef,
      }}
    >
      <div className={cn(slots.base())}>{children}</div>
    </SelectContext.Provider>
  );
};

export default Select;
