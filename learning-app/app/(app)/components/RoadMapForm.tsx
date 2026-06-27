"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ________________ import schema ZOD ___________________
import { Importroadmap } from "@/lib/schema/ImportRoadMap";

export default function RoadMapForm({
  idProject,
}: {
  idProject: string | string[] | undefined;
}) {
  const router = useRouter();

  const [file, setFile] = useState<Importroadmap | null>(null);

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return console.log("Fichier d'import absent");
    } else {
      const text = await file.text();
      const roadmap = JSON.parse(text);

      setFile(roadmap);
    }
  };

  // _____________ Extrait les valeurs puis les fetch _________
  const handleCreateRoadMap = async () => {
    if (!file) return;

    try {
      const resultRoadmap = await Importroadmap.safeParse(file);

      if (!resultRoadmap.success) {
        console.error("Contrôle ZOD refusé", resultRoadmap.error);
      } else {
        const global = await fetch("/api/roadmap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roadmap: resultRoadmap.data,
            projectId: idProject,
          }),
        });

        router.refresh();

        return global;
      }

      return Response.json({ success: true, data: global });
    } catch (err) {
      return Response.json(
        { error: "Erreur du Fetch Roadmap" },
        { status: 500 },
      );
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
