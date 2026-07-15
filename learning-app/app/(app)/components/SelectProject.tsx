"use client";

import { useRouter } from "next/navigation";

//____________________type _____________________
import { Project } from "@/app/generated/prisma";
import { useState } from "react";

export default function SelectProject({
  projectList,
}: {
  projectList: Project[];
}) {
  const router = useRouter();
  const [projectSelect, setProjectSelect] = useState(projectList[0]);

  const handleSelect = (id: string) => {
    if (id === "new") {
      router.push("/newproject");
    } else {
      router.push(`/accueil?project=${id}`);
    }
  };

  return (
    <div className="p-2 mt-2">
      {projectList && (
        <select
          className="w-full bg-gray-100 border border-gray-300 rounded-sm p-2 font-mono text-center "
          onChange={(e) => handleSelect(e.target.value)}
          defaultValue={projectSelect.id}
        >
          <option value="">--Mon project--</option>
          {projectList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
          <option value="new">Nouveau projet...</option>
        </select>
      )}
    </div>
  );
}
