'use client';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useRef } from 'react';
import './DatePicker.css';

const SELECTED = [
  '2025-12-28',
  '2026-01-09',
  '2026-01-15',
  '2026-01-20',
  '2026-01-21',
  '2026-02-06',
];

interface DatePickerProps {
  onDateSelect?: (date: string) => void;
  selectedDates?: string[]; // 선택 완료된 날짜들
}

const DatePicker = ({ onDateSelect, selectedDates = SELECTED }: DatePickerProps) => {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!calendarRef.current) return;

    const calendar = new Calendar(calendarRef.current, {
      plugins: [dayGridPlugin, interactionPlugin],
      events: selectedDates.map((date) => ({ start: date, allDay: true })),
      initialView: 'dayGridMonth',
      headerToolbar: {
        end: 'prev,next',
      },
      dayHeaderFormat: { weekday: 'narrow' }, // 요일 한글자로 표시
      selectable: true,
      selectMirror: true,
      selectOverlap: true,
      unselectAuto: false,

      select: (info) => {
        // event 날짜만 선택 가능
        if (!selectedDates.includes(info.startStr)) {
          calendar.unselect();
          return;
        }

        // 현재 클릭한 날짜만 fc-day-selected 클래스 추가
        const allDays = calendarRef.current?.querySelectorAll('.fc-daygrid-day');
        allDays?.forEach((day) => day.classList.remove('fc-day-selected'));

        const selectedDay = calendarRef.current?.querySelector(`[data-date="${info.startStr}"]`);
        selectedDay?.classList.add('fc-day-selected');

        if (onDateSelect) {
          onDateSelect(info.startStr);
        }
      },
      dayMaxEventRows: false,
      height: 'auto',
      // 선택 가능한 날짜(이벤트 있는 날짜에 태그 추가
      dayCellClassNames: (arg) => {
        const classes = [];

        // 로컬 시간대 기준으로 YYYY-MM-DD 형식으로 변환
        const year = arg.date.getFullYear();
        const month = String(arg.date.getMonth() + 1).padStart(2, '0');
        const day = String(arg.date.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        // event 날짜인지 확인
        if (selectedDates.includes(dateStr)) {
          classes.push('selectable-date');
        } else {
          classes.push('not-selectable-date');
        }

        return classes;
      },
    });

    calendar.render();

    // 버튼 클릭 시 focus 해제
    const buttons = calendarRef.current.querySelectorAll('.fc-button');
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        (e.target as HTMLElement).blur();
      });
    });

    return () => {
      calendar.destroy();
    };
  }, [onDateSelect, selectedDates]);

  return (
    <div
      className="datepicker-calendar lg:w-87.5 lg:h-92 md:w-89.5 md:h-123 w-full h-99.5"
      ref={calendarRef}
    />
  );
};

export default DatePicker;
