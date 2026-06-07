import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  console.log("Contrôle de la session depuis app", session);

  return (
    <div>
      <h1>Page.jsx de app</h1>
    </div>
  );
}
