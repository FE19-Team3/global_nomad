'use client';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useRef } from 'react';
import './DatePicker.css';

const SELECTED = ['2025-12-28', '2026-01-15', '2026-01-20'];

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
      selectAllow: (selectInfo) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(selectInfo.start);
        selectedDate.setHours(0, 0, 0, 0);

        // 오늘 이전 날짜 선택 불가
        return selectedDate >= today;
      },
      dayCellClassNames: (arg) => {
        return selectedDates.includes(arg.dateStr) ? ['selected-date'] : [];
      },
    });

    calendar.render();

    // 버튼 클릭 시 focus 해제
    const buttons = calendarRef.current.querySelectorAll('.fc-button');
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        (e.target as HTMLElement).blur();
      });
    }, []);

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
