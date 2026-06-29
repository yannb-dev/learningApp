"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBtn({ idProject }: { idProject: string }) {
  const router = useRouter();

  const titleBtnApp = [
    { name: "Vue d'ensemble", slug: "accueil" },
    { name: "Gestion", slug: "gestion" },
    { name: "Roadmap", slug: "roadmap" },
    { name: "Memo", slug: "memo" },
  ];

  const titleBtnCompte = [{ name: "Profil", slug: "profil" }];

  const [stateBtn, setStateBtn] = useState("");

  const handleNavigation = (page: string) => {
    setStateBtn(page);
    router.push(`/${page}?project=${idProject}`);
  };

  return (
    <div className="w-full flex flex-col items-start mb-12">
      <h3 className="text-gray-400 font-mono text-xl ml-6 mb-6">Application</h3>
      {titleBtnApp.map((btn) => (
        <div className="w-full h-12 flex group " key={btn.name}>
          <div className="w-1 rounded-2xl group-hover:bg-amber-600 group-hover:animate-expand"></div>
          <button
            className={`w-full text-start rounded-sm font-mono text-xl p-1  ${stateBtn === btn.slug ? "bg-gray-300" : "text-white"}`}
            onClick={() => handleNavigation(btn.slug)}
          >
            {btn.name}
          </button>
        </div>
      ))}
      <h3 className="text-gray-400 font-mono text-xl ml-6 mb-6 mt-16">
        Compte
      </h3>
      {titleBtnCompte.map((btn) => (
        <div className="w-full h-12 flex group " key={btn.name}>
          <div className="w-1 rounded-2xl group-hover:bg-amber-600 group-hover:animate-expand"></div>
          <button
            className={`w-full text-start rounded-sm font-mono text-xl mb-2 p-1 ${stateBtn === btn.slug ? "bg-gray-300" : "text-white"}`}
            onClick={() => handleNavigation(btn.slug)}
          >
            {btn.name}
          </button>
        </div>
      ))}
    </div>
  );
}
