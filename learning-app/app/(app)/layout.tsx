import Image from "next/image";
import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

//______________ import components ____________________
import BtnLogOut from "./components/BtnLogOut";
import SelectProject from "./components/SelectProject";
import NavBtn from "./components/NavBtn";
import IconApp from "./components/IconApp";

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

  if (!project) redirect("/newproject");

  return (
    <div className="w-screen flex">
      {/* aside */}
      <div className="h-screen w-[17%] flex flex-col justify-between bg-aside border-r-2 border-gray-500">
        <div className="w-full flex flex-col items-start p-2">
          <div className="w-full flex p-6">
            <IconApp className=" w-16 h-16 text-gray-400" />

            <h1 className="font-mono font-bold text-xl ml-4 text-gray-100">
              Learning APP
            </h1>
          </div>
          <div className="h-px w-full bg-gray-600 mb-12"></div>
          <NavBtn idProject={project[0].id} />
        </div>
        <div>
          <div className="h-px w-full bg-gray-600"></div>
          <SelectProject projectList={project} />
          <BtnLogOut />
        </div>
      </div>
      {/* main */}
      {children}
    </div>
  );
}
