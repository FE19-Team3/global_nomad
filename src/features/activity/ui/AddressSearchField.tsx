'use client';

import Image from 'next/image';
import Script from 'next/script';
import { useFormContext } from 'react-hook-form';

import Icon from '@/shared/assets/icons/ic_search.png';
import type { CreateActivityFormValues } from '@/shared/schema/activity';
import { useModalStore } from '@/shared/stores/useModalStore';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';

const buildFullAddress = (data: {
  address?: string;
  roadAddress?: string;
  jibunAddress?: string;
  bname?: string;
  buildingName?: string;
}) => {
  const base = data.roadAddress || data.address || data.jibunAddress || '';
  const extras = [data.bname, data.buildingName].filter(Boolean).join(', ');
  if (!extras) return base;
  return `${base} (${extras})`;
};

const AddressSearchField = () => {
  const { openAlert } = useModalStore();
  const {
    register,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext<CreateActivityFormValues>();

  const addressValue = watch('address') ?? '';
  const detailAddressValue = watch('detailAddress') ?? '';
  const baseAddress = addressValue.split(',')[0]?.trim() ?? '';

  const handleSearch = () => {
    if (!window.daum?.Postcode) {
      openAlert('주소 검색을 불러오는 중입니다. 잠시만 기다려 주세요.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        const address = buildFullAddress(data);
        const merged = detailAddressValue ? `${address}, ${detailAddressValue}` : address;
        setValue('address', merged, { shouldDirty: true, shouldValidate: true });
        clearErrors('address');
      },
    }).open();
  };

  const handleDetailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const detail = e.target.value;
    const merged = detail ? `${baseAddress}, ${detail}` : baseAddress;
    setValue('address', merged, { shouldDirty: true, shouldValidate: true });
    setValue('detailAddress', detail, { shouldDirty: true, shouldValidate: false });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input type="hidden" {...register('address')} />
        <div className="flex-1">
          <Input
            id="address"
            placeholder="주소를 검색해 주세요"
            readOnly
            value={baseAddress}
            error={!!errors.address}
            errorMsg={errors.address?.message}
          />
        </div>
        <Button
          iconOnly
          className="px-3"
          type="button"
          aria-label="검색하기"
          onClick={handleSearch}
        >
          <Button.Icon>
            <Image src={Icon} alt="검색" width={24} height={24} />
          </Button.Icon>
        </Button>
      </div>
      <Input
        id="detailAddress"
        placeholder="상세 주소를 입력해 주세요"
        value={detailAddressValue}
        onChange={handleDetailChange}
      />
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />
    </div>
  );
};

export default AddressSearchField;
