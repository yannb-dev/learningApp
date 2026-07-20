import Image from "next/image";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// ______________import components ________________
import BtnOpenApp from "./(app)/components/BtnOpenApp";
import IconApp from "./(app)/components/IconApp";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-4xl text-gray-300 font-mono font-bold mb-18">
        Learning App
      </h1>
      <IconApp className=" w-20 h-20 text-gray-100" />
      <h3 className="text-xl text-gray-300 font-mono font-bold mb-18 mt-12">
        Bonjour {session.user.name}
      </h3>
      <BtnOpenApp />
    </div>
  );
}
