"use client";

import { useRouter } from "next/navigation";

export default function BtnOpenApp() {
  const router = useRouter();
  return (
    <div>
      <button
        className="p-2 bg-amber-600 text-white font-bold rounded-sm"
        onClick={() => router.push("/accueil")}
      >
        Ouvrir mon app !
      </button>
    </div>
  );
}
