"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

//__________________component ______________
import BtnLogOut from "./BtnLogOut";
import NavBtn from "./NavBtn";

//__________________type _________________
import { Project } from "@/app/generated/prisma";

import { IoMenu } from "react-icons/io5";

type Props = {
  project: Project[];
};

export default function Menu({ project }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("project");

  const [selectProject, setSelectProject] = useState(query);
  const [stateMenu, setStateMenu] = useState(false);

  const handleSelect = (id: string) => {
    if (id === "new") {
      router.push("/newproject");
    } else {
      setSelectProject(id);
      router.push(`/accueil?project=${id}`);
    }
  };

  return (
    <div>
      <IoMenu
        className="text-gray-300 ml-4 mb-4 text-center text-2xl md:hidden hover:scale-105"
        onClick={() => setStateMenu(!stateMenu)}
      />
      <div
        className={`md:flex md:flex-col ${stateMenu ? "flex flex-col" : "hidden"}`}
      >
        {selectProject && <NavBtn idProject={selectProject} />}
        <div className="h-px w-full bg-gray-600"></div>
        <h3 className="font-mono text-gray-100 text-xs md:text-sm mt-2 ml-2">
          Mon projet :
        </h3>
        <div className="p-2 mt-2">
          {project && (
            <select
              className="w-full bg-gray-100 border border-gray-300 rounded-sm p-1 text-xs md:text-sm font-mono text-center "
              onChange={(e) => handleSelect(e.target.value)}
              defaultValue={selectProject}
            >
              <option value="">--Mon project--</option>
              {project.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
              <option value="new">Nouveau projet...</option>
            </select>
          )}
        </div>
        <BtnLogOut />
      </div>
    </div>
  );
}
