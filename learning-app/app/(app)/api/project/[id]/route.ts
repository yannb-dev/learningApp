import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

//___________________ GET ______________

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session)
    return Response.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: id },
    });

    if (!project)
      return Response.json({ error: "Projet non trouvé" }, { status: 404 });

    return Response.json(project);
  } catch (err) {
    return Response.json({ error: "Erreur serveur du GET" }, { status: 500 });
  }
}

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
    await prisma.project.delete({
      where: { id: id, userId: session.user.id },
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
