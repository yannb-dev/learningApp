import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

//__________ import components ___________________

import TimeLine from "../components/TimeLine";
import ListObjective from "../components/ListObjective";
import DetailProject from "../components/DetailProject";
import BtnDirectNewRoadmap from "../components/BtnDirectNewRoadmap";

//___________ type ________________________________

import { Objective } from "@prisma/client";

type ModuleWithObjective = Prisma.ModuleGetPayload<{
  include: { objectives: true };
}>;

type SearchParams = Promise<{ [key: string]: string }>;

export default async function AppPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const { project } = await searchParams;

  const search = typeof project === "string" ? project : "";

  const checkProject = await prisma.project.findMany({
    where: { userId: session.user.id },
  });

  if (checkProject.length === 0) {
    redirect("/newproject");
  }

  //____________ Import du Project + séance ______________________

  let projectOpen = null;
  let practicalProject = null;
  const arrayAcquired: Objective[] = [];
  const arrayInProgress: Objective[] = [];
  const arrayUpComming: Objective[] = [];

  if (search === "") {
    return (
      <div className="w-[83%] h-screen flex items-center justify-center">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl">Choisis ton projet !</h1>
          <p className="mb-8">Sélectionne dans le menu un projet</p>
          <p className="mb-14">
            Si tu n&apos;as aucun project en cours clique sur Nouveau dans
            l&apos;onglet de sélection
          </p>
        </div>
      </div>
    );
  } else {
    projectOpen = await prisma.project.findUnique({
      where: { id: search, userId: session.user.id },
      include: {
        roadmap: {
          include: {
            module: { include: { objectives: true, criterias: true } },
          },
        },
        seances: true,
      },
    });

    if (projectOpen?.roadmap) {
      projectOpen.roadmap.module.forEach((module: ModuleWithObjective) => {
        module.objectives.forEach((objective: Objective) => {
          if (objective.state === "Acquired") {
            arrayAcquired.push(objective);
          }

          if (objective.state === "InProgress") {
            arrayInProgress.push(objective);
          }

          if (objective.state === "UpComming") {
            arrayUpComming.push(objective);
          }
        });
      });
    }

    if (!projectOpen) {
      return (
        <div className="h-scren w-full flex justify-center items-center font-bold text-xl">
          <h1>
            Oups ! Impossible de charger ton projet. Sélectionne le dans
            l&apos;onglet &quot;Mon Projet&quot;
          </h1>
          ;
        </div>
      );
    }

    practicalProject = await prisma.practicalproject.findMany({
      where: {
        roadmapId: projectOpen.roadmap?.id,
        numModule: projectOpen.roadmap?.practicalProjectInProgress,
      },
    });
  }

  //_______________ Date et mise à jour _______________________
  const dateToday = format(new Date(), "dd/MM/yyyy", { locale: fr });

  return (
    <div className="page w-screen md:w-[83%] md:h-screen md:p-12">
      {projectOpen && (
        <div className="w-full flex flex-col">
          {!projectOpen.roadmap && (
            <div className="w-full h-screen flex flex-col justify-center items-center">
              <h1 className="text-xl font-bold mb-2">
                Vous n&apos;avez pas inséré de Roadmap dans votre projet !
              </h1>
              <div className="flex items-center">
                <p className="font-mono mr-4">Rendez vous dans la section</p>
                <BtnDirectNewRoadmap idProject={search} />
              </div>
            </div>
          )}
          {projectOpen.roadmap && (
            <div className="w-full flex flex-col">
              <h1 className="text-sm md:text-xl font-bold">
                Vue d&apos;nsemble
              </h1>
              <p className="text-xs">{dateToday}</p>
              <div className="h-1/2 w-full flex justify-center items-start">
                <TimeLine
                  seances={projectOpen.seances}
                  roadmap={projectOpen.roadmap}
                />
              </div>
              <div className="h-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-8 justify-between mt-10">
                <ListObjective
                  acquired={arrayAcquired}
                  inProgress={arrayInProgress}
                  upComming={arrayUpComming}
                  numberModule={projectOpen.roadmap.module.length}
                />
                {practicalProject && (
                  <DetailProject project={practicalProject[0]} />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
