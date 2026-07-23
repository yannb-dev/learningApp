"use client";

import { useRouter } from "next/navigation";

//___________ import Icon ___________________________
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteSeance({ seanceId }: { seanceId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/seance/${seanceId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      }

      return Response.json({ success: true, data: response });
    } catch (err) {
      console.error("Erreur DELETE seance", err);
      return Response.json(
        { error: "Erreur du fetch Detele" },
        { status: 500 },
      );
    }
  };

  return (
    <div className="w-full flex justify-center mb-6 mt-6">
      <FaTrashAlt className="hover:scale-110" onClick={handleDelete} />
    </div>
  );
}
