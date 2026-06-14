// contrôle des valeurs pour le fichier roadmap.json qui entre sur RoadMapForm
//

import { object, z } from "zod";

export const Importroadmap = z.object({
  name: z.string().min(1),

  objective: z.string().min(1),

  echeance: z.string().min(1),

  dispo: z.number().int(),

  constraint: z.string().min(1),

  duration: z.number().int(),

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
});

export type Importroadmap = z.infer<typeof Importroadmap>;
