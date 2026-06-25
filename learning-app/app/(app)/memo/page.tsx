import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

import BtnBack from "../components/BtnBack";

export default async function MemoPage({ searchParams }) {
  const session = getServerSession(authOptions);

  if (!session) redirect("/login");

  const { idProject } = await searchParams;
  return (
    <div className="p-6">
      <BtnBack />
    </div>
  );
}
