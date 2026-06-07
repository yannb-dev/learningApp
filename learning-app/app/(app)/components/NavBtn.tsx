"use client";

import { useRouter } from "next/navigation";

const styleBtn =
  "pl-4 pt-2 pr-4 pb-2 rounded-xl border-1 border-gray-300 bg-gray-100 hover:bg-gray-200";

export default function NavBtn({ idProject }: { idProject: string }) {
  const router = useRouter();

  console.log("id du projet dans la barre de nav", idProject);

  const handleNavigation = (page: string) => {
    router.push(`/${page}?project=${idProject}`);
  };

  return (
    <div className="w-[70%] flex justify-evenly items-center mt-8">
      <button className={styleBtn} onClick={() => handleNavigation("gestion")}>
        Gestion
      </button>
      <button className={styleBtn} onClick={() => handleNavigation("roadmap")}>
        Roadmap
      </button>
      <button className={styleBtn} onClick={() => handleNavigation("memo")}>
        Memo
      </button>
    </div>
  );
}
