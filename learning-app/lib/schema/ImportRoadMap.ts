import { object, z } from "zod";

export const RoadmapSchema = z.object({
  name: z.string().min(1),

  objective: z.string().min(1),

  echeance: z.string().min(1),

  dispo: z.number().int(),

  constraint: z.string().min(1),

  duration: z.number().int(),
});

export const RoadmapFull = RoadmapSchema.extend({
  listModule: z.array(
    z.object({
      name: z.string().min(1),

      numModule: z.number().int(),

      duration: z.number().int(),

      prerequisites: z.string().min(1),

      pointcritical: z.string().min(1),

      practicalproject: z.string().min(1),
    }),
  ),
  listCompetence: z.array(
    z.object({
      name: z.string().min(1),

      index: z.number().int(),

      moduleId: z.number().int(),
    }),
  ),
  listCritereValidation: z.array(
    z.object({
      name: z.string().min(1),

      index: z.number().int(),

      moduleId: z.int(),
    }),
  ),
});

export const RoadmapDataApi = z.object({
  roadmap: z.object({
    name: z.string().min(1),

    objective: z.string().min(1),

    echeance: z.string().min(1),

    dispo: z.number().int(),

    constraint: z.string().min(1),

    duration: z.number().int(),
  }),

  listModule: z.array(
    z.object({
      name: z.string().min(1),

      numModule: z.number().int(),

      duration: z.number().int(),

      prerequisites: z.string().min(1),

      pointcritical: z.string().min(1),

      practicalproject: z.string().min(1),
    }),
  ),
  listCompetence: z.array(
    z.object({
      name: z.string().min(1),

      index: z.number().int(),

      moduleRef: z.number().int(),
    }),
  ),
  listCritereValidation: z.array(
    z.object({
      name: z.string().min(1),

      index: z.number().int(),

      moduleRef: z.int(),
    }),
  ),
  projectId: z.string().min(1),
});

export type RoadmapDataApi = z.infer<typeof RoadmapDataApi>;
export type RoadmapFull = z.infer<typeof RoadmapFull>;
