import { z } from "zod";

export const ModuleSchema = z.array(
  z.object({
    name: z.string().min(1),

    numModule: z.number().int(),

    duration: z.number().int(),

    prerequisites: z.string().min(1),

    pointcritical: z.string().min(1),

    practicalproject: z.string().min(1),
  }),
);

export type ModuleData = z.infer<typeof ModuleSchema>;
