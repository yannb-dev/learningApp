import { z } from "zod";

export const MarkdownSchema = z.object({
  objective: z.string().min(1, "Veuillez entrée un nom"),

  competence: z.string().min(1, "Ajouter vos compétences et vos savoirs faire"),

  dispo: z.string().min(1, "Entrer vos disponibilités"),
});

export type MarkdownData = z.infer<typeof MarkdownSchema>;
