import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { ProjectSchema } from "@/lib/schema/FormNewProject";

import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

//______________________POST ___________

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const result = ProjectSchema.safeParse(body);

    if (!result.success) {
      return Response.json({ error: result.error.issues }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        ...result.data,

        userId: session.user.id,
      },
    });

    revalidatePath("/accueil");

    return Response.json({ success: true, data: project });
  } catch (err) {
    console.error("Erreur POST project", err);
    return Response.json(
      { message: "Erreur serveur du POST project" },
      { status: 500 },
    );
  }
}
