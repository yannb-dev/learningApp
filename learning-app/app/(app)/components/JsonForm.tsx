"use client";
import { Prisma } from "@/lib/generated/prisma";

import { useState } from "react";
import { useRouter } from "next/navigation";

//_______________component __________________
import { ImportSeance } from "@/lib/schema/ImportSeance";

// ____________ icon __________________________
import { LuImport } from "react-icons/lu";
import { error } from "console";

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
  templateSeance: string | undefined;
};

export default function JsonForm({ roadmap, templateSeance }: Props) {
  const router = useRouter();

  if (templateSeance === undefined)
    return <p>Erreur du chargement du Template</p>;

  const [stateTuto, setStateTuto] = useState(false);
  const [state, setState] = useState("generate");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [file, setFile] = useState<ImportSeance | null>(null);
  const [errorImportSeance, setErrorImportSeance] = useState(false);
  const [errorFetch, setErrorFetch] = useState(false);

  // ____________________________________
  //
  const handleGenered = () => {
    const file = JSON.stringify(roadmap);

    const template = templateSeance.replace("{{roadmapJson}}", file);

    const dataUrl = `data:text/markdown;charset=utf-8,${encodeURIComponent(template)}`;
    setDownloadUrl(dataUrl);
    setState("idle");

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

      if (!fileCheck.success) {
        console.error("Erreur de contrôle du fichier");
        setErrorImportSeance(true);
      } else {
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
          setState("generate");
          router.refresh();
        } else {
          console.error("Erreur d'enregistrement en BDD");
        }
      }
    } catch (err) {
      setErrorFetch(true);
      setTimeout(() => setErrorFetch(false), 3000);
    }
  };

  //______________________________________
  //

  //______________________________________
  //

  return (
    <div className="flex flex-col">
      <div>
        {state === "generate" && (
          <div>
            <LuImport
              onClick={handleGenered}
              className="p-1 rounded-sm bg-red-400 text-white text-2xl ml-6 hover:cursor-pointer hover:scale-105"
            />
          </div>
        )}
        {state === "idle" && (
          <div className="flex flex-col items-center">
            <div className="flex ml-6">
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
            {errorFetch && <p>Oups, une erreur c'est produite !</p>}
            {errorImportSeance && (
              <div className="flex flex-col">
                <p>Le fichier d'import n'est pas conforme ! </p>
                <button
                  onClick={() => setErrorImportSeance(false)}
                  className="p rounded-sm bg-amber-600"
                >
                  Choisir un autre document
                </button>
              </div>
            )}
            <div>
              <button
                className="font-bold mt-4 ml-6 hover:cursor-pointer"
                onClick={() => setStateTuto(!stateTuto)}
              >
                Comment procéder ?
              </button>
              {stateTuto && (
                <div>
                  <p>
                    Après avoir télécharger un fichier{" "}
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
