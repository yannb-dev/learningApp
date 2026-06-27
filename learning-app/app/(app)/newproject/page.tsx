import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import ProjectForm from "../components/ProjectForm";
import DeleteProject from "../components/DeleteProject";

import { Project } from "@/app/generated/prisma";

//______________ import icon __________________________
import { FaRegHandPointRight } from "react-icons/fa";

import { redirect } from "next/navigation";

export default async function NewProject() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/login");

  const project = await prisma.project.findMany({
    where: { userId: session.user.id },
  });

  return (
    <div>
      <ProjectForm />
      <h1 className="flex items-center mt-12 ml-12 font-mono font-bold">
        {" "}
        <FaRegHandPointRight className="mr-4" />
        Liste des projets :
      </h1>
      {project.length > 0 ? (
        project.map((project: Project) => (
          <div key={project.id}>
            <h1>{project.name}</h1>
            <DeleteProject projectId={project.id} />
          </div>
        ))
      ) : (
        <div>
          <h1 className="font-mono mt-6 ml-12">Aucun project initié</h1>
        </div>
      )}
    </div>
  );
}
