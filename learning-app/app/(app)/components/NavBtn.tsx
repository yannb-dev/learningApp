"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//______________ Icon _______________________
import { FaEye } from "react-icons/fa";
import { FaRoad } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";
import { FaTools } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

export default function NavBtn({
  idProject,
}: {
  idProject: string | undefined;
}) {
  const router = useRouter();

  const titleBtnApp = [
    { name: "Vue d'ensemble", slug: "accueil", Icon: FaEye },
    { name: "Roadmap", slug: "roadmap", Icon: FaRoad },
    { name: "Memo", slug: "memo", Icon: CiMemoPad },
    { name: "Gestion", slug: "gestion", Icon: FaTools },
  ];

  const titleBtnCompte = [{ name: "Profil", slug: "profil", Icon: FaUser }];

  const [stateBtn, setStateBtn] = useState("");

  const handleNavigation = (page: string) => {
    setStateBtn(page);
    router.push(`/${page}?project=${idProject}`);
  };

  useEffect(() => {
    setStateBtn("accueil");
    router.push(`/accueil/project=${idProject}`);
  }, [idProject]);

  return (
    <div className="w-full flex flex-col items-start mb-2 p-2">
      <div className="w-full flex justify-evenly md:flex-col md:justify-start">
        <h3 className="hidden md:flex text-gray-400 text-sm md:text-lg ml-6 mt-6 mb-2 ">
          Application
        </h3>
        {titleBtnApp.map((btn) => (
          <div key={btn.name}>
            <div className="hidden md:flex w-full h-10 group ">
              <div className="w-1 rounded-2xl group-hover:bg-amber-600 group-hover:animate-expand"></div>
              <button
                className={`w-full text-start rounded-sm text-xs md:text-sm p-1  ${stateBtn === btn.slug ? "bg-gray-300 text-black" : "text-white"}`}
                onClick={() => handleNavigation(btn.slug)}
              >
                {btn.name}
              </button>
            </div>
            {
              <btn.Icon
                className="text-3xl md:hidden hover:text-amber-600"
                onClick={() => handleNavigation(btn.slug)}
              />
            }
          </div>
        ))}
        <h3 className="hidden md:flex text-gray-400 text-sm md:text-lg ml-6 mb-2 mt-4">
          Compte
        </h3>
        {titleBtnCompte.map((btn) => (
          <div key={btn.name}>
            <div className="hidden md:flex w-full h-12 group ">
              <div className="w-1 rounded-2xl group-hover:bg-amber-600 group-hover:animate-expand"></div>
              <button
                className={`w-full text-start rounded-sm text-xs md:text-sm mb-2 p-1 ${stateBtn === btn.slug ? "bg-gray-300 text-black" : "text-white"}`}
                onClick={() => handleNavigation(btn.slug)}
              >
                {btn.name}
              </button>
            </div>
            {
              <btn.Icon
                className="text-3xl md:hidden hover:text-amber-600"
                onClick={() => handleNavigation(btn.slug)}
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
}
