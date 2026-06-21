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

  const projectOpen = await prisma.project.findUnique({
    where: { id: search },
    include: {
      seances: true,
    },
  });

  //___________ Import de la roadmap ____________________________

  const roadmap = await prisma.roadmap.findUnique({
    where: { projectId: projectOpen.id },
    select: {
      createdAt: true,
      echeance: true,
    },
  });

  return (
    <div className="w-full flex flex-col items-center">
      {projectOpen && (
        <div className="w-full flex flex-col">
          <nav className="w-full flex justify-evenly">
            <NavBtn idProject={projectOpen.id} />
          </nav>
          <div>
            <h3>TimeLine</h3>
            <TimeLine seances={projectOpen.seances} roadmap={roadmap} />
          </div>
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
              <div className="h-90 w-70 flex border-2 border-black rounded-xl p-6 ">
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
