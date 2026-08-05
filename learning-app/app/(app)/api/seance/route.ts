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

    const project = await prisma.project.findUnique({
      where: { id: result.data.projectId, userId: session.user.id },
    });

    if (!project)
      return Response.json({ error: "Project introuvable" }, { status: 404 });

    // ______________ Transaction pour tout ou rien côté BDD _________
    await prisma.$transaction(async (tx) => {
      tx.roadmap.update({
        where: {
          userId: session.user.id,
          projectId: result.data.projectId,
        },
        data: {
          practicalProjectInProgress:
            result.data.seance.practicalProjectInProgress,
        },
      });

      tx.seance.create({
        data: {
          sujet: result.data.seance.sujet,
          accomplished: result.data.seance.accomplished,
          skillDone: result.data.seance.skillDone,
          difficulty: result.data.seance.difficulty,
          keyPoint: result.data.seance.keyPoint,
          next: result.data.seance.next,
          tags: result.data.seance.tags,
          userId: session.user.id,
          projectId: result.data.projectId,
        },
      });

      tx.practicalproject.update({
        where: {
          moduleId: result.data.seance.practicalProject.moduleId,
        },
        data: {
          state: result.data.seance.practicalProject.statePracticalProject,
          noteInProgress: result.data.seance.practicalProject.noteInProgress,
        },
      });

      await Promise.all(
        result.data.seance.objectives.map((liste) => {
          const objective = tx.objective.update({
            where: {
              id: liste.id,
              projectId: result.data.projectId,
            },
            data: {
              state: liste.state,
            },
          });
          return objective;
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
    console.error("Erreur POST seance", err);
    return Response.json(
      { error: "Erreur serveur du POST seance", err },
      { status: 500 },
    );
  }
}
