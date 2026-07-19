"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBtn({ idProject }: { idProject: string }) {
  const router = useRouter();

  const titleBtnApp = [
    { name: "Vue d'ensemble", slug: "accueil" },
    { name: "Roadmap", slug: "roadmap" },
    { name: "Memo", slug: "memo" },
    { name: "Gestion", slug: "gestion" },
  ];

  const titleBtnCompte = [{ name: "Profil", slug: "profil" }];

  const [stateBtn, setStateBtn] = useState("");

  const handleNavigation = (page: string) => {
    setStateBtn(page);
    router.push(`/${page}?project=${idProject}`);
  };

  useEffect(() => {
    setStateBtn("accueil");
  }, [idProject]);

  return (
    <div className="w-full flex flex-col items-start mb-2 p-2">
      <div>
        <h3 className="text-gray-400 text-sm md:text-lg ml-6 mt-6 mb-2 ">
          Application
        </h3>
        {titleBtnApp.map((btn) => (
          <div className="w-full h-10 flex group " key={btn.name}>
            <div className="w-1 rounded-2xl group-hover:bg-amber-600 group-hover:animate-expand"></div>
            <button
              className={`w-full text-start rounded-sm text-xs md:text-sm p-1  ${stateBtn === btn.slug ? "bg-gray-300 text-black" : "text-white"}`}
              onClick={() => handleNavigation(btn.slug)}
            >
              {btn.name}
            </button>
          </div>
        ))}
        <h3 className="text-gray-400 text-sm md:text-lg ml-6 mb-2 mt-4">
          Compte
        </h3>
        {titleBtnCompte.map((btn) => (
          <div className="w-full h-12 flex group " key={btn.name}>
            <div className="w-1 rounded-2xl group-hover:bg-amber-600 group-hover:animate-expand"></div>
            <button
              className={`w-full text-start rounded-sm text-xs md:text-sm mb-2 p-1 ${stateBtn === btn.slug ? "bg-gray-300" : "text-white"}`}
              onClick={() => handleNavigation(btn.slug)}
            >
              {btn.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
