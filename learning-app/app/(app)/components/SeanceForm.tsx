"use client";

import { useState } from "react";

export default function SeanceForm() {
  const [file, setFile] = useState();

  const handleUploadFile = () => {
    console.log(file);
  };

  return (
    <div>
      <input
        type="file"
        accept=".md"
        onChange={(e) => setFile(e.target.files)}
      />
      <button
        className="p-1 rounded-sm bg-green-500"
        onClick={handleUploadFile}
      >
        Charger la session
      </button>
    </div>
  );
}
