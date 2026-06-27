import { object, z } from "zod";

export const SeanceApi = z.object({
  seance: z.object({
    sujet: z.string().min(1),

    accomplished: z.string().min(1),

    skillDone: z.string().min(1),

    difficulty: z.string().min(1),

    keyPoint: z.string().min(1),

    next: z.string().min(1),

    objectives: z.array(
      z.object({
        id: z.string().min(1),
        state: z.enum(["UpComming", "InProgress", "Acquired"]),
      }),
    ),

    memos: z.array(
      z.object({
        stack: z.string().min(1),
        topic: z.string().min(1),
        snippet: z.string().min(1),
        notes: z.string().min(1),
        tags: z.array(
          z.object({
            name: z.string().min(1),
            slug: z.string().min(1),
          }),
        ),
      }),
    ),
  }),
  projectId: z.string().min(1),
});

export type SeanceApi = z.infer<typeof SeanceApi>;

export const Seance = z.object({
  id: z.string(),

  sujet: z.string().min(1),

  accomplished: z.string().min(1),

  skillDone: z.string().min(1),

  difficulty: z.string().min(1),

  keyPoint: z.string().min(1),

  next: z.string().min(1),

  projectId: z.string().min(1),

  userId: z.string(),

  createdAt: z.date(),
});

export type Seance = z.infer<typeof Seance>;

export const Memo = z.object({
  id: z.string(),

  stack: z.string().min(1),

  topic: z.string().min(1),

  snippet: z.string().min(1),

  notes: z.string().min(1),

  tags: z.array(
    z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
    }),
  ),

  projectId: z.string().min(1),

  userId: z.string(),

  createdAt: z.date(),
});

export type Memo = z.infer<typeof Memo>;
