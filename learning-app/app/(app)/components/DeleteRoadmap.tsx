"use client";

import { useRouter } from "next/navigation";

export default function DeleteRoadmap({ roadmapId }: { roadmapId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/roadmap/${roadmapId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
        console.log("Effacé");
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
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
