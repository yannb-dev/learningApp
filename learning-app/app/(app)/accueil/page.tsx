import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

//__________ import components ___________________
import NavBtn from "../components/NavBtn";

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

  const projectOpen = await prisma.project.findUnique({
    where: { id: search },
  });

  return (
    <div className="w-full flex flex-col items-center">
      {projectOpen && <NavBtn idProject={projectOpen.id} />}
    </div>
  );
}
