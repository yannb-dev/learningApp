import prisma from "@/lib/prisma";

import { z } from "zod";
import { SeanceApi } from "@/lib/schema/SeanceApi";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

import BtnBack from "../components/BtnBack";
import ListMemo from "../components/ListMemo";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Memo = z.infer<typeof SeanceApi>["seance"]["memos"][number];

export default async function MemoPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const { idProject } = await searchParams;

  const memo = await prisma.memo.findMany({
    where: { projectId: idProject, userId: session.user.id },
    include: {
      tags: true,
    },
  });

  const arrayTag: { slug: string }[] = [];

  memo.map((memo: Memo) => {
    memo.tags.map((tag) => {
      const includeArray = arrayTag.some((a) => a.slug === tag.slug);

      if (!includeArray) {
        arrayTag.push({ slug: tag.slug });
      }
    });
  });
  return (
    <div className="p-6">
      <BtnBack />
      <ListMemo memo={memo} tags={arrayTag} />
    </div>
  );
}
