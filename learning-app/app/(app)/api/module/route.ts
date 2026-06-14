import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { ModuleSchema } from "@/lib/schema/ImportModule";

import { authOptions } from "@/lib/auth";

//______________________POST ___________

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const result = ModuleSchema.safeParse(body);

    if (!result.success) {
      return Response.json({ error: result.error.flatten() }, { status: 400 });
    }

    const module = await prisma.module.create({
      data: {
        ...result.data,

        userId: session.user.id,
      },
    });

    return Response.json({ success: true, data: module });
  } catch (err) {
    return Response.json({ error: "Erreur serveur du POST" }, { status: 500 });
  }
}
