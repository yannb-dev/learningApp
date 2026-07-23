"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

//___________ import schema ZOD ____________________
import { MarkdownSchema } from "@/lib/schema/Markdown";
import { MarkdownData } from "@/lib/schema/Markdown";

//_________________ component ______________________
import TextCopy from "./TextCopy";
import Card from "./ui/Card";

//____________ style _________________________________
const styleInput =
  "w-full p-1 pl-4 bg-gray-300 text-black rounded-sm outline-none focus:ring-gray-300 focus:ring-1 mb-4 mt-2";

//____________ interface ____________________________
interface MarkdownFormProps {
  file: string | undefined;
}

export default function MarkdownForm({ file }: MarkdownFormProps) {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [viewForm, setViewForm] = useState(true);

  if (file === undefined) return <p>Erreur</p>;

  const safeFile = file;

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
      const markdown = safeFile
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
    setViewForm(false);
    reset();
  };

  return (
    <div className="w-full p-4">
      {viewForm && (
        <Card
          className="h-auto p-6"
          children={
            <section>
              <h1 className="text-xl mb-4">Créer ma RoadMap :</h1>
              <form
                className="flex flex-col md:flex-row justify-evenly"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="w-[45%] flex flex-col justify-evenly items-start">
                  <label htmlFor="objective">Mon objectif :</label>
                  <input
                    className={styleInput}
                    id="objective"
                    {...register("objective")}
                    autoComplete="off"
                  />
                  {errors.objective && (
                    <p className="text-red-500 text-xs">
                      {errors.objective.message}
                    </p>
                  )}
                  <label htmlFor="competence">
                    Mes compétences, mes savoir faires :
                  </label>
                  <input
                    className={styleInput}
                    id="competence"
                    {...register("competence")}
                    autoComplete="off"
                  />
                  {errors.competence && (
                    <p className="text-red-500 text-xs">
                      {errors.competence.message}
                    </p>
                  )}
                  <label htmlFor="dispo">
                    Ma disponibilité par jour en heure :
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    className={styleInput}
                    id="dispo"
                    {...register("dispo", {
                      onChange: (e) => {
                        const filtré = e.target.value.replace(/\D/g, ""); // enlève tout sauf les chiffres
                        e.target.value = filtré;
                      },
                    })}
                    autoComplete="off"
                  />
                  {errors.dispo && (
                    <p className="text-red-500 text-xs">
                      {errors.dispo.message}
                    </p>
                  )}
                  <label htmlFor="learningMode">
                    Quel est ton mode d&apos;apprentissage préféré :
                  </label>
                  <input
                    className={styleInput}
                    id="learningMode"
                    {...register("learningMode")}
                    autoComplete="off"
                  />
                  {errors.learningMode && (
                    <p className="text-red-500 text-xs">
                      {errors.learningMode.message}
                    </p>
                  )}
                  <label htmlFor="formation">
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
                  {errors.formation && (
                    <p className="text-red-500 text-xs">
                      {errors.formation.message}
                    </p>
                  )}
                </div>
                <div className="w-[45%] flex flex-col justify-evenly items-start">
                  <label htmlFor="pointBad">
                    Quels sont tes points bloquants ?
                  </label>
                  <input
                    className={styleInput}
                    id="pointBad"
                    {...register("pointBad")}
                    autoComplete="off"
                  />
                  {errors.pointBad && (
                    <p className="text-red-500 text-xs">
                      {errors.pointBad.message}
                    </p>
                  )}
                  <label htmlFor="whyLearn">
                    Pourquoi veux tu apprendre ça :
                  </label>
                  <input
                    className={styleInput}
                    id="whyLearn"
                    {...register("whyLearn")}
                    autoComplete="off"
                  />
                  {errors.whyLearn && (
                    <p className="text-red-500 text-xs">
                      {errors.whyLearn.message}
                    </p>
                  )}
                  <label htmlFor="echeance">
                    As tu une échéance à respecter :
                  </label>
                  <input
                    className={styleInput}
                    type="date"
                    id="echeance"
                    {...register("echeance")}
                  />
                  {errors.echeance && (
                    <p className="text-red-500 text-xs">
                      {errors.echeance.message}
                    </p>
                  )}
                  <label htmlFor="motivation">
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
                  {errors.motivation && (
                    <p className="text-red-500 text-xs">
                      {errors.motivation.message}
                    </p>
                  )}
                  <button
                    className="w-30 p-1 rounded-sm bg-amber-600 font-bold mt-4"
                    type="submit"
                  >
                    Générer
                  </button>
                </div>
              </form>
            </section>
          }
        />
      )}
      {downloadUrl && (
        <div className="mt-10">
          <h1 className="text-xl text-amber-600 font-bold mb-12">Etape 1 :</h1>
          <h1 className="text-lg font-bold mb-4">Consigne :</h1>
          <p
            className="
          mt-8 mb-8"
          >
            Après avoir télécharger le document insère le document dans le LLM
            de ton choix et copie/colle le text ci-dessous
          </p>
          <a
            href={downloadUrl}
            download={"mon-fichier.md"}
            className="p-2 bg-amber-600 font-bold rounded-sm"
          >
            Télécharger le fichier.md
          </a>
          <div className="w-[70%] flex flex-col p-6 rounded-xl bg-aside text-justify mt-8">
            <div className="w-full flex justify-between">
              <h3 className="font-bold mb-4">
                Copie ce bloc comme prompt au LLM de ton choix.
              </h3>
              <TextCopy />
            </div>

            <p>
              Tu es un expert en pédagogie. À partir des informations du fichier
              importé, génère une roadmap d'apprentissage personnalisée dans un
              fichier roadmap.json. Contraintes : - Adapte le rythme à ma
              disponibilité hebdomadaire - Commence par consolider les bases
              avant d&apos;introduire de nouveaux concepts - Chaque étape doit
              déboucher sur quelque chose de concret et fonctionnel - Indique
              clairement les prérequis de chaque module - - Si je n&apos;ai pas
              de stack cible définie, propose-en une cohérente avec mon objectif
              - Utilise strictement le format définie dans la section ##### 8.
              N&apos;ajoutes rien d'autre. Format de roadmap souhaité dans un
              fichier roadmap.json
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
