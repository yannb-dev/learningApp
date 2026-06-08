import Image from "next/image";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

//import components
import BtnOpenApp from "./(app)/components/BtnOpenApp";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  console.log("Contrôle de la session depuis app", session);

  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center">
      <h1 className="text-4xl font-mono font-bold mb-18">Learning App</h1>
      <Image
        src="/wolf.png" // chemin depuis le dossier public/
        width={120} // largeur originale
        height={120} // hauteur originale
        alt="Logo Wolf" // accessibilité (obligatoire !)
        priority
        unoptimized // charge en priorité (pour les images importantes)
      />
      <h3 className="text-xl font-mono font-bold mb-18 mt-12">
        Bonjour {session.user.name}
      </h3>
      <BtnOpenApp />
    </div>
  );
}
