import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import ProjectForm from "../components/ProjectForm";
import DeleteProject from "../components/DeleteProject";

import { redirect } from "next/navigation";

export default async function newProject() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/login");

  const project = await prisma.project.findMany({
    where: { userId: session.user.id },
  });
  return (
    <div>
      <ProjectForm />
      {project &&
        project.map((project) => (
          <div key={project.id}>
            <h1>{project.name}</h1>
            <DeleteProject projectId={project.id} />
          </div>
        ))}
    </div>
  );
}
