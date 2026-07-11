"use client";

import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

//___________ import Icon ___________________________
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteProject({ projectId }: { projectId: string }) {
  const router = useRouter();

  const [viewConfirm, setViewConfirm] = useState(false);

  const handleConfirm = () => {
    setViewConfirm(true);
  };

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
    <div>
      {viewConfirm ? (
        <div>
          <p>Etes vous sûr de vouloir supprimer ?</p>
          <button
            className="p-1 rounded-md bg-green-600"
            onClick={() => handleDelete()}
          >
            Oui
          </button>
          <button
            className="p-1 rounded-md bg-amber-600 ml-6"
            onClick={() => setViewConfirm(false)}
          >
            Non
          </button>
        </div>
      ) : (
        <FaTrashAlt
          className="text-xl text-amber-600 hover:scale-110 ml-6"
          onClick={handleConfirm}
        />
      )}
    </div>
  );
}
