"use client";

import { useState } from "react";
import { MdContentCopy } from "react-icons/md";

const text = `Tu es un expert en pédagogie. À partir des informations du fichier
              importé, génère une roadmap d'apprentissage personnalisée dans un
              fichier roadmap.json. Contraintes : - Adapte le rythme à ma
              disponibilité hebdomadaire - Commence par consolider les bases
              avant d'introduire de nouveaux concepts - Chaque étape doit
              déboucher sur quelque chose de concret et fonctionnel - Indique
              clairement les prérequis de chaque module - - Si je n'ai pas de
              stack cible définie, propose-en une cohérente avec mon objectif -
              Utilise strictement le format définie dans la section ##### 8.
              N'ajoutes rien d'autre. Format de roadmap souhaité dans un fichier
              roadmap.json`;

export default function TextCopy() {
  const [info, setInfo] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setInfo(true);
    setTimeout(() => setInfo(false), 2000);
  };

  return (
    <div>
      <button onClick={handleCopy}>
        <MdContentCopy />
        {info && <p>Copié</p>}
      </button>
    </div>
  );
}
