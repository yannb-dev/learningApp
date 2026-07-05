"use client";

import { redirect, useRouter } from "next/navigation";

//___________ import Icon ___________________________
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteProject({ projectId }: { projectId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/project/${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
        redirect("/newproject");
      }

      return Response.json({ success: true, data: response });
    } catch (err) {
      return Response.json(
        { error: "Erreur du fetch Detele" },
        { status: 500 },
      );
    }
  };

  return (
    <div className="w-full flex justify-start mb-6 mt-6">
      <FaTrashAlt
        className="text-xl text-gray-300 hover:scale-110"
        onClick={handleDelete}
      />
    </div>
  );
}
