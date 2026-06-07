import Image from "next/image";

import { IoLogOut } from "react-icons/io5";

import BtnLogOut from "./components/BtnLogOut";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="h-30 flex pt-8 pl-12 pr-12 pb-8 justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/wolf.png" // chemin depuis le dossier public/
            width={60} // largeur originale
            height={60} // hauteur originale
            alt="Logo Wolf" // accessibilité (obligatoire !)
            priority
            unoptimized // charge en priorité (pour les images importantes)
          />
          <h1 className="font-mono font-bold text-2xl ml-4">Learning APP</h1>
        </div>
        <BtnLogOut />
      </div>

      {children}
    </div>
  );
}
