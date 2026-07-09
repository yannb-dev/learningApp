"use client";

import { useRouter } from "next/navigation";

export default function BtnOpenApp() {
  const router = useRouter();
  return (
    <div>
      <button
        className="pl-4 pt-2 pr-4 pb-2 rounded-xl border border-gray-300 bg-gray-100 hover:bg-gray-200"
        onClick={() => router.push("/accueil")}
      >
        Ouvrir mon app !
      </button>
    </div>
  );
}
