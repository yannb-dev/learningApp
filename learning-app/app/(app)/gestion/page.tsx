import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { getTemplateRoadmap, getTemplateSeance } from "@/lib/template";

//__________ import components ___________________
import MarkdownForm from "../components/MarkdownForm";
import RoadMapForm from "../components/RoadMapForm";
import DeleteRoadmap from "../components/DeleteRoadmap";
import JsonForm from "../components/JsonForm";
import Card from "../components/ui/Card";
import DivAmber from "../components/ui/DivAmber";

//___________ type _______________________________

import { Seance } from "@prisma/client";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function GestionPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const { project } = await searchParams;

  if (!project || Array.isArray(project)) redirect("/");

  const projectUpdate = await prisma.project.findUnique({
    where: {
      id: project,
      userId: session.user.id,
    },
    include: {
      roadmap: {
        include: {
          module: {
            include: {
              objectives: true,
            },
          },
        },
      },
      seances: true,
    },
  });

  if (!projectUpdate)
    return (
      <div className="h-scren w-full flex justify-center items-center  font-bold text-xl ">
        <h1>
          Oups ! Impossible de charger ton projet. Sélectionne le dans
          l&apos;onglet &quot;Mon Projet&quot;
        </h1>
        ;
      </div>
    );

  const templateRoadmap = getTemplateRoadmap();
  const templateSeance = getTemplateSeance();

  return (
    <div className="page md:w-[83%] md:h-screen md:p-12 overflow-y-scroll">
      <div className="w-full">
        <div className="w-full">
          <MarkdownForm file={templateRoadmap} />
          <RoadMapForm idProject={project} />
        </div>
        {projectUpdate.roadmap && (
          <div className="w-full flex flex-col ">
            <h3 className="text-xl font-bold">Ma roadmap</h3>
            <Card className="h-auto p-6">
              <section>
                <div className="w-full flex flex-col md:flex-row justify-evenly">
                  <div className="w-full md:w-[50%] flex flex-col">
                    <h1 className="text-2xl font-bold">
                      {projectUpdate.roadmap.name}
                    </h1>
                    <p className="text-xs">
                      {format(projectUpdate.roadmap.createdAt, "dd/MM/yyyy", {
                        locale: fr,
                      })}
                    </p>
                    <div className="w-full flex flex-col md-flex-row mt-6 text-sm">
                      <p className="mb-4 md:mb-0">Objectif :</p>
                      <div className="w-[70%] ml-2 text-justify">
                        {projectUpdate.roadmap.objective}
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-[50%] flex flex-col">
                    <div className="flex justify-evenly mt-6 md:mt-0 mb-6">
                      <DivAmber>
                        <p>{projectUpdate.roadmap.duration} heures</p>
                      </DivAmber>
                      <DivAmber>
                        <p>{projectUpdate.roadmap.module.length} Module</p>
                      </DivAmber>
                    </div>
                    <p>
                      Format d&apos;apprentissage :{" "}
                      {projectUpdate.roadmap.dispo} heures par semaine
                    </p>
                  </div>
                </div>
                <DeleteRoadmap roadmapId={projectUpdate.roadmap.id} />
              </section>
            </Card>

            <div className="flex flex-col mt-10">
              <h3 className=" font-bold mb-4">Générer mon modele :</h3>
              <JsonForm
                roadmap={projectUpdate.roadmap}
                templateSeance={templateSeance}
              />
            </div>
            {projectUpdate.seances.length !== 0 && (
              <Card className="h-auto overflow-x-scroll md:overscroll-none justify-evenly  p-6 text-xs">
                <div>
                  <div className="w-300">
                    <div className="mb-8">
                      <div className="flex justify-evenly text-gray-500">
                        <div className="w-16 md:w-[15%]">Date</div>
                        <div className="w-40 md:w-[25%]">Détail</div>
                        <div className="w-96 md:w-[30%]">Accompli</div>
                        <div className="w-96 md:w-[25%]">Prochaines étapes</div>
                      </div>
                    </div>
                    {projectUpdate.seances &&
                      projectUpdate.seances.map((seance: Seance) => (
                        <div key={seance.id} className="flex flex-col">
                          <div className="flex justify-evenly" key={seance.id}>
                            <div className="h-auto w-16 md:w-[15%]">
                              {format(seance.createdAt, "dd/MM/yyyy", {
                                locale: fr,
                              })}
                            </div>
                            <div className="h-auto w-40 md:w-[25%] text-justify">
                              {seance.sujet}
                            </div>
                            <div className="h-auto w-100 md:w-[30%] text-justify">
                              {seance.accomplished}
                            </div>
                            <div className="h-auto w-100 md:w-[25%] text-justify">
                              {seance.next}
                            </div>
                          </div>
                          <div className="h-px w-full rounded-sm bg-gray-400 mt-10 mb-12"></div>
                        </div>
                      ))}
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
