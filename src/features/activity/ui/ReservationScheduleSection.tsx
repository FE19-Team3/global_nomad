import Divider from '@/shared/ui/Divider/Divider';
import Input from '@/shared/ui/Input/Input';
import Label from '@/shared/ui/Label';
import { Select } from '@/shared/ui/Select';

const ReservationScheduleSection = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="grid grid-cols-[1fr_140px_12px_140px_44px] gap-2 mb-2">
        <Label htmlFor="date" className="text-m-16 text-gray-800">
          날짜
        </Label>
        <p className="text-m-16 text-gray-800">시작 시간</p>
        <div />
        <p className="text-m-16 text-gray-800">종료 시간</p>
        <div />
      </div>

      {/* 입력 영역 */}
      <form
        className="grid grid-cols-[1fr_140px_12px_140px_44px] items-center gap-2 mb-4"
        onSubmit={handleSubmit}
      >
        <Input id="date" type="date" placeholder="yy/mm/dd" />

        <Select.Root>
          <Select.Trigger variant="input-like" placeholder="00:00" />
          <Select.Content>
            <Select.Item value="12:00">12:00</Select.Item>
            <Select.Item value="13:00">13:00</Select.Item>
          </Select.Content>
        </Select.Root>

        <span className="text-center text-gray-400">-</span>

        <Select.Root>
          <Select.Trigger variant="input-like" placeholder="00:00" />
          <Select.Content>
            <Select.Item value="12:00">12:00</Select.Item>
            <Select.Item value="13:00">13:00</Select.Item>
          </Select.Content>
        </Select.Root>

        <button
          type="submit"
          className="cursor-pointer bg-primary text-white w-11 h-11 rounded-full flex items-center justify-center text-2xl hover:opacity-90"
        >
          +
        </button>
      </form>

      <Divider className="my-6 border-gray-100" />

      {/* 등록된 리스트 영역 */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <dl key={index} className="grid grid-cols-[1fr_140px_12px_140px_44px] items-center gap-2">
            <dt className="sr-only">날짜</dt>
            <dd className="flex items-center w-full text-gray-950 placeholder-gray-400 focus:outline-none transition-all duration-150 border border-gray-100 bg-white shadow-[0px_2px_6px_0px_#00000005] focus:border-gray-500 h-13.5 px-5 rounded-xl">
              {index === 0 ? '2026. 01. 23.' : '2026. 01. 24.'}
            </dd>

            <dt className="sr-only">시작 시간</dt>
            <dd className="flex items-center w-full text-gray-950 placeholder-gray-400 focus:outline-none transition-all duration-150 border border-gray-100 bg-white shadow-[0px_2px_6px_0px_#00000005] focus:border-gray-500 h-13.5 px-5 rounded-xl">
              12:00
            </dd>

            <dt className="sr-only">구분</dt>
            <dd className="text-center text-gray-400">-</dd>

            <dt className="sr-only">종료 시간</dt>
            <dd className="flex items-center w-full text-gray-950 placeholder-gray-400 focus:outline-none transition-all duration-150 border border-gray-100 bg-white shadow-[0px_2px_6px_0px_#00000005] focus:border-gray-500 h-13.5 px-5 rounded-xl">
              13:00
            </dd>

            <button
              type="button"
              aria-label="예약 시간 삭제"
              className="cursor-pointer bg-gray-100 text-gray-400 w-11 h-11 rounded-full flex items-center justify-center text-2xl hover:bg-gray-200"
            >
              -
            </button>
          </dl>
        ))}
      </div>
    </div>
  );
};

export default ReservationScheduleSection;
