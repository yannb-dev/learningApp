import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

//___________________ DELETE ____________

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session)
    return Response.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;

  try {
    await prisma.roadmap.delete({
      where: { id: id, userId: session.user.id },
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Erreur DELETE roadmap", err);
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return Response.json({ error: "Non trouvé" }, { status: 404 });
    }
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
