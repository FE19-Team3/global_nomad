import Divider from '@/shared/ui/Divider/Divider';
import Input from '@/shared/ui/Input/Input';
import Label from '@/shared/ui/Label';
import { Select } from '@/shared/ui/Select';

const ReservationScheduleSection = () => {
  return (
    <div>
      {/* 입력 영역 */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Label className="text-xs mb-2 block text-gray-500">날짜</Label>
          <Input type="date" placeholder="yy/mm/dd" />
        </div>
        <div className="flex items-center gap-1 w-100">
          <Select.Root>
            <Select.Trigger variant="input-like" placeholder="12:00" />
            <Select.Content>
              <Select.Item value="12:00">12:00</Select.Item>
              <Select.Item value="13:00">13:00</Select.Item>
            </Select.Content>
          </Select.Root>
          -
          <Select.Root>
            <Select.Trigger variant="input-like" placeholder="12:00" />
            <Select.Content>
              <Select.Item value="13:00">13:00</Select.Item>
              <Select.Item value="14:00">14:00</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <button
          type="button"
          className="bg-primary text-white w-11 h-11 rounded-full mb-1 flex items-center justify-center text-2xl hover:bg-primary"
        >
          +
        </button>
      </div>

      <Divider className="my-5" />

      {/* 등록된 리스트 영역 */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                disabled
                value={index === 0 ? '2026. 01. 23.' : '2026. 01. 24.'}
                className="bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-1 w-100">
              <Select.Root disabled>
                <Select.Trigger variant="input-like" placeholder="12:00" />
                <Select.Content>
                  <Select.Item value="12:00">12:00</Select.Item>
                  <Select.Item value="13:00">13:00</Select.Item>
                </Select.Content>
              </Select.Root>
              -
              <Select.Root disabled>
                <Select.Trigger variant="input-like" placeholder="13:00" />
                <Select.Content>
                  <Select.Item value="13:00">13:00</Select.Item>
                  <Select.Item value="14:00">14:00</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
            <button
              type="button"
              className="bg-gray-50 text-black w-11 h-11 rounded-full flex items-center justify-center text-2xl hover:bg-gray-200"
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
