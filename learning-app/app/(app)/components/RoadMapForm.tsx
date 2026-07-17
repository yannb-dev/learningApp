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
  const [errorImportRoadmap, setErrorImportRoadmap] = useState(false);
  const [errorFetch, setErrorFetch] = useState(false);

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
        setErrorImportRoadmap(true);
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
      setErrorFetch(true);
      setTimeout(() => setErrorFetch(false), 3000);

      return Response.json({ error: "Erreur server", err }, { status: 500 });
    }
  };

  return (
    <div className="mt-10 text-gray-300">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-12">Etape 2 :</h1>
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
      {errorFetch && <p>Oups une erreur c'est produite !</p>}
      {errorImportRoadmap && (
        <div className="flex flex-col">
          <p>Le fichier d'import n'est pas conforme ! </p>
          <button
            onClick={() => setErrorImportRoadmap(false)}
            className="p rounded-sm bg-amber-600"
          >
            Choisir un autre document
          </button>
        </div>
      )}
    </div>
  );
}
