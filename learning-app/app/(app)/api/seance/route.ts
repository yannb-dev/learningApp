import prisma from "@/lib/prisma";

import { SeanceApi } from "@/lib/schema/SeanceApi";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

//______________________POST ___________

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const result = SeanceApi.safeParse(body);

    if (!result.success) {
      return Response.json({ error: result.error.issues }, { status: 400 });
    }

    // ______________ Transaction pour tout ou rien côté BDD _________
    const sendData = await prisma.$transaction(async (tx) => {
      const seance = await tx.seance.create({
        data: {
          sujet: result.data.seance.sujet,
          accomplished: result.data.seance.accomplished,
          skillDone: result.data.seance.skillDone,
          difficulty: result.data.seance.difficulty,
          keyPoint: result.data.seance.keyPoint,
          next: result.data.seance.next,
          userId: session.user.id,
          projectId: result.data.projectId,
        },
      });

      await Promise.all(
        result.data.seance.objectives.map((liste) => {
          const objective = tx.objective.update({
            where: {
              id: liste.id,
            },
            data: {
              state: liste.state,
            },
          });
          return objective; // obligatoire avec Promise.all ou fonction arrow sans accolade
        }),
      );

      await Promise.all(
        result.data.seance.memos.map(async (liste) => {
          const memo = await tx.memo.create({
            data: {
              stack: liste.stack,
              topic: liste.topic,
              snippet: liste.snippet,
              notes: liste.notes,
              projectId: result.data.projectId,
              userId: session.user.id,
            },
          });

          await Promise.all(
            liste.tags.map((liste) => {
              const tag = tx.tag.create({
                data: {
                  name: liste.name,
                  slug: liste.slug,
                  memoId: memo.id,
                },
              });

              return tag; // obligatoire avec Promise.all ou fonction arrow sans accolade
            }),
          );
        }),
      );
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Erreur POST /api/seance", err);
    return Response.json({ error: "Erreur serveur du POST" }, { status: 500 });
  }
}
