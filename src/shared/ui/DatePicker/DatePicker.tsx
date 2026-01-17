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
