"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

// _____________ import schema ZOD ___________________
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

  const onSubmit = async (data: ProjectSchema) => {
    const response = await fetch("/api/project", {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(data),
    });

    if (response.ok) {
      reset();
      router.push("/accueil");
      router.refresh();
    }
  };

  return (
    <div className="pt-20 pl-20">
      <h1 className="text-2xl font-bold">
        Création d&apos;un nouveau project :
      </h1>
      <form className="flex flex-col pt-8" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="w-60 border-b border-gray-200 mb-4 outline-none focus:ring-gray-300 focus:ring-1"
          {...register("name")}
          placeholder="Nom du projet"
          autoComplete="off"
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          className="w-120 border-b border-gray-200 mb-4 outline-none focus:ring-gray-300 focus:ring-1"
          {...register("description")}
          placeholder="Décris ton projet en deux mots"
          autoComplete="off"
        />
        {errors.description && <p>{errors.description.message}</p>}
        <select
          className="w-40 border border-gray-200 rounded-sm p-2 mb-8"
          {...register("category")}
        >
          <option value="tech">Technologie</option>
          <option value="school">Scolaire</option>
          <option value="other">Autre</option>
        </select>
        <button
          className="w-30 pl-2 pt-1 pr-2 pb-1 rounded-md bg-gray-200 text-black hover:bg-amber-600 hover:text-white hover:cursor-pointer"
          type="submit"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
