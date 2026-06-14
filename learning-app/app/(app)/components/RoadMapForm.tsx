"use client";

import { useState } from "react";

import { RoadmapSchema, RoadmapFull } from "@/lib/schema/ImportRoadMap";
import { ModuleSchema } from "@/lib/schema/ImportModule";
import { ObjectiveSchema } from "@/lib/schema/ImportObjective";
import { CriteriaSchema } from "@/lib/schema/ImportCriteria";

export default function RoadMapForm({
  idProject,
}: {
  idProject: string | string[] | undefined;
}) {
  const [file, setFile] = useState<RoadmapFull | null>(null);

  // _____________ Upload du fichier chargé coté client _________
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const text = await file.text();
    const roadmap = JSON.parse(text);

    setFile(roadmap);
  };

  // _____________ Extrait les valeurs puis les fetch _________
  const handleFilterRoadMap = async () => {
    if (!file) return;

    const roadmapFormat = {
      name: file.name,
      objective: file.objective,
      echeance: file.echeance,
      constraint: file.constraint,
      duration: file.duration,
      dispo: file.dispo,
    };

    const module = file.listModule;
    const objective = file.listCompetence;
    const criteria = file.listCritereValidation;

    const resultRoadmap = RoadmapSchema.safeParse(roadmapFormat);
    const resultModule = ModuleSchema.safeParse(module);
    const resultObjective = ObjectiveSchema.safeParse(objective);
    const resultCriteria = CriteriaSchema.safeParse(criteria);

    // fetch global pour le roadMap, module, objective, criteria après zod
    if (
      !resultRoadmap.success ||
      !resultModule.success ||
      !resultObjective.success ||
      !resultCriteria.success
    ) {
      console.error("1", resultRoadmap.error);
      console.error("2", resultModule.error);
      console.error("3", resultObjective.error);
      console.error("4", resultCriteria.error);
    } else {
      const global = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roadmap: resultRoadmap,
          listModule: resultModule,
          listeCompetence: resultObjective,
          listCritereValidation: resultCriteria,
          projectId: idProject,
        }),
      });
      const globalSave = await global.json();

      console.log(globalSave);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="font-mono font-bold mb-8">
        Ajoutes ton fichier markdown pour incrémenter ton projet :
      </h3>
      <input
        className="w-100 p-1 pl-4 bg-gray-100 rounded-xl"
        type="file"
        accept=".json"
        onChange={handleUploadFile}
      />
      {file && (
        <button
          className="ml-10 p-1 bg-red-500 rounded-sm mt-6"
          onClick={handleFilterRoadMap}
        >
          Créer ta roadMap
        </button>
      )}
    </div>
  );
}
