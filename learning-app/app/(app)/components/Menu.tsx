"use client";

import BtnLogOut from "./BtnLogOut";
import SelectProject from "./SelectProject";
import NavBtn from "./NavBtn";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Menu({ project }) {
  const router = useRouter();

  const [selectProject, setSelectProject] = useState("");

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
      <div className="p-2">
        {selectProject && <NavBtn idProject={selectProject} />}
        <div className="h-px w-full bg-gray-600"></div>
        <h3 className="font-mono text-gray-100 mt-4">Mon projet :</h3>
        <div className="p-2 mt-2">
          {project && (
            <select
              className="w-full bg-gray-100 border-1 border-gray-300 rounded-sm p-2 font-mono text-center "
              onChange={(e) => handleSelect(e.target.value)}
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
