"use client";

import { useRouter } from "next/navigation";

export default function DeleteRoadmap({ roadmapId }) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch(`/api/roadmap/${roadmapId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.refresh();
      console.log("Effacé");
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
