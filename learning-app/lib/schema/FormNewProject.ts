import { z } from "zod";

export const ProjectSchema = z.object({
  name: z.string().min(1, "Veuillez entrée un nom"),

  description: z.string().min(1, "Ajouter votre description"),

  category: z.enum(["school", "tech"]),
});

export const ProjectWithIdSchema = ProjectSchema.extend({
  id: z.string(),
});

export type ProjectDataWithId = z.infer<typeof ProjectWithIdSchema>;
export type ProjectData = z.infer<typeof ProjectSchema>;
