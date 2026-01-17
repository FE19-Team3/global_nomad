import { useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import PlusIcon from '@/shared/assets/icons/ic_add.svg';
import MinusIcon from '@/shared/assets/icons/ic_minus.svg';
import {
  addDays,
  MAX_SCHEDULE_DAYS_AHEAD,
  normalizeDate,
  toDateInputValue,
  toMinutes,
} from '@/shared/lib/time';
import {
  createActivityScheduleSchema,
  type CreateActivityFormValues,
} from '@/shared/schema/activity';
import Divider from '@/shared/ui/Divider/Divider';
import Input from '@/shared/ui/Input/Input';
import Label from '@/shared/ui/Label';
import { Select } from '@/shared/ui/Select';

const ReservationScheduleSection = () => {
  const { control, clearErrors, formState } = useFormContext<CreateActivityFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedules',
  });

  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [draftError, setDraftError] = useState('');

  const timeOptions = useMemo(
    () => Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
    [],
  );

  const formatDate = (value: string) => {
    const [y, m, d] = value.split('-');
    if (!y || !m || !d) return value;
    return `${y}. ${m}. ${d}.`;
  };

  const canAdd = (() => {
    if (!date || !startTime || !endTime) return false;
    const startMinutes = toMinutes(startTime);
    const endMinutes = toMinutes(endTime);
    if (startMinutes === null || endMinutes === null) return false;
    return endMinutes > startMinutes;
  })();

  const { minDateValue, maxDateValue, todayValue } = useMemo(() => {
    const today = normalizeDate(new Date());
    const maxDate = addDays(today, MAX_SCHEDULE_DAYS_AHEAD);
    return {
      minDateValue: toDateInputValue(today),
      maxDateValue: toDateInputValue(maxDate),
      todayValue: toDateInputValue(today),
    };
  }, []);

  const startTimeOptions = useMemo(() => {
    if (!date || date !== todayValue) return timeOptions;
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    return timeOptions.filter((time) => {
      const minutes = toMinutes(time);
      return minutes !== null && minutes > nowMinutes;
    });
  }, [date, timeOptions, todayValue]);

  const endTimeOptions = useMemo(() => {
    const startMinutes = toMinutes(startTime);
    const isToday = date === todayValue;
    const now = isToday ? new Date() : null;
    const nowMinutes = now ? now.getHours() * 60 + now.getMinutes() : 0;
    return timeOptions.filter((time) => {
      const minutes = toMinutes(time);
      if (minutes === null) return false;
      if (isToday && minutes <= nowMinutes) return false;
      if (startMinutes !== null && minutes <= startMinutes) return false;
      return true;
    });
  }, [date, startTime, timeOptions, todayValue]);

  const hasOverlap = () => {
    const startMinutes = toMinutes(startTime);
    const endMinutes = toMinutes(endTime);
    if (startMinutes === null || endMinutes === null) return false;

    return fields.some((field) => {
      if (field.date !== date) return false;
      const fieldStart = toMinutes(field.startTime);
      const fieldEnd = toMinutes(field.endTime);
      if (fieldStart === null || fieldEnd === null) return false;
      return startMinutes < fieldEnd && endMinutes > fieldStart;
    });
  };

  const resetDraft = () => {
    setStartTime('');
    setEndTime('');
  };

  const handleAdd = () => {
    const parsed = createActivityScheduleSchema.safeParse({ date, startTime, endTime });
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? '입력값을 확인해 주세요.';
      setDraftError(message);
      return;
    }

    if (hasOverlap()) {
      setDraftError('같은 날짜에 겹치는 시간대가 있습니다.');
      return;
    }

    append(parsed.data);
    clearErrors('schedules');
    setDraftError('');
    resetDraft();
  };

  const scheduleError =
    typeof formState.errors.schedules?.message === 'string'
      ? formState.errors.schedules.message
      : '';

  return (
    <div>
      <div className="hidden md:grid grid-cols-[1fr_140px_12px_140px_44px] gap-2 mb-2">
        <Label htmlFor="date" className="text-m-16 text-gray-800">
          날짜
        </Label>
        <p className="text-m-16 text-gray-800">시작 시간</p>
        <div />
        <p className="text-m-16 text-gray-800">종료 시간</p>
        <div />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_140px_12px_140px_44px] md:items-center md:gap-2 mb-4">
        <Label htmlFor="date" className="text-m-16 text-gray-800 md:hidden">
          날짜
        </Label>
        <Input
          id="date"
          type="date"
          placeholder="yy/mm/dd"
          value={date}
          min={minDateValue}
          max={maxDateValue}
          onChange={(e) => {
            setDate(e.target.value);
            if (draftError) setDraftError('');
          }}
        />

        <p className="text-m-16 text-gray-800 md:hidden">시간</p>
        <div className="grid grid-cols-[1fr_12px_1fr_44px] items-center gap-2 md:contents">
          <Select.Root
            value={startTime}
            onValueChange={(value) => {
              setStartTime(value);
              if (draftError) setDraftError('');
            }}
          >
            <Select.Trigger variant="input-like" placeholder="00:00" />
            <Select.Content>
              {startTimeOptions.map((time) => (
                <Select.Item key={time} value={time}>
                  {time}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <span className="text-center text-gray-400">-</span>

          <Select.Root
            value={endTime}
            onValueChange={(value) => {
              setEndTime(value);
              if (draftError) setDraftError('');
            }}
          >
            <Select.Trigger variant="input-like" placeholder="00:00" />
            <Select.Content>
              {endTimeOptions.map((time) => (
                <Select.Item key={time} value={time}>
                  {time}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <button
            type="button"
            disabled={!canAdd}
            onClick={handleAdd}
            className="cursor-pointer bg-primary text-white w-11 h-11 rounded-full flex items-center justify-center text-2xl hover:opacity-90 disabled:cursor-not-allowed disabled:bg-primary"
          >
            <PlusIcon className="text-white" />
          </button>
        </div>
      </div>
      {draftError && <p className="mb-4 text-m-14 text-red-500">{draftError}</p>}
      {scheduleError && <p className="mb-4 text-m-14 text-red-500">{scheduleError}</p>}

      <Divider className="my-6 border-gray-100" />

      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <dl
            key={field.id}
            className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_140px_12px_140px_44px] md:items-center md:gap-2"
          >
            <dt className="sr-only">날짜</dt>
            <dd className="flex items-center w-full text-gray-950 placeholder-gray-400 h-13.5 px-5 rounded-xl">
              {formatDate(field.date)}
            </dd>

            <div className="grid grid-cols-[1fr_12px_1fr_44px] items-center gap-2 md:contents">
              <dt className="sr-only">시작 시간</dt>
              <dd className="flex justify-center items-center w-full text-gray-950 placeholder-gray-400 h-13.5 px-5 rounded-xl">
                {field.startTime}
              </dd>

              <dt className="sr-only">구분</dt>
              <dd className="text-center text-gray-400">-</dd>

              <dt className="sr-only">종료 시간</dt>
              <dd className="flex justify-center items-center w-full text-gray-950 placeholder-gray-400 h-13.5 px-5 rounded-xl">
                {field.endTime}
              </dd>

              <button
                type="button"
                aria-label="예약 시간 삭제"
                onClick={() => remove(index)}
                className="cursor-pointer bg-gray-100 text-gray-400 w-11 h-11 rounded-full flex items-center justify-center text-2xl hover:bg-gray-200"
              >
                <MinusIcon className="text-black" />
              </button>
            </div>
          </dl>
        ))}
      </div>
    </div>
  );
};

export default ReservationScheduleSection;
