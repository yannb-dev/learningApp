import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

//______________ import components ____________________
import IconApp from "./components/IconApp";
import Menu from "./components/Menu";

//_______________ type _______________________________

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const listProject = await prisma.project.findMany({
    where: { userId: session.user.id },
  });

  return (
    <div className="w-full flex flex-col md:flex-row">
      {/* aside */}
      <div className="h-screen md:min-w-65 md:w-1/6 lg:w-1/8 flex flex-col justify-start bg-aside border-r-2 border-gray-500">
        <div className="w-full flex flex-col items-start">
          <div className="w-full flex justify-center items-center p-4">
            <div className="w-[10%] h-auto">
              <IconApp className="w-full h-full text-gray-100" />
            </div>

            <div className="w-[75%] flex flex-col">
              <h1 className=" font-bold text-lg md:text-xl ml-4 ">
                Learning APP
              </h1>
              <p className="text-xs md:flex ml-4 text-gray-300">
                Version 0.0.1
              </p>
            </div>
          </div>
          <div className="h-px w-full bg-gray-600 mb-2 md:mb-12"></div>
        </div>
        <Menu project={listProject} />
      </div>
      {/* main */}
      {children}
    </div>
  );
}
