import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { Objective } from "@/app/generated/prisma";

//__________ import components ___________________
import NavBtn from "../components/NavBtn";
import TimeLine from "../components/TimeLine";

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

  if (!roadmap)
    return (
      <div className="w-[83%] h-screen flex items-center justify-center">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold font-mono">Choisis ton projet !</h1>
          <p className="mb-14">Sélectionne dans le menu en haut de la page</p>
          <div className="w-[70%] flex flex-wrap justify-center gap-10">
            <div className="h-90 w-70 flex flex-col border-2 border-black rounded-xl p-6 ">
              <h3>Tips</h3>
            </div>
            <div className="h-90 w-70 flex border-2 border-black rounded-xl p-6 ">
              <h3>Nouveauté</h3>
            </div>
            <div className="h-90 w-70 flex border-2 border-black rounded-xl p-6 ">
              <h3>Mon activté</h3>
            </div>
          </div>
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

  return (
    <div className="w-[80%] flex flex-col items-center">
      {projectOpen && (
        <div className="w-full flex flex-col">
          {!roadmap && (
            <div className="w-full h-screen flex flex-col justify-center items-center">
              <h1 className="text-xl font-mono font-bold mb-6">
                Vous n'avez pas inséré de Roadmap dans votre projet !
              </h1>
              <p className="font-mono">
                Rendez vous dans la section "Gestion"{" "}
              </p>
            </div>
          )}
          {roadmap && (
            <div className="w-full flex flex-col">
              <h1 className="text-xl font-mono - font-bold mt-8 mb-8 ml-8">
                Ma Time-line d'apprentissage :
              </h1>
              <div className="w-full flex justify-center items-start p-6">
                <TimeLine
                  seances={projectOpen.seances}
                  roadmap={roadmap}
                  acquired={arrayAcquired}
                  inProgress={arrayInProgress}
                  upComming={arrayUpComming}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
