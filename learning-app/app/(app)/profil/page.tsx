import prisma from "@/lib/prisma";

import DeleteProject from "../components/DeleteProject";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Toogle from "../components/Toggle";

import { FaFlag } from "react-icons/fa";

//___________ type ________________________________
type SearchParams = Promise<{ [key: string]: string }>;

export default async function profil({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const project = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="w-[83%] h-screen flex flex-col p-12 text-gray-300 font-mono ">
      <h1 className="text-2xl font-bold">Profil utilisateur</h1>
      <div className="w-full flex flex-col items-center">
        <div className="w-[70%] h-40 flex flex-col bg-aside border-[1px] border-gray-300 rounded-xl p-6 mt-12">
          <h3>Utilisateur : {session.user.name}</h3>
          <h3>Adresse Mail : {session.user.email}</h3>
        </div>

        <div className="w-[70%] h-auto flex flex-col bg-aside border-[1px] border-gray-300 rounded-xl p-6 mt-12">
          <h3 className="font-bold mb-6">Mes projets :</h3>
          <div className="w-full flex flex-col text-gray-300">
            {project.map((project) => (
              <div
                className="w-full flex items-center justify-evenly"
                key={project.id}
              >
                <FaFlag />
                <h1 className="font-mono">{project.name}</h1>
                <p>
                  Créé le{" "}
                  {format(project.createdAt, "dd/MM/yyyy", { locale: fr })}
                </p>
                <DeleteProject projectId={project.id} />
              </div>
            ))}
          </div>
          <h3 className="font-bold mt-12 mb-4">Mes préférences :</h3>
          <div className="flex items-center justify-between">
            <h3>Thème de l'application </h3>
            <Toogle />
          </div>
        </div>
      </div>
    </div>
  );
}
