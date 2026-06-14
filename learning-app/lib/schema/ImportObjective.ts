import { z } from "zod";

export const ObjectiveSchema = z.array(
  z.object({
    name: z.string().min(1),

    index: z.number().int(),

    moduleRef: z.number().int(),
  }),
);

export type ObjectiveData = z.infer<typeof ObjectiveSchema>;
