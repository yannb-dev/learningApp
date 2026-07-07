import { z } from "zod";

export const MarkdownSchema = z.object({
  objective: z.string().min(1, "Veuillez entrée un nom"),

  competence: z.string().min(1, "Ajouter vos compétences et vos savoirs faire"),

  dispo: z.string().min(1, "Entrer vos disponibilités avec un numéro"),

  learningMode: z
    .string()
    .min(1, "Ajouter vos modes d'apprentissages préférés"),

  formation: z.enum(["yes", "no"]),

  pointBad: z.string().min(1, "Ajouter vos points bloquant"),

  whyLearn: z.string().min(1, "Ajouter une valeur"),

  echeance: z.string().min(1, "Ajouter une date d'objectif"),

  motivation: z.enum(["1", "2", "3", "4", "5"]),
});

export type MarkdownData = z.infer<typeof MarkdownSchema>;
