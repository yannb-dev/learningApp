"use client";

import { ProjectDataWithId } from "@/lib/schema/FormNewProject";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  projectList: ProjectDataWithId[];
};

export default function SelectProject({ projectList }: Props) {
  const router = useRouter();

  const handleSelect = (id: string) => {
    router.push(`/accueil?project=${id}`);
  };

  return (
    <div>
      {projectList && (
        <select
          className="w-80 bg-gray-100 border-1 border-gray-300 rounded-sm p-2 font-mono "
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="">-- Quel projet afficher ? --</option>
          {projectList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
