"use client";

import { useRouter } from "next/navigation";
import { TbArrowBackUp } from "react-icons/tb";

export default function BtnBack() {
  const router = useRouter();

  return (
    <div>
      <button
        className="p-2 bg-amber-600 text-white font-bold rounded-sm mb-8"
        onClick={() => router.back()}
      >
        <TbArrowBackUp className="text-2xl" />
      </button>
    </div>
  );
}
