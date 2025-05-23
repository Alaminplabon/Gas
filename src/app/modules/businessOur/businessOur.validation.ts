import { z } from 'zod';

export const businessHourZodSchema = z.object({
  day: z.string().optional(),
  time: z.string().optional(),
});
