import { z } from "zod";

export const CriteriaSchema = z.array(
  z.object({
    name: z.string().min(1),

    index: z.number().int(),

    moduleRef: z.int(),
  }),
);

export type CriteriaData = z.infer<typeof CriteriaSchema>;
