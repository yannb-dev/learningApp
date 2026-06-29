"use client";

import { useRouter } from "next/navigation";

const styleBtn =
  "w-full text-start rounded-sm font-mono text-xl mb-4 p-2 hover:bg-gray-200 hover:text-black";

export default function ProfilBtn({ idProject }: { idProject: string }) {
  const router = useRouter();

  const handleNavigation = (page: string) => {
    router.push(`/${page}?project=${idProject}`);
  };

  return (
    <div className="w-full flex flex-col items-start mb-12">
      <button className={styleBtn} onClick={() => handleNavigation("profil")}>
        Profil
      </button>
    </div>
  );
}
