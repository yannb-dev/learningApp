"use client";

import { useRouter } from "next/navigation";

//___________ import Icon ___________________________
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteRoadmap({ roadmapId }: { roadmapId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/roadmap/${roadmapId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
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
    <div className="w-20 flex justify-center mb-6 mt-6">
      <FaTrashAlt className="hover:scale-110" onClick={handleDelete} />
    </div>
  );
}
