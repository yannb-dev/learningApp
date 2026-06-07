import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

// import components
import BtnNavProject from "../components/BtnNavProject";

export default async function AppPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const project = await prisma.project.findMany({
    where: { userId: session.user.id },
  });

  console.log(project);

  return (
    <div>
      <h1>Page d'accueil</h1>
      <BtnNavProject />
    </div>
  );
}
