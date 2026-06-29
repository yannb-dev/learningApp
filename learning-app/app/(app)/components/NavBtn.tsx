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
        <button
          key={btn.name}
          className={`w-full text-start rounded-sm font-mono text-xl mb-2 p-2 hover:bg-gray-200 hover:text-black ${stateBtn === btn.slug ? "bg-gray-200" : ""}`}
          onClick={() => handleNavigation(btn.slug)}
        >
          {btn.name}
        </button>
      ))}
      <h3 className="text-gray-400 font-mono text-xl ml-6 mb-6">Compte</h3>
      {titleBtnCompte.map((btn) => (
        <button
          key={btn.name}
          className={`w-full text-start rounded-sm font-mono text-xl mb-2 p-2 hover:bg-gray-200 hover:text-black ${stateBtn === btn.slug ? "bg-gray-200" : ""}`}
          onClick={() => handleNavigation(btn.slug)}
        >
          {btn.name}
        </button>
      ))}
    </div>
  );
}
