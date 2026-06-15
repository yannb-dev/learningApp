"use client";

import { useState } from "react";

export default function SeanceForm() {
  const [file, setFile] = useState();
  const [stateTuto, setStateTuto] = useState(false);

  const handleUploadFile = () => {
    console.log(file);
    setStateTuto(false);
  };

  const handleStateTuto = () => {
    setStateTuto(true);
  };

  return (
    <div className="flex flex-col">
      <div>
        <input
          className="bg-gray-100 rounded-sm p-2 hover:cursor-pointer"
          type="file"
          accept=".md"
          onChange={(e) => setFile(e.target.files)}
        />
        <button
          className="p-2 rounded-sm bg-green-500 ml-6 hover:scale-105 hover:cursor-pointer"
          onClick={handleUploadFile}
        >
          Charger la session
        </button>
      </div>
      <div>
        <button
          className="font-bold mt-4 hover:cursor-pointer"
          onClick={handleStateTuto}
        >
          Tutoriel
        </button>
        {stateTuto && (
          <div>
            <p>Utilise un fichier .json pour importer ta session</p>
          </div>
        )}
      </div>
    </div>
  );
}
