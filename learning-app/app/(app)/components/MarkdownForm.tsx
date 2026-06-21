"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

//___________ import schema ZOD ____________________
import { MarkdownSchema } from "@/lib/schema/Markdown";
import { MarkdownData } from "@/lib/schema/Markdown";

//____________ style _________________________________
const styleInput =
  "w-full p-1 pl-4 bg-gray-100 rounded-xl outline-none focus:ring-gray-300 focus:ring-1 mb-4 mt-2";

//____________ interface ____________________________
interface MarkdownFormProps {
  file: string;
}

export default function MarkdownForm({ file }: MarkdownFormProps) {
  const [downloadUrl, setDownloadUrl] = useState("");

  const {
    register,

    handleSubmit,

    formState: { errors },

    reset,
  } = useForm({
    defaultValues: { motivation: "1", formation: "yes" },
    resolver: zodResolver(MarkdownSchema),
  });

  const onSubmit = (data: MarkdownData) => {
    function generer(data: MarkdownData) {
      const markdown = file
        .replace("{{objective}}", data.objective)
        .replace("{{competence}}", data.competence)
        .replace("{{dispo}}", data.dispo)
        .replace("{{learningMode}}", data.learningMode)
        .replace("{{formation}}", data.formation)
        .replace("{{pointBad}}", data.pointBad)
        .replace("{{whyLearn}}", data.whyLearn)
        .replace("{{echeance}}", data.echeance)
        .replace("{{motivation}}", data.motivation);

      const dataUrl = `data:text/markdown;charset=utf-8,${encodeURIComponent(markdown)}`;
      setDownloadUrl(dataUrl);
    }

    generer(data);

    reset();
  };

  return (
    <div>
      <section className="w-[90%] h-130 flex flex-col p-6 border-4 border-dashed border-gray-300 rounded-xl ">
        <h1 className="text-xl font-mono font-bold mb-4">Créer ma RoadMap :</h1>
        <form className="flex justify-evenly" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[45%] flex flex-col justify-evenly items-start">
            <label htmlFor="objective" className="font-mono">
              Mon objectif :
            </label>
            <input
              className={styleInput}
              id="objective"
              {...register("objective")}
            />
            {errors.objective && <p>{errors.objective.message}</p>}
            <label htmlFor="competence" className="font-mono">
              Mes compétences, mes savoir faires :
            </label>
            <input
              className={styleInput}
              id="competence"
              {...register("competence")}
            />
            {errors.competence && <p>{errors.competence.message}</p>}
            <label htmlFor="dispo" className="font-mono">
              Ma disponibilité hebdomadaire en heure :
            </label>
            <input className={styleInput} id="dispo" {...register("dispo")} />
            {errors.dispo && <p>{errors.dispo.message}</p>}
            <label htmlFor="learningMode" className="font-mono">
              Quel est ton mode d'apprentissage préféré :
            </label>
            <input
              className={styleInput}
              id="learningMode"
              {...register("learningMode")}
            />
            {errors.learningMode && <p>{errors.learningMode.message}</p>}
            <label htmlFor="formation" className="font-mono">
              Souhaites tu inclure des formations payantes :
            </label>
            <select
              className={styleInput}
              id="formation"
              {...register("formation")}
            >
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
            {errors.formation && <p>{errors.formation.message}</p>}
          </div>
          <div className="w-[45%] flex flex-col justify-evenly items-start">
            <label htmlFor="pointBad" className="font-mono">
              Quels sont tes points bloquants ?
            </label>
            <input
              className={styleInput}
              id="pointBad"
              {...register("pointBad")}
            />
            {errors.pointBad && <p>{errors.pointBad.message}</p>}
            <label htmlFor="whyLearn" className="font-mono">
              Pourquoi veux tu apprendre ça :
            </label>
            <input
              className={styleInput}
              id="whyLearn"
              {...register("whyLearn")}
            />
            {errors.whyLearn && <p>{errors.whyLearn.message}</p>}
            <label htmlFor="echeance" className="font-mono">
              As tu une échéance à respecter :
            </label>
            <input
              className={styleInput}
              type="date"
              id="echeance"
              {...register("echeance")}
            />
            {errors.echeance && <p>{errors.echeance.message}</p>}
            <label htmlFor="motivation" className="font-mono">
              Quel est ton degré de motivation :
            </label>
            <select
              className={styleInput}
              id="motivation"
              {...register("motivation")}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errors.motivation && <p>{errors.motivation.message}</p>}
            <button
              className="w-30 p-1 rounded-sm bg-red-500 font-mono font-bold text-white mt-4"
              type="submit"
            >
              Ajouter
            </button>
          </div>
        </form>
      </section>
      {downloadUrl && (
        <div className="mt-10">
          <h1 className="text-xl font-mono font-bold mb-4">Consigne :</h1>
          <p
            className="font-mono
          mt-8 mb-8"
          >
            Après avoir télécharger le document insère le document dans le LLM
            de ton choix et copie/colle le text ci-dessous
          </p>
          <a
            href={downloadUrl}
            download={"mon-fichier.md"}
            className="p-2 bg-red-500 text-white font-mono font-bold rounded-sm"
          >
            Télécharger le fichier.md
          </a>
          <div className="w-[70%] p-6 rounded-xl bg-gray-200 text-justify mt-8">
            <h3 className="font-bold font-mono mb-4">
              Copie ce bloc comme prompt au LLM de ton choix.
            </h3>
            <p className="font-mono">
              Tu es un expert en pédagogie. À partir des informations du fichier
              importé, génère une roadmap d'apprentissage personnalisée dans un
              fichier roadmap.json. Contraintes : - Adapte le rythme à ma
              disponibilité hebdomadaire - Commence par consolider les bases
              avant d'introduire de nouveaux concepts - Chaque étape doit
              déboucher sur quelque chose de concret et fonctionnel - Indique
              clairement les prérequis de chaque module - - Si je n'ai pas de
              stack cible définie, propose-en une cohérente avec mon objectif -
              Utilise strictement le format définie dans la section ##### 8.
              N'ajoutes rien d'autre. Format de roadmap souhaité dans un fichier
              roadmap.json
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
