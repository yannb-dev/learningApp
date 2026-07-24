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

      await Promise.all(
        moduleList.map(async (liste) => {
          const moduleData = await tx.module.create({
            data: {
              name: liste.name,
              numModule: liste.numModule,
              duration: liste.duration,
              prerequisites: liste.prerequisites,
              pointcritical: liste.pointcritical,
              roadmapId: roadmap.id,
            },
          });

          const newTabCompetence = competenceList.filter(
            (e) => e.moduleRef === moduleData.numModule,
          );
          const newTabCriteria = criteriaList.filter(
            (e) => e.moduleRef === moduleData.numModule,
          );

          const newTabPracticalProject = projectList.filter(
            (e) => e.numModule === moduleData.numModule,
          );
          await Promise.all([
            ...newTabCompetence.map((liste) => {
              return tx.objective.create({
                data: {
                  name: liste.name,
                  index: liste.index,
                  state: "UpComming",
                  moduleRef: liste.moduleRef,
                  moduleId: module.id,
                  projectId: result.data.projectId,
                },
              });
            }),

            ...newTabCriteria.map((liste) => {
              return tx.criteria.create({
                data: {
                  name: liste.name,
                  index: liste.index,
                  moduleRef: liste.moduleRef,
                  moduleId: module.id,
                },
              });
            }),

            ...newTabPracticalProject.map((liste) => {
              return tx.practicalproject.create({
                data: {
                  name: liste.name,
                  stack: liste.stack,
                  detail: liste.detail,
                  warning: liste.warning,
                  moduleId: module.id,
                  roadmapId: roadmap.id,
                  numModule: liste.numModule,
                  state: "NoStart",
                  noteInProgress: "Aucune note.",
                  stepHelp: liste.stepHelp,
                },
              });
            }),
          ]);
        }),
      );
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
