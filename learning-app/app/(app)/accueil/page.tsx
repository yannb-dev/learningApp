import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

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
  let objectivesAcquired = null;
  let objectivesInProgress = null;
  let objectivesUpComming = null;

  if (search === "") {
    console.log("Aucun projet n'est sélectionné");
  } else {
    projectOpen = await prisma.project.findUnique({
      where: { id: search },
      include: {
        seances: true,
      },
    });

    roadmap = await prisma.roadmap.findUnique({
      where: { projectId: projectOpen.id },
      include: {
        module: {
          include: {
            objectives: true,
          },
        },
      },
    });
  }

  if (roadmap) {
    objectivesAcquired = await prisma.objective.findMany({
      where: { projectId: projectOpen.id, state: "Acquired" },
    });

    objectivesInProgress = await prisma.objective.findMany({
      where: { projectId: projectOpen.id, state: "InProgress" },
    });

    objectivesUpComming = await prisma.objective.findMany({
      where: { projectId: projectOpen.id, state: "UpComming" },
    });
  }

  console.log(objectivesUpComming);

  return (
    <div className="w-full flex flex-col items-center">
      {projectOpen && (
        <div className="w-full flex flex-col">
          <nav className="w-full flex justify-evenly">
            <NavBtn idProject={projectOpen.id} />
          </nav>
          {!roadmap && (
            <div className="w-full h-[100vh] flex flex-col justify-center items-center">
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
                  acquired={objectivesAcquired}
                  inProgress={objectivesInProgress}
                  upComming={objectivesUpComming}
                />
              </div>
            </div>
          )}
        </div>
      )}
      <div className="w-full h-[100vh] flex items-center justify-center">
        {search === "" && (
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold font-mono">
              Choisis ton projet !
            </h1>
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
        )}
      </div>
    </div>
  );
}
