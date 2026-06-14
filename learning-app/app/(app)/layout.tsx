import Image from "next/image";
import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

//______________ import components ____________________
import BtnLogOut from "./components/BtnLogOut";
import SelectProject from "./components/SelectProject";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const project = await prisma.project.findMany({
    where: { userId: session.user.id },
  });

  return (
    <div>
      <div className="h-30 flex pt-8 pl-12 pr-12 pb-8 justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/wolf.png"
            width={60}
            height={60}
            alt="Logo Wolf"
            priority
            unoptimized
          />
          <h1 className="font-mono font-bold text-2xl ml-4">Learning APP</h1>
        </div>
        <SelectProject projectList={project} />
        <BtnLogOut />
      </div>
      {children}
      <div className="h-30"></div>
    </div>
  );
}
