import prisma from "@/lib/prisma";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import DeleteRoadmap from "../components/DeleteRoadmap";

export default async function RoadmapPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const roadmap = await prisma.roadmap.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <div>
      {roadmap &&
        roadmap.map((r) => (
          <div key={r.id}>
            {r.name}
            <DeleteRoadmap roadmapId={r.id} />
          </div>
        ))}
    </div>
  );
}
