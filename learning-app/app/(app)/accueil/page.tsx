import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

// import components
import NavBtn from "../components/NavBtn";

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

  console.log("Projet open after select", projectOpen);

  return (
    <div className="w-full flex flex-col items-center">
      <NavBtn idProject={projectOpen.id} />
    </div>
  );
}
