"use client";

import { redirect } from "next/navigation";

export default function BtnDirectNewRoadmap({ idProject }) {
  return (
    <div>
      <button
        className="p-1 bg-gray-400 rounded-sm"
        onClick={() => redirect(`/gestion?project=${idProject}`)}
      >
        Gestion
      </button>
    </div>
  );
}
