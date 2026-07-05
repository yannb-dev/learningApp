import prisma from "@/lib/prisma";

import DeleteProject from "../components/DeleteProject";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

//___________ type ________________________________
type SearchParams = Promise<{ [key: string]: string }>;

export default async function profil({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const { project } = await searchParams;

  const search = typeof project === "string" ? project : "";

  const projectOpen = await prisma.project.findUnique({
    where: {
      id: search,
      userId: session.user.id,
    },
  });

  console.log(projectOpen);

  return (
    <div>
      <div className="flex text-gray-300">
        <h3>{projectOpen.name}</h3>
        <DeleteProject projectId={search} />
      </div>
    </div>
  );
}
