import { z } from 'zod';

const reservationCountSchema = z.object({
  declined: z.number(),
  confirmed: z.number(),
  pending: z.number(),
});

export const reservedScheduleSchema = z.array(
  z.object({
    scheduleId: z.number(),
    startTime: z.string(),
    endTime: z.string(),
    count: reservationCountSchema,
  }),
);

export type ReservedSchedule = z.infer<typeof reservedScheduleSchema>;
