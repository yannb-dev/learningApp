"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

//___________ import Icon ___________________________
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteRoadmap({ roadmapId }: { roadmapId: string }) {
  const router = useRouter();

  const [confirm, setConfirm] = useState(false);

  const handleDelete = () => {
    setConfirm(true);
  };

  const handleConfirme = async () => {
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
    <div className="w-full flex justify-center mb-6 mt-6">
      {!confirm && (
        <FaTrashAlt className="hover:scale-110" onClick={handleDelete} />
      )}
      {confirm && (
        <div className="text-gray-300 font-bold overlay">
          <div className=" flex modal">
            <p>Es tu sûr de vouloir supprimer ?</p>
            <button
              className="p-1 rounded-md bg-green-700 ml-10"
              onClick={() => handleConfirme}
            >
              Oui
            </button>
            <button
              className="p-1 rounded-md bg-amber-600 ml-10"
              onClick={() => setConfirm(false)}
            >
              Non
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
