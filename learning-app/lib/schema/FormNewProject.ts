import { z } from "zod";

export const ProjectSchema = z.object({
  name: z.string().min(1, "Veuillez entrée un nom"),

  description: z.string().min(1, "Ajouter votre description"),

  category: z.enum(["school", "tech"]),
});

export type ProjectData = z.infer<typeof ProjectSchema>;
