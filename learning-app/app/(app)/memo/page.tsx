import prisma from "@/lib/prisma";

import { Prisma } from "@/app/generated/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

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

  const memo = await prisma.memo.findMany({
    where: { projectId: project, userId: session.user.id },
    include: {
      tags: true,
    },
  });

  console.log("Id du projet", project);

  console.log("Memo chargé", memo);

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
    <div className="w-[83%] h-screen p-6 ">
      <ListMemo memo={memo} array={arrayTag} />
    </div>
  );
}
