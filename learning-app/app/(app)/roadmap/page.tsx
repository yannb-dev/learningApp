import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

//___________ type _______________________________
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type ModuleWithObjective = Prisma.ModuleGetPayload<{
  include: {
    objectives: true;
  };
}>;

//______________Component ___________________________
import Card from "../components/ui/Card";
import ListModule from "../components/ListModule";
import BtnDirectNewRoadmap from "../components/BtnDirectNewRoadmap";

//______________ import icon __________________________
import { TbPointFilled } from "react-icons/tb";

//___________ handleTypeObjective _______________

function handleTypeObjective(type: string, module: ModuleWithObjective) {
  const total = module.objectives.length;

  const lengthObjective = module.objectives.filter(
    (objective) => objective.state === type,
  );

  const result = (100 * lengthObjective.length) / total;

  return result;
}

export default async function RoadmapPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { project } = await searchParams;

  if (!project || Array.isArray(project)) redirect("/");

  const listProject = await prisma.project.findMany({
    where: {
      id: project,
      userId: session.user.id,
    },
    select: { id: true },
  });

  if (listProject.length === 0)
    return (
      <div className="h-scren w-full flex justify-center items-center  font-bold text-xl ">
        <h1>
          Oups ! Impossible de charger ton projet. Sélectionne le dans
          l&apos;onglet &quot;Mon Projet&quot;
        </h1>
        ;
      </div>
    );

  const roadmap = await prisma.roadmap.findUnique({
    where: {
      projectId: project,
      userId: session.user.id,
    },
    include: {
      module: {
        include: {
          criterias: true,
          objectives: true,
          practicalproject: true,
        },
        orderBy: { numModule: "asc" },
      },
    },
  });

  return (
    <div className="page md:w-[83%] md:p-12">
      {roadmap ? (
        <main className="w-full flex flex-col">
          <div>
            <h1 className="text-xl font-bold">Roadmap</h1>
            <p className="text-xs">
              Crée le {format(roadmap.createdAt, "dd/MM/yyyy", { locale: fr })}
            </p>
          </div>
          <div className="w-full flex flex-col p-2">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card
                className="h-70"
                children={
                  <div>
                    <h3 className="m-2 font-bold">Evolution par module</h3>
                    <div className="w-full flex justify-evenly">
                      <p className="flex items-center">
                        <TbPointFilled className="text-green-600" /> aquis
                      </p>
                      <p className="flex items-center">
                        <TbPointFilled className="text-amber-600" />
                        en cours
                      </p>
                      <p className="flex items-center">
                        <TbPointFilled className="text-red-500" />
                        non abordé
                      </p>
                    </div>
                    <div className="h-1px w-full bg-gray-300"></div>
                    <div className="w-full h-full flex p-2">
                      <div className="w-[10%] h-45 flex flex-col justify-between">
                        <p>100%</p>
                        <p>0%</p>
                      </div>
                      <div className="w-[90%] h-full flex justify-evenly">
                        {roadmap.module.map((module: ModuleWithObjective) => (
                          <div className="h-45 flex flex-col" key={module.id}>
                            <div className="h-full w-3 flex flex-col rounded-tr-xl rounded-tl-xl overflow-hidden">
                              <div
                                style={{
                                  height: `${handleTypeObjective("UpComming", module)}%`,
                                }}
                                className=" bg-red-500"
                              ></div>
                              <div
                                style={{
                                  height: `${handleTypeObjective("InProgress", module)}%`,
                                }}
                                className=" bg-amber-500"
                              ></div>
                              <div
                                style={{
                                  height: `${handleTypeObjective("Acquired", module)}%`,
                                }}
                                className=" bg-green-500"
                              ></div>
                            </div>
                            <p>{module.numModule}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                }
              />
              <Card
                className="h-70"
                children={
                  <div>
                    <h3 className="m-2 font-bold">Description</h3>
                    <div className="h-px w-full bg-gray-300"></div>
                    <div className="p-4 w-full flex flex-col">
                      <h3>Mon projet :</h3>
                      <p className="text-xs text-gray-400 mb-4 mt-2">
                        {roadmap.name}
                      </p>
                      <h3>Mon objectif :</h3>
                      <p className="text-xs text-gray-400 text-justify mt-2">
                        {roadmap.objective}
                      </p>
                    </div>
                  </div>
                }
              />
            </div>
            <ListModule module={roadmap?.module} />
          </div>
        </main>
      ) : (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold mb-2">
            Vous n&quot;avez pas inséré de Roadmap dans votre projet !
          </h1>
          <div className="flex items-center">
            <p className="font-mono mr-4">Rendez vous dans la section</p>
            <BtnDirectNewRoadmap idProject={project} />
          </div>
        </div>
      )}
    </div>
  );
}
