"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBtn({ idProject }: { idProject: string }) {
  const router = useRouter();

  const [stateBtn, setStateBtn] = useState("");

  const handleNavigation = (page: string) => {
    setStateBtn(page);
    router.push(`/${page}?project=${idProject}`);
  };

  return (
    <div className="w-full flex flex-col items-start mb-12">
      <h3 className="text-gray-400 font-mono text-xl ml-6 mb-6">Application</h3>
      <button
        className={`w-full text-start rounded-sm font-mono text-xl mb-2 p-2 hover:bg-gray-200 hover:text-black ${stateBtn === "accueil" ? "bg-gray-200" : ""}`}
        onClick={() => handleNavigation("accueil")}
      >
        Vue d'ensemble
      </button>
      <button
        className={`w-full text-start rounded-sm font-mono text-xl mb-2 p-2 hover:bg-gray-200 hover:text-black ${stateBtn === "gestion" ? "bg-gray-200" : ""}`}
        onClick={() => handleNavigation("gestion")}
      >
        Gestion
      </button>
      <button
        className={`w-full text-start rounded-sm font-mono text-xl mb-2 p-2 hover:bg-gray-200 hover:text-black ${stateBtn === "roadmap" ? "bg-gray-200" : ""}`}
        onClick={() => handleNavigation("roadmap")}
      >
        Roadmap
      </button>
      <button
        className={`w-full text-start rounded-sm font-mono text-xl mb-2 p-2 hover:bg-gray-200 hover:text-black ${stateBtn === "memo" ? "bg-gray-200" : ""}`}
        onClick={() => handleNavigation("memo")}
      >
        Memo
      </button>
      <h3 className="text-gray-400 font-mono text-xl ml-6 mb-6">Compte</h3>
      <button
        className={`w-full text-start rounded-sm font-mono text-xl mb-2 p-2 hover:bg-gray-200 hover:text-black ${stateBtn === "profil" ? "bg-gray-200" : ""}`}
        onClick={() => handleNavigation("profil")}
      >
        Profil
      </button>
    </div>
  );
}
