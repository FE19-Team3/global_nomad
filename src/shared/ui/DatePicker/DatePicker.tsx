// 'use client';
// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { useEffect, useRef } from 'react';
// import './DatePicker.css';

// const SELECTED = [
//   '2025-12-28',
//   '2026-01-09',
//   '2026-01-15',
//   '2026-01-20',
//   '2026-01-21',
//   '2026-02-06',
// ];

// interface DatePickerProps {
//   onDateSelect?: (date: string) => void;
//   selectedDates?: string[]; // 선택 완료된 날짜들
// }

// const DatePicker = ({ onDateSelect, selectedDates = SELECTED }: DatePickerProps) => {
//   const calendarRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!calendarRef.current) return;

//     // 오늘 날짜 기준 추가 (과거 날짜 막기용)
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const calendar = new Calendar(calendarRef.current, {
//       plugins: [dayGridPlugin, interactionPlugin],
//       events: selectedDates.map((date) => ({ start: date, allDay: true })),
//       initialView: 'dayGridMonth',
//       headerToolbar: {
//         end: 'prev,next',
//       },
//       dayHeaderFormat: { weekday: 'narrow' }, // 요일 한글자로 표시
//       selectable: true,
//       selectMirror: true,
//       selectOverlap: true,
//       unselectAuto: false,

//       select: (info) => {
//         // 선택한 날짜가 과거인지 체크
//         const selectedDate = new Date(info.startStr);
//         selectedDate.setHours(0, 0, 0, 0);

//         // 과거 날짜는 선택 불가
//         if (selectedDate < today) {
//           calendar.unselect();
//           return;
//         }

//         // event 날짜만 선택 가능
//         if (!selectedDates.includes(info.startStr)) {
//           calendar.unselect();
//           return;
//         }

//         // 현재 클릭한 날짜만 fc-day-selected 클래스 추가
//         const allDays = calendarRef.current?.querySelectorAll('.fc-daygrid-day');
//         allDays?.forEach((day) => day.classList.remove('fc-day-selected'));

//         const selectedDay = calendarRef.current?.querySelector(`[data-date="${info.startStr}"]`);
//         selectedDay?.classList.add('fc-day-selected');

//         if (onDateSelect) {
//           onDateSelect(info.startStr);
//         }
//       },

//       dayMaxEventRows: false,
//       height: 'auto',
//       // 선택 가능한 날짜(이벤트 있는 날짜에 태그 추가
//       dayCellClassNames: (arg) => {
//         const classes = [];

//         // 셀 날짜도 시간 제거
//         const cellDate = new Date(arg.date);
//         cellDate.setHours(0, 0, 0, 0);

//         // 로컬 시간대 기준으로 YYYY-MM-DD 형식으로 변환
//         const year = arg.date.getFullYear();
//         const month = String(arg.date.getMonth() + 1).padStart(2, '0');
//         const day = String(arg.date.getDate()).padStart(2, '0');
//         const dateStr = `${year}-${month}-${day}`;

//         // 과거 날짜인지 체크
//         const isPast = cellDate < today;

//         // event 날짜이면서 과거가 아닌 경우만 선택 가능
//         if (selectedDates.includes(dateStr) && !isPast) {
//           classes.push('selectable-date');
//         } else {
//           classes.push('not-selectable-date');
//         }

//         // 과거 날짜에 추가 클래스 (CSS 스타일링용)
//         if (isPast) {
//           classes.push('past-date');
//         }

//         return classes;
//       },
//     });

//     calendar.render();

//     // 버튼 클릭 시 focus 해제
//     const buttons = calendarRef.current.querySelectorAll('.fc-button');
//     buttons.forEach((button) => {
//       button.addEventListener('click', (e) => {
//         (e.target as HTMLElement).blur();
//       });
//     });

//     return () => {
//       calendar.destroy();
//     };
//   }, [onDateSelect, selectedDates]);

//   return (
//     <div
//       className="datepicker-calendar lg:w-87.5 lg:h-92 md:w-89.5 md:h-123 w-full h-99.5"
//       ref={calendarRef}
//     />
//   );
// };

// export default DatePicker;

'use client';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useState } from 'react';
import './DatePicker.css';

interface DatePickerProps {
  onDateSelect?: (date: string) => void;
  selectedDates?: string[];
}

const DatePicker = ({ onDateSelect, selectedDates = [] }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 중복 제거
  const uniqueDates = Array.from(new Set(selectedDates));

  return (
    <div className="datepicker-calendar lg:w-87.5 lg:h-92 md:w-89.5 md:h-123 w-full h-99.5">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        events={uniqueDates.map((date) => ({ start: date, allDay: true }))}
        initialView="dayGridMonth"
        headerToolbar={{ end: 'prev,next' }}
        dayHeaderFormat={{ weekday: 'narrow' }}
        height="auto"
        dateClick={(info) => {
          const clickedDate = new Date(info.dateStr);
          clickedDate.setHours(0, 0, 0, 0);

          if (clickedDate < today || !uniqueDates.includes(info.dateStr)) return;

          setSelectedDate(info.dateStr);
          onDateSelect?.(info.dateStr);
        }}
        dayCellClassNames={(arg) => {
          const classes = [];
          const cellDate = new Date(arg.date);
          cellDate.setHours(0, 0, 0, 0);

          const dateStr = `${arg.date.getFullYear()}-${String(arg.date.getMonth() + 1).padStart(2, '0')}-${String(arg.date.getDate()).padStart(2, '0')}`;
          const isPast = cellDate < today;

          if (uniqueDates.includes(dateStr) && !isPast) {
            classes.push('selectable-date');
          } else {
            classes.push('not-selectable-date');
          }

          if (isPast) classes.push('past-date');
          if (selectedDate === dateStr) classes.push('fc-day-selected');

          return classes;
        }}
      />
    </div>
  );
};

export default DatePicker;
