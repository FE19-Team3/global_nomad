'use client';
import { Calendar, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';

import { useModalStore } from '@/shared/stores/useModalStore';
import './CalendarComp.css';

// TODO: 모달 컴포넌트로 분리해서 제작
const examplemodal = (date: string, reservations: Reservations) => {
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="flex flex-col gap-4">
      <span>{formattedDate}</span>
      <span>완료: {reservations.completed}</span>
      <span>승인: {reservations.confirmed}</span>
      <span>예약: {reservations.pending}</span>
    </div>
  );
};

type Reservations = {
  completed: number;
  confirmed: number;
  pending: number;
};

interface ReservationData {
  date: string;
  reservations: Reservations;
  activityId?: number;
}

interface CalendarCompProps {
  onDateSelect?: (date: string) => void;
  activityId: number;
}

const CalendarComp = ({ onDateSelect, activityId }: CalendarCompProps) => {
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const calendarInstanceRef = useRef<Calendar | null>(null);

  const [reservationData, setReservationData] = useState<ReservationData[]>([]);
  const [viewedDates, setViewedDates] = useState<Set<string>>(new Set());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const { openBaseModal } = useModalStore();

  // 연/월 바뀔 때 예약 데이터 가져옴
  useEffect(() => {
    const year = currentYear.toString();
    const month = String(currentMonth).padStart(2, '0');
    fetchReservations(year, month);
  }, [currentYear, currentMonth, activityId]);

  // 로컬 스토리지에서 예약 내역 조회 상태 로드
  useEffect(() => {
    const stored = sessionStorage.getItem('viewedReservations');
    if (stored) {
      setViewedDates(new Set(JSON.parse(stored)));
    }
  }, []);

  // 조회 상태 저장
  const markAsViewed = (date: string) => {
    const newViewed = new Set(viewedDates);
    newViewed.add(date);
    setViewedDates(newViewed);
    sessionStorage.setItem('viewedReservations', JSON.stringify([...newViewed]));
  };

  // TODO: API 데이터 조회
  const fetchReservations = async (_year: string, _month: string) => {
    try {
      // 실제 API 호출 예시
      // const response = await fetch(
      //   `/${teamId}/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`
      // );
      // const data = await response.json();

      // 데모 데이터
      const mockData: ReservationData[] = [
        {
          date: '2026-01-09',
          reservations: { completed: 2, confirmed: 1, pending: 0 },
        },
        {
          date: '2026-01-15',
          reservations: { completed: 0, confirmed: 3, pending: 1 },
        },
        {
          date: '2026-01-20',
          reservations: { completed: 1, confirmed: 0, pending: 2 },
        },
        {
          date: '2026-01-21',
          reservations: { completed: 5, confirmed: 2, pending: 1 },
        },
        {
          date: '2026-02-06',
          reservations: { completed: 0, confirmed: 0, pending: 3 },
        },
      ];

      setReservationData(mockData);
    } catch (error) {
      console.error('예약 데이터 조회 실패:', error);
    }
  };

  const createEvents = (): EventInput[] => {
    const events: EventInput[] = [];

    reservationData.forEach((item) => {
      const { date, reservations } = item;

      if (reservations.completed > 0) {
        events.push({
          start: date,
          allDay: true,
          title: `완료 ${reservations.completed}`,
          classNames: ['event-completed'],
          extendedProps: {
            type: 'completed',
            date,
            reservations,
          },
        });
      }

      if (reservations.confirmed > 0) {
        events.push({
          start: date,
          allDay: true,
          title: `승인 ${reservations.confirmed}`,
          classNames: ['event-confirmed'],
          extendedProps: {
            type: 'confirmed',
            date,
            reservations,
          },
        });
      }

      if (reservations.pending > 0) {
        events.push({
          start: date,
          allDay: true,
          title: `예약 ${reservations.pending}`,
          classNames: ['event-pending'],
          extendedProps: {
            type: 'pending',
            date,
            reservations,
          },
        });
      }
    });

    return events;
  };

  // 날짜별 예약 존재 여부 확인
  const hasReservations = (dateStr: string) => {
    return reservationData.some((item) => item.date === dateStr);
  };

  // 새 알림 여부 확인
  const hasNewNotification = (dateStr: string) => {
    return hasReservations(dateStr) && !viewedDates.has(dateStr);
  };

  // 캘린더 업데이트
  useEffect(() => {
    if (!calendarRef.current) return;

    // 달력 한 번만 생성
    if (!calendarInstanceRef.current) {
      calendarInstanceRef.current = new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, interactionPlugin],
        events: createEvents(),
        initialView: 'dayGridMonth',
        headerToolbar: {
          start: 'prev',
          center: 'title',
          end: 'next',
        },
        titleFormat: { year: 'numeric', month: 'long' },
        dayHeaderFormat: { weekday: 'narrow' }, // 요일 한글자로 표시
        selectable: true,
        selectMirror: true,
        selectOverlap: true,
        unselectAuto: false,
        dayMaxEventRows: false,
        height: 'auto',

        // 달력 그리기
        datesSet: (info) => {
          const current = info.view.currentStart;
          setCurrentYear(current.getFullYear());
          setCurrentMonth(current.getMonth() + 1);
        },

        // 모달 열기
        eventClick: (info) => {
          info.jsEvent.preventDefault();
          info.jsEvent.stopPropagation();
          const { date, reservations } = info.event.extendedProps;

          openBaseModal({
            content: examplemodal(date, reservations),
            showCloseButton: true,
          });

          markAsViewed(date);
        },

        // 선택 처리
        select: (info) => {
          // event 날짜만 선택 가능
          if (!hasReservations(info.startStr) && calendarInstanceRef.current) {
            calendarInstanceRef.current.unselect();
            return;
          }

          // 선택 상태 업데이트
          const allDays = calendarRef.current?.querySelectorAll('.fc-daygrid-day');
          allDays?.forEach((day) => day.classList.remove('fc-day-selected'));

          const selectedDay = calendarRef.current?.querySelector(`[data-date="${info.startStr}"]`);
          selectedDay?.classList.add('fc-day-selected');

          // 빨간 점 제거
          const redDot = selectedDay?.querySelector('.notification-dot');
          if (redDot) {
            redDot.remove();
          }

          if (onDateSelect) {
            onDateSelect(info.startStr);
          }
        },

        // 클래스 처리
        dayCellClassNames: (arg) => {
          const classes = [];
          const year = arg.date.getFullYear();
          const month = String(arg.date.getMonth() + 1).padStart(2, '0');
          const day = String(arg.date.getDate()).padStart(2, '0');
          const dateStr = `${year}-${month}-${day}`;

          if (hasReservations(dateStr)) {
            classes.push('selectable-date');
          } else {
            classes.push('not-selectable-date');
          }

          return classes;
        },

        // 빨간 점 (새 알람 표시)
        dayCellDidMount: (arg) => {
          const year = arg.date.getFullYear();
          const month = String(arg.date.getMonth() + 1).padStart(2, '0');
          const day = String(arg.date.getDate()).padStart(2, '0');
          const dateStr = `${year}-${month}-${day}`;

          if (hasNewNotification(dateStr)) {
            const dayFrame = arg.el.querySelector('.fc-daygrid-day-frame');
            if (dayFrame) {
              const notificationDot = document.createElement('div');
              notificationDot.className = 'notification-dot';
              dayFrame.appendChild(notificationDot);
            }
          }
        },
      });

      calendarInstanceRef.current.render();
    }

    // 예약 데이터가 바뀌거나 연/월 바뀌면 이벤트 갱신
    calendarInstanceRef.current.setOption('events', createEvents());
  }, [reservationData, currentYear, currentMonth]);

  // 이벤트 업데이트
  useEffect(() => {
    if (calendarInstanceRef.current) {
      calendarInstanceRef.current.setOption('events', createEvents());
    }
  }, [reservationData]);

  return (
    <div
      className="calendar-comp-calendar lg:w-160 lg:h-204 md:w-120 md:h-204 w-full h-fit border"
      ref={calendarRef}
    />
  );
};

export default CalendarComp;
