"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

//___________ import Icon ___________________________
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteSeance({ seanceId }: { seanceId: string }) {
  const router = useRouter();
  const [errorFetch, setErrorFetch] = useState(false);

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
      setErrorFetch(true);
      setTimeout(() => setErrorFetch(false), 3000);
    }
  };

  return (
    <div className="w-full flex justify-center mb-6 mt-6">
      <FaTrashAlt className="hover:scale-110" onClick={handleDelete} />
      {errorFetch && <p>Oups une erreur c&apos;est produite</p>}
    </div>
  );
}
