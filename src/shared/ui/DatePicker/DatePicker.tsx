'use client';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useMemo, useState } from 'react';

import { cn } from '@/shared/lib/cn';
import { addDays, MAX_SCHEDULE_DAYS_AHEAD, normalizeDate } from '@/shared/lib/time';

import './DatePicker.css';

type DatePickerEvent = {
  date: string;
  title: string;
  className?: string;
};

interface DatePickerProps {
  onDateSelect?: (date: string) => void;
  selectedDates?: string[];
  selectedDate?: string | null;
  events?: DatePickerEvent[];
  onMonthChange?: (year: string, month: string) => void;
  limitRange?: boolean;
  variant?: 'dot' | 'reservation';
}

const DatePicker = ({
  onDateSelect,
  selectedDates = [],
  selectedDate: controlledSelectedDate,
  events,
  onMonthChange,
  limitRange = true,
  variant = 'dot',
}: DatePickerProps) => {
  const [uncontrolledSelectedDate, setUncontrolledSelectedDate] = useState<string | null>(null);
  const isControlled = controlledSelectedDate !== undefined;
  const selectedDate = isControlled ? controlledSelectedDate : uncontrolledSelectedDate;
  const { today, maxDate, validRange } = useMemo(() => {
    const today = normalizeDate(new Date());
    const maxDate = addDays(today, MAX_SCHEDULE_DAYS_AHEAD);
    const validRange = limitRange
      ? {
          start: new Date(today.getFullYear(), today.getMonth(), 1),
          end: new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 1),
        }
      : undefined;
    return { today, maxDate, validRange };
  }, [limitRange]);

  // 중복 제거
  const uniqueDates = Array.from(new Set(selectedDates));
  const calendarEvents: DatePickerEvent[] =
    events ??
    uniqueDates.map((date) => ({
      date,
      title: '',
      className: undefined,
    }));

  const sizeClass =
    variant === 'reservation'
      ? 'w-full h-fit md:h-204 lg:h-204'
      : 'lg:w-87.5 lg:h-92 md:w-89.5 md:h-123 w-full h-99.5';

  return (
    <div
      className={cn(
        'datepicker-calendar',
        sizeClass,
        variant === 'reservation' ? 'datepicker-calendar-reservation' : 'datepicker-calendar-dot',
      )}
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        events={calendarEvents.map((event) => ({
          start: event.date,
          allDay: true,
          title: event.title,
          classNames: event.className ? [event.className] : [],
        }))}
        initialView="dayGridMonth"
        headerToolbar={
          variant === 'reservation'
            ? { start: 'prev', center: 'title', end: 'next' }
            : { end: 'prev,next' }
        }
        dayHeaderFormat={{ weekday: 'narrow' }}
        height="auto"
        validRange={validRange}
        dayMaxEventRows={variant === 'reservation' ? false : undefined}
        datesSet={(info) => {
          if (!onMonthChange) return;
          const year = info.view.currentStart.getFullYear();
          const month = String(info.view.currentStart.getMonth() + 1).padStart(2, '0');
          onMonthChange(String(year), month);
        }}
        dateClick={(info) => {
          const clickedDate = new Date(info.dateStr);
          clickedDate.setHours(0, 0, 0, 0);

          if (limitRange && (clickedDate < today || clickedDate > maxDate)) return;
          if (!uniqueDates.includes(info.dateStr)) return;

          if (!isControlled) {
            setUncontrolledSelectedDate(info.dateStr);
          }
          onDateSelect?.(info.dateStr);
        }}
        eventClick={(info) => {
          const eventDate = info.event.startStr;
          if (!eventDate) return;
          if (!uniqueDates.includes(eventDate)) return;
          if (!isControlled) {
            setUncontrolledSelectedDate(eventDate);
          }
          onDateSelect?.(eventDate);
        }}
        dayCellClassNames={(arg) => {
          const classes = [];
          const cellDate = new Date(arg.date);
          cellDate.setHours(0, 0, 0, 0);

          const dateStr = `${arg.date.getFullYear()}-${String(arg.date.getMonth() + 1).padStart(2, '0')}-${String(arg.date.getDate()).padStart(2, '0')}`;
          const isPast = limitRange ? cellDate < today : false;
          const isTooFuture = limitRange ? cellDate > maxDate : false;

          if (uniqueDates.includes(dateStr) && !isPast && !isTooFuture) {
            classes.push('selectable-date');
          } else {
            classes.push('not-selectable-date');
          }

          if (limitRange && isPast) classes.push('past-date');
          if (selectedDate === dateStr) classes.push('fc-day-selected');

          return classes;
        }}
      />
    </div>
  );
};

export default DatePicker;
