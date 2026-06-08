"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { MarkdownSchema } from "@/lib/schema/Markdown";
import { MarkdownData } from "@/lib/schema/Markdown";

export default function MarkdownForm() {
  const {
    register,

    handleSubmit,

    formState: { errors },

    reset,
  } = useForm({
    resolver: zodResolver(MarkdownSchema),
  });

  const onSubmit = async (data: MarkdownData) => {
    // data est déjà validé par Zod — pas besoin de safeParse ici

    console.log(data);
  };

  return (
    <div>
      <section className="w-[50%] h-95 flex flex-col p-6 border-4 border-dashed border-gray-300 rounded-xl ">
        <h1 className="text-xl font-mono font-bold mb-4">Créer ma RoadMap :</h1>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="objective" className="font-mono">
            Mon objectif :
          </label>
          <input
            className="p-1 pl-4 bg-gray-100 rounded-xl outline-none focus:ring-gray-300 focus:ring-1 mb-4 mt-2"
            id="objective"
            {...register("objective")}
          />
          {errors.objective && <p>{errors.objective.message}</p>}
          <label htmlFor="competence" className="font-mono">
            Mes compétences, mes savoir faires
          </label>
          <input
            className="p-1 pl-4 bg-gray-100 rounded-xl outline-none focus:ring-gray-300 focus:ring-1 mb-4 mt-2"
            id="competence"
            {...register("competence")}
          />
          {errors.competence && <p>{errors.competence.message}</p>}
          <label htmlFor="dispo" className="font-mono">
            Ma disponibilité hebdomadaire
          </label>
          <input
            className="p-1 pl-4 bg-gray-100 rounded-xl outline-none focus:ring-gray-300 focus:ring-1 mb-4 mt-2"
            id="dispo"
            {...register("dispo")}
          />
          {errors.dispo && <p>{errors.dispo.message}</p>}
          <button
            className="w-30 p-1 rounded-sm bg-red-500 font-mono font-bold text-white mt-4"
            type="submit"
          >
            Ajouter
          </button>
        </form>
      </section>
    </div>
  );
}
