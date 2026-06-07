"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { ProjectData } from "@/lib/schema/FormNewProject";
import { ProjectSchema } from "@/lib/schema/FormNewProject";
import { useRouter } from "next/navigation";

export default function ProjectForm() {
  const router = useRouter();

  const {
    register,

    handleSubmit,

    formState: { errors },

    reset,
  } = useForm({
    resolver: zodResolver(ProjectSchema),

    defaultValues: { category: "tech" }, // valeur initiale de l'enum
  });

  const onSubmit = async (data: ProjectData) => {
    // data est déjà validé par Zod — pas besoin de safeParse ici

    const response = await fetch("/api/project", {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(data),
    });

    if (response.ok) {
      reset();
      router.refresh();
      router.push("/accueil");
    }
  };

  return (
    <form className="flex flex-col pt-20" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Nom du projet" />
      {errors.name && <p>{errors.name.message}</p>} {/* ← message inline */}
      <input {...register("description")} placeholder="Décris ton projet" />
      {errors.description && <p>{errors.description.message}</p>}
      <select {...register("category")}>
        <option value="tech">Technologie</option>
        <option value="school">Scolaire</option>
      </select>
      <button
        className="w-30 pl-4 pt-2 pr-4 pb-2 rounded-xl border-1 border-gray-300 bg-gray-100 hover:bg-gray-200"
        type="submit"
      >
        Ajouter
      </button>
    </form>
  );
}
