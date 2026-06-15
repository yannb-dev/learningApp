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
import SeanceForm from "../components/SeanceForm";

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

  const filePath = path.join(
    process.cwd(),
    "public",
    "template",
    "markdownRoadMap.md",
  );
  const template = fs.readFileSync(filePath, "utf-8");

  const roadmap = await prisma.roadmap.findUnique({
    where: {
      projectId: project,
      userId: session.user.id,
    },
  });

  return (
    <div className="p-6">
      <BtnBack />
      {!roadmap && (
        <div>
          <MarkdownForm file={template} />
          <RoadMapForm idProject={project} />
        </div>
      )}
      {roadmap && (
        <div className="w-full flex flex-col">
          <h3 className="font-mono font-bold">Ma roadmap :</h3>
          <div className="w-[70%] h-30 flex flex-col justify-evenly border-2 border-black rounded-xl p-4 mt-6">
            <h1 className="font-bold">{roadmap.name}</h1>
            <p>{roadmap.objective}</p>
            <DeleteRoadmap roadmapId={roadmap.id} />
          </div>
          <div className="mt-10">
            <h3 className="font-mono font-bold">
              Importer une session de travail :
            </h3>
            <SeanceForm />
          </div>
        </div>
      )}
    </div>
  );
}
