"use client";

import { ProjectDataWithId } from "@/lib/schema/FormNewProject";
import { useRouter } from "next/navigation";

type Props = {
  projectList: ProjectDataWithId[];
};

export default function SelectProject({ projectList }: Props) {
  const router = useRouter();

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
          className="w-full bg-gray-100 border-1 border-gray-300 rounded-sm p-2 font-mono text-center "
          onChange={(e) => handleSelect(e.target.value)}
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
