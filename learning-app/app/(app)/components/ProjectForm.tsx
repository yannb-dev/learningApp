"use client";

import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

// _____________ import schema ZOD ___________________
import { ProjectData } from "@/lib/schema/FormNewProject";
import { ProjectSchema } from "@/lib/schema/FormNewProject";

export default function ProjectForm() {
  const router = useRouter();

  const {
    register,

    handleSubmit,

    formState: { errors },

    reset,
  } = useForm({
    resolver: zodResolver(ProjectSchema),

    defaultValues: { category: "tech" },
  });

  const onSubmit = async (data: ProjectData) => {
    const response = await fetch("/api/project", {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(data),
    });

    if (response.ok) {
      reset();
      router.refresh();
      redirect("/accueil");
    }
  };

  return (
    <div className="pt-20 pl-20">
      <h1 className="text-2xl font-mono font-bold">
        Création d'un nouveau project :
      </h1>
      <form className="flex flex-col pt-8" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="w-60 border-b-1 border-gray-200 mb-4 outline-none focus:ring-gray-300 focus:ring-1"
          {...register("name")}
          placeholder="Nom du projet"
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          className="w-120 border-b-1 border-gray-200 mb-4 outline-none focus:ring-gray-300 focus:ring-1"
          {...register("description")}
          placeholder="Décris ton projet en deux mots"
        />
        {errors.description && <p>{errors.description.message}</p>}
        <select
          className="w-40 border-1 border-gray-200 rounded-sm p-2 mb-8"
          {...register("category")}
        >
          <option value="tech">Technologie</option>
          <option value="school">Scolaire</option>
          <option value="other">Autre</option>
        </select>
        <button
          className="w-30 pl-2 pt-1 pr-2 pb-1 rounded-xl border-1 border-gray-300 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
          type="submit"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
