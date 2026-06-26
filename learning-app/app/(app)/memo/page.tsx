import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

import BtnBack from "../components/BtnBack";
import ListMemo from "../components/ListMemo";

export default async function MemoPage({ searchParams }) {
  const session = getServerSession(authOptions);

  if (!session) redirect("/login");

  const { idProject } = await searchParams;

  const memo = await prisma.memo.findMany({
    where: { projectId: idProject },
    include: {
      tags: true,
    },
  });

  const arrayTag = [];

  memo.map((memo) => {
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
