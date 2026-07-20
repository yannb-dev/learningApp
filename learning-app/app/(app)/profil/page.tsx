import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

// ___________ component ______________________
import Toogle from "../components/Toggle";
import DeleteProject from "../components/DeleteProject";
import Card from "../components/ui/Card";

//___________ icon ____________________________
import { FaFlag } from "react-icons/fa";

//___________ type ________________________________
import { Objective } from "@/lib/generated/prisma";
import { Project } from "@/lib/generated/prisma";

type SearchParams = Promise<{ [key: string]: string }>;
type ProjectWithObjective = Prisma.ProjectGetPayload<{
  include: { objectives: true };
}>;

function ratioObjective(objectives: Objective[]) {
  const nbrObjective = objectives.length;

  const acquiredObjective = objectives.filter(
    (objective) => objective.state === "Acquired",
  );
  return (
    <div>
      <p className="md:ml-12 font-bold">
        Objectifs atteints : {acquiredObjective.length}/{nbrObjective}
      </p>
    </div>
  );
}

export default async function Profil({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const project: ProjectWithObjective[] = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      objectives: true,
    },
  });

  return (
    <div className="page md:w-[83%] h-screen">
      <h1 className="text-xl font-bold">Profil utilisateur</h1>
      <div className="w-full flex flex-col items-center">
        <Card
          className="md:w-[70%] h-auto p-6"
          children={
            <div>
              <h3>Utilisateur : {session.user.name}</h3>
              <h3>Adresse Mail : {session.user.email}</h3>
            </div>
          }
        />
        <Card
          className="md:w-[70%] h-auto p-6"
          children={
            <div>
              <h3 className="font-bold mb-6">Mes projets :</h3>
              <div className="w-full flex flex-col">
                {project.map((project: ProjectWithObjective) => (
                  <div
                    className="w-full flex flex-col md:flex-row items-center justify-between p-2 md:p-6 border-t-2 border-gray-300"
                    key={project.id}
                  >
                    <div className="w-full md:w-[45%] flex flex-col :md:flex-row ">
                      <FaFlag className="text-amber-600" />
                      <h1 className="font-mono ml-6">{project.name}</h1>
                      {ratioObjective(project.objectives)}
                    </div>
                    <div className="w-full md:w-[45%] flex flex-col md:flex-row mt-6 md:mt-0">
                      <p className="mb-6 md:mb-0">
                        Créé le{" "}
                        {format(project.createdAt, "dd/MM/yyyy", {
                          locale: fr,
                        })}
                      </p>
                      <DeleteProject projectId={project.id} />
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="font-bold mt-12 mb-4">Mes préférences :</h3>
              <div className="flex items-center justify-between">
                <h3>Thème de l'application </h3>
                <Toogle />
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
