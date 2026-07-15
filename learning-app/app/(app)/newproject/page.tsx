import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import ProjectForm from "../components/ProjectForm";

import { redirect } from "next/navigation";

export default async function NewProject() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/login");

  return (
    <div className="w-[83%] p-12 text-gray-300">
      <ProjectForm />
    </div>
  );
}
