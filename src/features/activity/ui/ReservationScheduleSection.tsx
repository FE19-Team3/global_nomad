import Divider from '@/shared/ui/Divider/Divider';
import Input from '@/shared/ui/Input/Input';
import Label from '@/shared/ui/Label';
import { Select } from '@/shared/ui/Select';

const ReservationScheduleSection = () => {
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
      <div className="grid grid-cols-[1fr_140px_12px_140px_44px] items-center gap-2 mb-4">
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
          type="button"
          className="bg-primary text-white w-11 h-11 rounded-xl flex items-center justify-center text-2xl hover:opacity-90"
        >
          +
        </button>
      </div>

      <Divider className="my-6 border-gray-100" />

      {/* 등록된 리스트 영역 */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_140px_12px_140px_44px] items-center gap-2"
          >
            <Input
              disabled
              value={index === 0 ? '2026. 01. 23.' : '2026. 01. 24.'}
              className="bg-gray-50 border-none"
            />

            <Select.Root disabled>
              <Select.Trigger variant="input-like" placeholder="12:00" />
            </Select.Root>

            <span className="text-center text-gray-400">-</span>

            <Select.Root disabled>
              <Select.Trigger variant="input-like" placeholder="13:00" />
            </Select.Root>

            <button
              type="button"
              className="bg-gray-100 text-gray-400 w-11 h-11 rounded-xl flex items-center justify-center text-2xl hover:bg-gray-200"
            >
              -
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationScheduleSection;
