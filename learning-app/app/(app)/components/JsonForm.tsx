"use client";
import { Prisma } from "@/app/generated/prisma";

import { useState } from "react";
import { useRouter } from "next/navigation";

//_______________component __________________
import { ImportSeance } from "@/lib/schema/ImportSeance";

// ____________ icon __________________________
import { LuImport } from "react-icons/lu";

//_____________ type ___________________________
type RoadmapData = Prisma.RoadmapGetPayload<{
  include: {
    module: {
      include: { objectives: true };
    };
  };
}>;

type Props = {
  roadmap: RoadmapData;
  templateSeance: String;
};

export default function JsonForm({ roadmap, templateSeance }: Props) {
  const router = useRouter();

  const [stateViewImport, setStateViewImport] = useState(false);
  const [stateGeneredJson, setStateGeneredJson] = useState(true);
  const [stateTuto, setStateTuto] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [file, setFile] = useState({});

  // ____________________________________
  //
  const handleGenered = () => {
    const file = JSON.stringify(roadmap);

    const template = templateSeance.replace("{{roadmapJson}}", file);

    const dataUrl = `data:text/markdown;charset=utf-8,${encodeURIComponent(template)}`;
    setDownloadUrl(dataUrl);
    setStateGeneredJson(false);
    setStateViewImport(true);

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "context.md";
    link.click();
    link.remove();
  };

  //______________________________________
  //
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return console.log("Fichier d'import absent");
    } else {
      const text = await file.text();
      const seance = JSON.parse(text);

      setFile(seance);
    }
  };

  // ____________________________________
  //
  const handleSendFile = async () => {
    try {
      const fileCheck = ImportSeance.safeParse(file);

      if (!fileCheck.success)
        return console.log("Erreur de contrôle du fichier");

      const sendingFile = await fetch("/api/seance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seance: fileCheck.data,
          projectId: roadmap.projectId,
          roadmapId: roadmap.id,
        }),
      });

      if (sendingFile.ok) {
        setStateTuto(false);
        setStateViewImport(false);
        setStateGeneredJson(true);
        router.refresh();
      } else {
        console.log("Erreur d'enregistrement en BDD");
      }

      return Response.json({ success: true });
    } catch (err) {
      return Response.json(
        { error: "Erreur du fetch API/SEANCE" },
        { status: 500 },
      );
    }
  };

  //______________________________________
  //

  const handleStateTuto = () => {
    setStateTuto(true);
  };

  //______________________________________
  //

  return (
    <div className="flex flex-col">
      <div>
        {stateGeneredJson && (
          <div>
            <LuImport
              onClick={handleGenered}
              className="p-1 rounded-sm bg-red-400 text-white text-2xl ml-6 hover:cursor-pointer hover:scale-105"
            />
          </div>
        )}
        {stateViewImport && (
          <div className="flex items-center">
            <div className="ml-6">
              <input
                className="bg-gray-100 rounded-sm p-1 hover:cursor-pointer"
                type="file"
                accept=".json"
                onChange={handleUploadFile}
              />
              <button
                onClick={handleSendFile}
                className="p-1 rounded-sm bg-amber-600 ml-6 hover:scale-105 hover:cursor-pointer"
              >
                Charger la session
              </button>
            </div>
            <div>
              <button
                className="font-bold mt-4 ml-6 hover:cursor-pointer"
                onClick={handleStateTuto}
              >
                Comment procéder ?
              </button>
              {stateTuto && (
                <div>
                  <p>
                    Tu viens de télécharger un fichier{" "}
                    <strong>context.md</strong> ajoutes le à la fin de ta
                    session de travail dans ton LLM préféré. Il va te retourner
                    un fichier seance.json avec les mises à jour. Il te suffit
                    de l'importer et de cliquer sur{" "}
                    <strong>Charger la session</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
