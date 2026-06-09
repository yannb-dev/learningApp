import fs from "fs";
import path from "path";

import MarkdownForm from "../components/MarkdownForm";
import BtnBack from "../components/BtnBack";

export default async function GestionPage() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "template",
    "markdownRoadMap.md",
  );
  const template = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="p-6">
      <BtnBack />
      <MarkdownForm file={template} />
    </div>
  );
}

// __________ Pour déclencher le téléchargement ________
// Étape 3 : déclencher le téléchargement
//   const blob = new Blob([markdown], { type: "text/markdown" });
//   const url = URL.createObjectURL(blob);

//   const lien = document.createElement("a");
//   lien.href = url;
//   lien.download = "mon-fichier.md";
//   lien.click();

//   URL.revokeObjectURL(url); // nettoyage
// };
