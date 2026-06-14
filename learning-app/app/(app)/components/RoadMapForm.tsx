"use client";

import { useState } from "react";

import { Importroadmap } from "@/lib/schema/ImportRoadMap";

export default function RoadMapForm({
  idProject,
}: {
  idProject: string | string[] | undefined;
}) {
  const [file, setFile] = useState<Importroadmap | null>(null);

  // _____________ Upload du fichier chargé coté client _________
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    if (!file) {
      return console.log("Fichier d'import absent");
    } else {
      const text = await file.text();
      const roadmap = JSON.parse(text);

      setFile(roadmap);
    }
  };

  console.log(file);

  // _____________ Extrait les valeurs puis les fetch _________
  const handleCreateRoadMap = async () => {
    if (!file) return;

    const resultRoadmap = await Importroadmap.safeParse(file);

    if (!resultRoadmap.success) {
      console.error("1", resultRoadmap.error);
    } else {
      console.log(resultRoadmap, idProject);

      const global = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roadmap: resultRoadmap.data,
          projectId: idProject,
        }),
      });
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
          onClick={handleCreateRoadMap}
        >
          Créer ta roadMap
        </button>
      )}
    </div>
  );
}
