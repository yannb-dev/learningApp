import prisma from "@/lib/prisma";

import { Prisma } from "@prisma/client";

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

  if (!project || Array.isArray(project)) redirect("/");

  const projectUpdate = await prisma.project.findUnique({
    where: {
      id: project,
      userId: session.user.id,
    },
    select: {
      id: true,
      memos: {
        include: {
          tags: {
            orderBy: {
              slug: "asc",
            },
          },
        },
      },
    },
  });

  if (!projectUpdate)
    return (
      <div className="h-scren w-full flex justify-center items-center font-bold text-xl">
        <h1>
          Oups ! Impossible de charger ton projet. Sélectionne le dans
          l&apos;onglet &quot;Mon Projet&quot;
        </h1>
      </div>
    );

  const arrayTag: { slug: string }[] = [];

  projectUpdate.memos.forEach((memo: Memo) => {
    memo.tags.forEach((tag) => {
      const includeArray = arrayTag.some((a) => a.slug === tag.slug);

      if (!includeArray) {
        arrayTag.push({ slug: tag.slug });
      }
    });
  });
  return (
    <div className="page h-screen md:p-12 ">
      <ListMemo memo={projectUpdate.memos} array={arrayTag} />
    </div>
  );
}
