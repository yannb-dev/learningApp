"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

//___________ import Icon ___________________________
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteProject({ projectId }: { projectId: string }) {
  const router = useRouter();

  const [viewConfirm, setViewConfirm] = useState(false);
  const [errorFetch, setErrorFetch] = useState(false);

  const handleConfirm = () => {
    setViewConfirm(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/project/${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/newproject");
        router.refresh();
      }
    } catch (err) {
      console.error("Erreur du Delete project", err);
      setErrorFetch(true);
      setTimeout(() => setErrorFetch(false), 3000);
    }
  };

  return (
    <div>
      {errorFetch && <p>Oups une erreur c&apos;est produite !</p>}
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
