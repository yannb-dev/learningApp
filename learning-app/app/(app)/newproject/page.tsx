import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import ProjectForm from "../components/ProjectForm";

//______________ import icon __________________________
import { FaRegHandPointRight } from "react-icons/fa";

import { redirect } from "next/navigation";

export default async function NewProject() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/login");

  return (
    <div className="w-[83%] text-gray-300">
      <ProjectForm />
    </div>
  );
}
