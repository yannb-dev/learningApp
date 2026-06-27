// contrôle des valeurs pour le fichier roadmap.json qui entre sur RoadMapForm
//

import { z } from "zod";
import { Importroadmap } from "./ImportRoadMap";

export const RoadmapApi = z.object({
  roadmap: Importroadmap,
  projectId: z.string().min(1),
});

export type RoadmapApi = z.infer<typeof RoadmapApi>;

export const RoadMapWithChildren = z.object({
  roadmap: z.object({
    id: z.string(),

    name: z.string().min(1),

    objective: z.string().min(1),

    echeance: z.string().min(1),

    dispo: z.number().int(),

    constraint: z.string().min(1),

    duration: z.number().int(),

    userId: z.string(),

    projectId: z.string(),

    createdAt: z.date(),

    module: z.array(
      z.object({
        id: z.string(),

        name: z.string(),

        numModule: z.number(),

        duration: z.number(),

        prerequisites: z.string(),

        pointcritical: z.string(),

        practicalproject: z.string(),

        roadmapId: z.string(),

        criterias: z.array(
          z.object({
            id: z.string(),

            name: z.string(),

            index: z.number(),

            moduleRef: z.number(),

            moduleId: z.string(),
          }),
        ),

        objectives: z.array(
          z.object({
            id: z.string(),

            name: z.string(),

            index: z.number(),

            state: z.enum(["Acquired", "InProgress", "UpComming"]),

            moduleRef: z.number(),

            projectId: z.string(),

            moduleId: z.string(),
          }),
        ),
      }),
    ),
  }),
});

export type RoadMapWithChildren = z.infer<typeof RoadMapWithChildren>;

export const Objectives = z.array(
  z.object({
    id: z.string(),

    name: z.string(),

    index: z.number(),

    state: z.enum(["Acquired", "InProgress", "UpComming"]),

    moduleRef: z.number(),

    projectId: z.string(),

    moduleId: z.string(),

    createdAt: z.date(),
  }),
);

export type Objectives = z.infer<typeof Objectives>;
