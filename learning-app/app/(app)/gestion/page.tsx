import fs from "fs";
import path from "path";
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

//___________ type _______________________________

import { Seance } from "@/app/generated/prisma";
type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function GestionPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const { project } = await searchParams;

  const listProject = await prisma.project.findMany({
    where: {
      id: project,
      userId: session.user.id,
    },
  });

  if (listProject.length === 0)
    return (
      <div className="h-scren w-full flex justify-center items-center font-mono font-bold text-xl text-white">
        <h1>
          Oups ! Impossible de charger ton projet. Sélectionne le dans l'onglet
          "Mon Projet"
        </h1>
        ;
      </div>
    );

  const templateRoadmap = getTemplateRoadmap();
  const templateSeance = getTemplateSeance();

  // ___________ chargement de la roadmap unique _________
  const roadmap = await prisma.roadmap.findUnique({
    where: {
      projectId: project,
      userId: session.user.id,
    },
    include: {
      module: {
        include: { objectives: true },
      },
    },
  });

  // __________ chargement des seances ____________________

  const seance = await prisma.seance.findMany({
    where: {
      projectId: project,
      userId: session.user.id,
    },
  });

  return (
    <div className="w-[83%] h-screen p-12 overflow-y-scroll font-mono">
      <div>
        {!roadmap && (
          <div>
            <MarkdownForm file={templateRoadmap} />
            <RoadMapForm idProject={project} />
          </div>
        )}
        {roadmap && (
          <div className="w-full flex flex-col text-gray-300">
            <h3 className="text-xl font-bold">Ma roadmap</h3>
            <section className="w-full h-auto flex flex-col border border-gray-300 bg-aside rounded-xl p-6 mt-6">
              <div className="w-full flex justify-evenly">
                <div className="w-[50%] flex flex-col">
                  <h1 className="text-2xl font-bold">{roadmap.name}</h1>
                  <p className="text-xs">
                    {format(roadmap.createdAt, "dd/MM/yyyy", { locale: fr })}
                  </p>
                  <div className="w-full flex mt-6 text-sm">
                    <p>Objectif :</p>
                    <div className="w-[70%] ml-2 text-justify">
                      {roadmap.objective}
                    </div>
                  </div>
                </div>
                <div className="w-[50%] flex flex-col">
                  <div className="flex justify-evenly mb-6">
                    <p className="text-amber-600 font-bold p-1 border border-gray-300 rounded-xl">
                      {roadmap.duration} heures
                    </p>
                    <p className="text-amber-600 font-bold p-1 border border-gray-300 rounded-xl">
                      {roadmap.module.length} Modules
                    </p>
                  </div>
                  <p>
                    Format d'apprentissage : {roadmap.dispo} heures par semaine
                  </p>
                </div>
              </div>
              <DeleteRoadmap roadmapId={roadmap.id} />
            </section>

            <div className="flex mt-10">
              <h3 className=" font-bold mb-4">Générer mon modele :</h3>
              <JsonForm roadmap={roadmap} templateSeance={templateSeance} />
            </div>

            <div className="w-full h-auto flex flex-col justify-evenly border border-gray-300 bg-aside rounded-xl p-6 mt-10 text-xs">
              <div className="mb-8">
                <div className="flex justify-evenly text-gray-500">
                  <div className="w-[15%]">Date</div>
                  <div className="w-[25%]">Détail</div>
                  <div className="w-[30%]">Accompli</div>
                  <div className="w-[25%]">Prochaines étapes</div>
                </div>
              </div>
              {seance &&
                seance.map((seance: Seance) => (
                  <div key={seance.id} className="flex flex-col">
                    <div className="flex justify-evenly" key={seance.id}>
                      <div className="w-[15%]">
                        {format(seance.createdAt, "dd/MM/yyyy", { locale: fr })}
                      </div>
                      <div className="w-[25%] text-justify">{seance.sujet}</div>
                      <div className="w-[30%] text-justify">
                        {seance.accomplished}
                      </div>
                      <div className="w-[25%] text-justify">{seance.next}</div>
                    </div>
                    <div className="h-px w-full rounded-sm bg-gray-400 mt-10 mb-12"></div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
