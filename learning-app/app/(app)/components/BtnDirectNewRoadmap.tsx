"use client";

import { redirect } from "next/navigation";

export default function BtnDirectNewRoadmap({
  idProject,
}: {
  idProject: String;
}) {
  return (
    <div>
      <button onClick={() => redirect(`/gestion?project=${idProject}`)}>
        Gestion
      </button>
    </div>
  );
}
