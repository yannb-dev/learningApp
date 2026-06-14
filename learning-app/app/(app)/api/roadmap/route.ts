import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { RoadmapDataApi } from "@/lib/schema/ImportRoadMap";
import { authOptions } from "@/lib/auth";

//______________________POST ___________

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();

    console.log(body);

    const result = RoadmapDataApi.safeParse(body);

    if (!result.success) {
      return Response.json({ error: result.error.flatten() }, { status: 400 });
    }

    const moduleList = result.data.listModule;
    const competenceList = result.data.listCompetence;
    const criteriaList = result.data.listCritereValidation;

    const roadmap = await prisma.roadmap.create({
      data: {
        name: result.data.name,
        objective: result.data.objective,
        echeance: result.data.echeance,
        dispo: result.data.dispo,
        constraint: result.data.constraint,
        duration: result.data.duration,
        userId: session.user.id,
        projectId: result.data.projectId,
      },
    });

    await Promise.all(
      moduleList.map(async (liste) => {
        const module = await prisma.module.create({
          data: {
            name: liste.name,
            numModule: liste.numModule,
            duration: liste.duration,
            prerequisites: liste.prerequisites,
            pointcritical: liste.pointcritical,
            practicalproject: liste.practicalproject,
            userId: session.user.id,
            roadmapId: roadmap.id,
          },
        });

        const newTabCompetence = competenceList.filter(
          (e) => e.moduleRef === module.numModule,
        );
        const newTabCriteria = criteriaList.filter(
          (e) => e.moduleRef === module.numModule,
        );
        await Promise.all([
          ...newTabCompetence.map((liste) => {
            prisma.objective.create({
              data: {
                name: liste.name,
                index: liste.index,
                state: false,
                moduleRef: liste.moduleRef,
                moduleId: module.id,
              },
            });
          }),

          ...newTabCriteria.map((liste) => {
            prisma.criteria.create({
              data: {
                name: liste.name,
                index: liste.index,
                moduleRef: liste.moduleRef,
                moduleId: module.id,
              },
            });
          }),
        ]);
      }),
    );

    return Response.json({ success: true, data: roadmap });
  } catch (err) {
    return Response.json({ error: "Erreur serveur du POST" }, { status: 500 });
  }
}
