"use client";

import { useRouter } from "next/navigation";

export default function MemoPage() {
  const router = useRouter();
  return (
    <div>
      <button
        className="p-2 bg-red-500 text-white font-bold rounded-sm"
        onClick={() => router.back()}
      >
        Retour
      </button>
    </div>
  );
}
