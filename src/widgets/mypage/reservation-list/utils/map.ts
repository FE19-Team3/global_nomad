const Status = {
  '승인 대기': 'pending',
  '예약 승인': 'confirmed',
  '예약 취소': 'canceled',
  '예약 거절': 'declined',
  '체험 완료': 'completed',
} as const;

export type StatusLabel = keyof typeof Status;

export const mapStatusLabelToValue = (label: StatusLabel) => {
  return Status[label];
};
