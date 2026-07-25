"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

//___________ import Icon ___________________________
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

export default function DeleteProject({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [viewConfirm, setViewConfirm] = useState(false);
  const [errorFetch, setErrorFetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setViewConfirm(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/project/${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/newproject");
        router.refresh();
      }
    } catch (err) {
      setLoading(false);
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
      {loading && (
        <div>
          <AiOutlineLoading className="animate-spin text-3xl text-amber-600 ml-10" />
        </div>
      )}
    </div>
  );
}
