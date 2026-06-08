"use client";

import { useRouter } from "next/navigation";

import MarkdownForm from "../components/MarkdownForm";

import { TbArrowBackUp } from "react-icons/tb";

export default function GestionPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <button
        className="p-2 bg-red-300 text-white font-bold rounded-sm mb-8"
        onClick={() => router.back()}
      >
        <TbArrowBackUp className="text-2xl" />
      </button>
      <MarkdownForm />
    </div>
  );
}
