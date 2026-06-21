import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

//__________ import components ___________________
import MarkdownForm from "../components/MarkdownForm";
import BtnBack from "../components/BtnBack";
import RoadMapForm from "../components/RoadMapForm";
import DeleteRoadmap from "../components/DeleteRoadmap";
import JsonForm from "../components/JsonForm";
import DeleteSeance from "../components/DeleteSeance";

//___________ type _______________________________
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function GestionPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const { project } = await searchParams;

  // _________ import fichier markdownRoadmap _________
  const filePathRoadMap = path.join(
    process.cwd(),
    "public",
    "template",
    "markdownRoadMap.md",
  );
  const templateRoadmap = fs.readFileSync(filePathRoadMap, "utf-8");

  // _________ import fichier markdownRoadmap _________
  const filePathSeance = path.join(
    process.cwd(),
    "public",
    "template",
    "markdownSeance.md",
  );
  const templateSeance = fs.readFileSync(filePathSeance, "utf-8");

  // ___________ chargement de la roadmap unique _________

  const roadmap = await prisma.roadmap.findUnique({
    where: {
      projectId: project,
      userId: session.user.id,
    },
    select: {
      id: true,
      name: true,
      objective: true,
      duration: true,
      dispo: true,
      projectId: true,
      module: {
        select: {
          id: true,
          name: true,
          objectives: {
            select: {
              id: true,
              name: true,
              state: true,
            },
          },
        },
      },
    },
  });

  // __________ chargement des seances ____________________

  const seance = await prisma.seance.findMany({
    where: {
      projectId: project,
    },
    include: {
      memos: true,
    },
  });

  // __________ formatage date ______________________________

  // const date = new Date(seance[0].createdAt);

  // const formatter = new Intl.DateTimeFormat("fr-FR", {
  //   day: "2-digit",
  //   month: "long",
  //   year: "numeric",
  // });

  return (
    <div className="p-6">
      <BtnBack />
      {!roadmap && (
        <div>
          <MarkdownForm file={templateRoadmap} />
          <RoadMapForm idProject={project} />
        </div>
      )}
      {roadmap && (
        <div className="w-full flex flex-col">
          <h3 className="font-mono font-bold">Ma roadmap :</h3>
          <section className="w-[50%] h-auto flex flex-col justify-evenly border-2 border-black rounded-xl mt-6">
            <div className="w-full h-10 bg-gray-300 flex items-center rounded-tl-xl rounded-tr-xl">
              <h1 className="text-xl font-mono font-bold ml-6">
                {roadmap.name}
              </h1>
            </div>
            <div className="w-full flex justify-evenly mt-4">
              <div className="w-[45%]">
                <h3 className="font-mono font-bold">Mon objectif :</h3>
                <p className="text-justify">{roadmap.objective}</p>
              </div>
              <div className="w-[45%] flex flex-col">
                <div className="w-full flex justify-evenly mb-4 ">
                  <div className="p-1 rounded-sm bg-red-300">
                    <strong>{roadmap.duration}</strong> Heures
                  </div>
                  <div className="p-1 rounded-sm bg-red-300">
                    <strong>{roadmap.module.length}</strong> Modules
                  </div>
                </div>
                <p className="text-center font-bold">
                  Format : {roadmap.dispo}h / semaine
                </p>
              </div>
            </div>
            <DeleteRoadmap roadmapId={roadmap.id} />
          </section>
          <div className="mt-10">
            <h3 className="font-mono font-bold mb-4">
              Générer et Importer une session de travail :
            </h3>
            <JsonForm roadmap={roadmap} templateSeance={templateSeance} />
          </div>
          <div className="mt-10">
            <h3 className="font-mono font-bold mb-4">
              Liste des sessions précédentes :
            </h3>
            {seance && (
              <div>
                {/* {seance.map((seance) => (
                  <div key={seance.id}>
                    <h3>Session du : {formatter.format(date)}</h3>
                    <DeleteSeance seanceId={seance.id} />
                  </div>
                ))} */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
