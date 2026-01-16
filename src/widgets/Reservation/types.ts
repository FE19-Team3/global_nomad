// 상세 시간 단위
export interface ActivityTime {
  id: number;
  startTime: string;
  endTime: string;
}

// 날짜별 스케줄 단위
export interface ActivitySchedule {
  date: string;
  times: ActivityTime[];
}

// ReservationSection 프랍 타입
export interface ReservationSectionProps {
  price: number;
  schedules: ActivitySchedule[];
}
