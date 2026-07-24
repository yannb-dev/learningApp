import prisma from "@/lib/prisma";

import { RoadmapApi } from "@/lib/schema/RoadmapApi";

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

    const result = RoadmapApi.safeParse(body);

    if (!result.success) {
      return Response.json({ error: result.error.issues }, { status: 400 });
    }

    const moduleList = result.data.roadmap.listModule;
    const competenceList = result.data.roadmap.listCompetence;
    const criteriaList = result.data.roadmap.listCritereValidation;
    const projectList = result.data.roadmap.listPracticalProject;

    const date = new Date(result.data.roadmap.echeance);

    const project = await prisma.project.findUnique({
      where: { id: result.data.projectId, userId: session.user.id },
    });

    if (!project)
      return Response.json({ error: "Project introuvable" }, { status: 404 });

    await prisma.$transaction(async (tx) => {
      const roadmap = await tx.roadmap.create({
        data: {
          name: result.data.roadmap.name,
          objective: result.data.roadmap.objective,
          echeance: date,
          dispo: result.data.roadmap.dispo,
          constraint: result.data.roadmap.constraint,
          duration: result.data.roadmap.duration,
          practicalProjectInProgress: 1,
          userId: session.user.id,
          projectId: result.data.projectId,
        },
      });

      const createdModules = await tx.module.createManyAndReturn({
        data: moduleList.map((liste) => ({
          name: liste.name,
          numModule: liste.numModule,
          duration: liste.duration,
          prerequisites: liste.prerequisites,
          pointcritical: liste.pointcritical,
          roadmapId: roadmap.id,
        })),
      });

      // Table de correspondance numModule -> id généré
      const moduleIdByNum = new Map(
        createdModules.map((m) => [m.numModule, m.id]),
      );

      // PHASE 2 — On construit les tableaux complets, puis 1 seul createMany chacun
      await tx.objective.createMany({
        data: competenceList.map((liste) => {
          const moduleId = moduleIdByNum.get(liste.moduleRef);

          if (!moduleId) {
            throw new Error(
              `Module introuvable pour moduleRef=${liste.moduleRef} (objective: ${liste.name})`,
            );
          }
          return {
            name: liste.name,
            index: liste.index,
            state: "UpComming",
            moduleRef: liste.moduleRef,
            moduleId,
            projectId: result.data.projectId,
          };
        }),
      });

      await tx.criteria.createMany({
        data: criteriaList.map((liste) => {
          const moduleId = moduleIdByNum.get(liste.moduleRef);

          if (!moduleId) {
            throw new Error(
              `Module introuvable pour moduleRef=${liste.moduleRef} (criteria: ${liste.name})`,
            );
          }
          return {
            name: liste.name,
            index: liste.index,
            moduleRef: liste.moduleRef,
            moduleId,
          };
        }),
      });

      await tx.practicalproject.createMany({
        data: projectList.map((liste) => {
          const moduleId = moduleIdByNum.get(liste.numModule);

          if (!moduleId) {
            throw new Error(
              `Module introuvable pour moduleRef=${liste.numModule} (practicalProject: ${liste.name})`,
            );
          }
          return {
            name: liste.name,
            stack: liste.stack,
            detail: liste.detail,
            warning: liste.warning,
            moduleId,
            roadmapId: roadmap.id,
            numModule: liste.numModule,
            state: "NoStart",
            noteInProgress: "Aucune note.",
            stepHelp: liste.stepHelp,
          };
        }),
      });
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Erreur POST roadmap", err);
    return Response.json(
      { error: "Erreur serveur du POST roadmap", err },
      { status: 500 },
    );
  }
}
