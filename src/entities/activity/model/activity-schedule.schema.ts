import { z } from 'zod';

export const ActivityScheduleTimeSchema = z.object({
  id: z.number(),
  startTime: z.string(),
  endTime: z.string(),
});

export const ActivityScheduleSchema = z.object({
  date: z.string(),
  times: z.array(ActivityScheduleTimeSchema),
});

export type ActivityScheduleTime = z.infer<typeof ActivityScheduleTimeSchema>;
export type ActivitySchedule = z.infer<typeof ActivityScheduleSchema>;
