// contrôle des valeurs pour le fichier roadmap.json qui entre sur RoadMapForm
//

import { z } from "zod";
import { Importroadmap } from "./ImportRoadMap";

export const RoadmapApi = z.object({
  roadmap: Importroadmap,
  projectId: z.string().min(1),
});

export type RoadmapApi = z.infer<typeof RoadmapApi>;
