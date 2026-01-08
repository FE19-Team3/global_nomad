'use client';

import ReservationScheduleSection from '@/features/activity/ui/ReservationScheduleSection';
import UploadIntroImage from '@/features/activity/ui/UploadIntroImage';
import UploadMainImage from '@/features/activity/ui/UploadMainImage';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import Label from '@/shared/ui/Label';
import { Select } from '@/shared/ui/Select';
import { Text } from '@/shared/ui/Text';
import Textarea from '@/shared/ui/Textarea/Textarea';

const MyActivites = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('등록 완료');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
      <Text.B18 as="h2" className="mb-8">
        내 체험 등록
      </Text.B18>
      <div className="mb-8 flex flex-col gap-6">
        <section>
          <Label htmlFor="title" className="text-b-16 block mb-2">
            제목
          </Label>
          <Input id="title" placeholder="제목을 입력해 주세요" onChange={() => {}} />
        </section>
        <section>
          <Label className="text-b-16 block mb-2">카테고리</Label>
          <Select.Root>
            <Select.Trigger variant="input-like" placeholder="카테고리를 선택해 주세요" />
            <Select.Content>
              <Select.Item value="문화 예술">문화 예술</Select.Item>
              <Select.Item value="식음료">식음료</Select.Item>
              <Select.Item value="스포츠">스포츠</Select.Item>
              <Select.Item value="투어">투어</Select.Item>
              <Select.Item value="관광">관광</Select.Item>
              <Select.Item value="웰빙">웰빙</Select.Item>
            </Select.Content>
          </Select.Root>
        </section>
        <section>
          <Label htmlFor="description" className="text-b-16 block mb-2">
            설명
          </Label>
          <Textarea
            id="description"
            placeholder="체험에 대한 설명을 입력해 주세요"
            onChange={() => {}}
          />
        </section>
        <section>
          <Label htmlFor="price" className="text-b-16 block mb-2">
            가격
          </Label>
          <Input id="price" placeholder="체험 금액을 입력해 주세요" onChange={() => {}} />
        </section>
        <section>
          <Label htmlFor="address" className="text-b-16 block mb-2">
            주소
          </Label>
          <Input id="address" placeholder="주소를 입력해 주세요" onChange={() => {}} />
        </section>
      </div>

      <div className="mb-4 flex flex-col gap-6">
        <fieldset>
          <legend className="text-b-16 block mb-3">예약 가능한 시간대</legend>
          <ReservationScheduleSection />
        </fieldset>

        <fieldset>
          <legend className="text-b-16 block mb-3">메인 이미지 등록</legend>
          <UploadMainImage />
        </fieldset>

        <fieldset>
          <legend className="text-b-16 block mb-2">소개 이미지 등록</legend>
          <UploadIntroImage />
        </fieldset>
      </div>

      <div className="flex justify-center">
        <Button variant="primary" size="sm" className="mx-auto block">
          <Button.Label>등록하기</Button.Label>
        </Button>
      </div>
    </form>
  );
};

export default MyActivites;
