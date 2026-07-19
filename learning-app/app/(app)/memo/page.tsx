import prisma from "@/lib/prisma";

import { Prisma } from "@/app/generated/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

// _______________type ___________________
import ListMemo from "../components/ListMemo";
type SearchParams = Promise<{ [key: string]: string | undefined }>;
type Memo = Prisma.MemoGetPayload<{
  include: {
    tags: true;
  };
}>;

export default async function MemoPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const { project } = await searchParams;

  const listProject = await prisma.project.findMany({
    where: {
      id: project,
      userId: session.user.id,
    },
    select: { id: true },
  });

  if (listProject.length === 0)
    return (
      <div className="h-scren w-full flex justify-center items-center font-mono font-bold text-xl text-white">
        <h1>
          Oups ! Impossible de charger ton projet. Sélectionne le dans l'onglet
          "Mon Projet"
        </h1>
        ;
      </div>
    );

  const memo = await prisma.memo.findMany({
    where: { projectId: project, userId: session.user.id },
    include: {
      tags: {
        orderBy: {
          slug: "asc",
        },
      },
    },
  });

  const arrayTag: { slug: string }[] = [];

  memo.forEach((memo: Memo) => {
    memo.tags.forEach((tag) => {
      const includeArray = arrayTag.some((a) => a.slug === tag.slug);

      if (!includeArray) {
        arrayTag.push({ slug: tag.slug });
      }
    });
  });
  return (
    <div className="page h-screen md:p-12 ">
      <ListMemo memo={memo} array={arrayTag} />
    </div>
  );
}
