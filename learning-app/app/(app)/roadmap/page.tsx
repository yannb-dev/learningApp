import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { z } from "zod";

import { RoadMapWithChildren } from "@/lib/schema/RoadmapApi";

//___________ type _______________________________
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Module = z.infer<typeof RoadMapWithChildren>["roadmap"]["module"][number];
type RoadmapData = Prisma.RoadmapGetPayload<{
  include: {
    module: {
      include: {
        criterias: true;
        objectives: true;
      };
    };
  };
}>;

//______________import components _____________________
import BtnBack from "../components/BtnBack";

//______________ import icon __________________________
import { ImArrowDown } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

//______________ function _____________________________
function stateObjective(state: string) {
  if (state === "UpComming") {
    return "bg-red-500";
  }

  if (state === "InProgress") {
    return "bg-yellow-500";
  }

  if (state === "Acquired") {
    return "bg-green-500";
  }
}

function calculNumObjective(roadmap: RoadmapData) {
  let totalObjective = 0;

  const numObjective = roadmap.module.forEach((module) => {
    totalObjective = totalObjective + module.objectives.length;
  });

  return totalObjective;
}

function calculUpComming(roadmap: RoadmapData) {
  let totalUpComming = 0;
  roadmap.module.forEach((module) => {
    module.objectives.map((objective) => {
      if (objective.state === "UpComming") {
        totalUpComming = totalUpComming + 1;
      }
    });
  });
  return totalUpComming;
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

  const roadmap = await prisma.roadmap.findFirst({
    where: {
      projectId: project,
      userId: session.user.id,
    },
    include: {
      module: {
        include: {
          criterias: true,
          objectives: true,
        },
        orderBy: { numModule: "asc" },
      },
    },
  });

  return (
    <div className="p-6">
      <BtnBack />
      {roadmap ? (
        <main>
          <h1 className="text-center text-2xl font-mono font-bold">
            Objectif atteint {calculUpComming(roadmap)}/
            {calculNumObjective(roadmap)}
          </h1>
          <div className="mb-6">
            <h1 className="font-mono font-bold mb-2">Mon projet :</h1>
            <p>{roadmap.name}</p>
          </div>
          <section className="w-full flex">
            <div className="h-auto w-[20%] flex flex-col">
              <h3 className="font-mono font-bold mb-2">Mon objectif :</h3>
              <p className="text-justify">{roadmap.objective}</p>
            </div>
            <div className="h-auto w-[80%] flex flex-col items-center">
              {roadmap.module.map((module) => (
                <div
                  className="w-[80%] flex h-auto bg-gray-100 rounded-xl mb-6 border-2 border-gray-300"
                  key={module.id}
                >
                  <div className="h-full w-[20%] flex flex-col justify-between items-center pt-16 pb-16">
                    <h1 className="font-mono font-bold text-xl">
                      Module N°{module.numModule}
                    </h1>
                    <p className="font-mono font-bold mt-4 text-2xl">
                      {module.duration} heures
                    </p>
                    <ImArrowDown className="text-4xl text-red-500" />
                  </div>
                  <div className="w-[80%] h-auto flex flex-col bg-gradient-to-r from-rose-100 to-red-400 border-1 border-gray-300">
                    <div className="h-auto flex-col w-full p-4">
                      <h3 className="font-mono font-bold mt-4">Pré-requis :</h3>

                      <p>{module.prerequisites}</p>

                      <h3 className="font-mono font-bold mt-4">
                        Point critique
                      </h3>

                      <p>{module.pointcritical}</p>
                      <div className="w-full flex justify-center items-center mt-4 mb-4">
                        <div className="h-1 rounded-xl w-[60%] bg-black"></div>
                      </div>
                    </div>
                    <div className="h-auto w-full p-4">
                      <h3 className="font-mono font-bold mb-4">
                        Compétences :
                      </h3>
                      <ul>
                        {module.objectives.map((objective) => (
                          <li className="flex mb-2" key={objective.id}>
                            <div
                              className={`h-6 w-6 rounded-[50%] mr-6 ${stateObjective(objective.state)}`}
                            ></div>
                            <p>{objective.name}</p>
                          </li>
                        ))}
                      </ul>
                      <h3 className="font-mono font-bold mt-4 mb-4">
                        Critère de validation :
                      </h3>
                      <ul>
                        {module.criterias.map((criteria) => (
                          <li
                            className="flex items-center mb-2"
                            key={criteria.id}
                          >
                            <FaCheck className="mr-6" />
                            {criteria.name}
                          </li>
                        ))}
                      </ul>
                      <div className="w-full flex justify-center items-center mt-4 mb-4">
                        <div className="h-1 rounded-xl w-[60%] bg-black"></div>
                      </div>
                    </div>
                    <div className="h-auto w-full flex flex-col p-4 bg-gray-100">
                      <h3 className="font-mono font-bold mb-4">Projet :</h3>
                      <p>{module.practicalproject}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      ) : (
        <div className="w-full flex flex-col justify-center items-center ">
          <h1 className="text-xl font-mono font-bold mt-20">
            Aucune Roadmap !
          </h1>
          <p>
            Rendez vous dans la section "Gestion" pour créer votre roadmap
            personnalisé.
          </p>
        </div>
      )}
    </div>
  );
}
