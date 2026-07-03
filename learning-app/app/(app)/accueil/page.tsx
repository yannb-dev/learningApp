import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { Objective } from "@/app/generated/prisma";

//__________ import components ___________________
import TimeLine from "../components/TimeLine";
import ListObjective from "../components/ListObjective";
import DetailProject from "../components/DetailProject";
import BtnDirectNewRoadmap from "../components/BtnDirectNewRoadmap";

//___________ type ________________________________
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

  //____________ Import du Project + séance ______________________

  let projectOpen = null;
  let roadmap = null;
  let arrayAcquired: Objective[] = [];
  let arrayInProgress: Objective[] = [];
  let arrayUpComming: Objective[] = [];

  if (search === "") {
    console.log("Aucun projet n'est sélectionné");
  } else {
    projectOpen = await prisma.project.findUnique({
      where: { id: search, userId: session.user.id },
      include: {
        seances: true,
      },
    });

    if (!projectOpen) {
      return <div>Aucun projet sélectionné !</div>;
    }

    roadmap = await prisma.roadmap.findUnique({
      where: { projectId: projectOpen.id, userId: session.user.id },
      include: {
        module: {
          include: {
            objectives: true,
            criterias: true,
          },
        },
      },
    });
  }

  if (search === "")
    return (
      <div className="w-[83%] h-screen flex items-center justify-center">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold font-mono text-gray-100">
            Choisis ton projet !
          </h1>
          <p className="mb-8 text-gray-100">
            Sélectionne dans le menu un projet
          </p>
          <p className="mb-14 text-gray-100">
            Si tu n'as aucun project en cours tu peux en créer un de nouveau
            dans l'onglet de sélection
          </p>
        </div>
      </div>
    );

  if (roadmap) {
    roadmap.module.forEach((module) => {
      module.objectives.forEach((objective) => {
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

  //_______________ Date et mise à jour _______________________
  const dateToday = format(new Date(), "dd/MM/yyyy", { locale: fr });

  return (
    <div className="w-[80%] flex flex-col items-center p-18">
      {projectOpen && (
        <div className="w-full flex flex-col">
          {!roadmap && (
            <div className="w-full h-screen flex flex-col justify-center items-center">
              <h1 className="text-xl font-mono font-bold mb-6">
                Vous n'avez pas inséré de Roadmap dans votre projet !
              </h1>
              <div className="flex">
                <p className="font-mono">Rendez vous dans la section</p>
                <BtnDirectNewRoadmap idProject={search} />
              </div>
            </div>
          )}
          {roadmap && (
            <div className="w-full flex flex-col">
              <h1 className="text-2xl font-mono text-gray-100 font-bold">
                Vue d'ensemble
              </h1>
              <p className="text-gray-300 font-mono text-xs">
                {dateToday} Mise à jour il y à ...
              </p>
              <div className="w-full flex justify-center items-start">
                <TimeLine seances={projectOpen.seances} roadmap={roadmap} />
              </div>
              <div className="w-full flex justify-between mt-10">
                <ListObjective
                  acquired={arrayAcquired}
                  inProgress={arrayInProgress}
                  upComming={arrayUpComming}
                  numberModule={roadmap.module.length}
                />
                <DetailProject />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
