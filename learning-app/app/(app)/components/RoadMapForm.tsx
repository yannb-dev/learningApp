"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

//__________________ icon ______________________________
import { AiOutlineLoading } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

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
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const resultRoadmap = await Importroadmap.safeParse(file);

      if (!resultRoadmap.success) {
        console.error("Contrôle ZOD refusé", resultRoadmap.error);
        setErrorImportRoadmap(true);
      } else {
        try {
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
        } finally {
          setLoading(false);
        }
      }
    } catch (err) {
      console.error("Erreur POST Roadmap", err);
      setErrorFetch(true);
      setTimeout(() => setErrorFetch(false), 3000);
    }
  };

  return (
    <div className="mt-10 ">
      <div className="flex flex-col">
        <h1 className="text-xl text-amber-600 font-bold mb-12">Etape 2 :</h1>
        <h3 className="font-bold mb-8">
          Ajoutes ton fichier markdown pour incrémenter ton projet :
        </h3>
        {!file ? (
          <input
            className="w-100 p-1 pl-4 bg-gray-300 text-black rounded-sm"
            type="file"
            accept=".json"
            onChange={handleUploadFile}
          />
        ) : (
          <div className="flex flex-col">
            <div className="flex">
              <p>Fichier chargé !</p>
              <FaTrash
                className="text-xl text-red-500 ml-6"
                onClick={() => setFile(null)}
              />
              {loading && (
                <div>
                  <AiOutlineLoading className="animate-spin text-3xl text-amber-600 ml-10" />
                </div>
              )}
            </div>

            <button
              className="w-30 ml-10 p-1 bg-red-500 rounded-sm mt-6"
              onClick={handleCreateRoadMap}
            >
              Créer ta roadMap
            </button>
          </div>
        )}
      </div>

      {errorFetch && <p>Oups une erreur c&apos;est produite !</p>}
      {errorImportRoadmap && (
        <div className="flex flex-col">
          <p>Le fichier d&apos;import n&apos;est pas conforme ! </p>
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
