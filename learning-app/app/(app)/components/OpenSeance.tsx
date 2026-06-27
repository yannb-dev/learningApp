"use client";

import { parse, format, differenceInDays, differenceInMonths } from "date-fns";
import { fr } from "date-fns/locale";

import { Seance } from "@/lib/schema/SeanceApi";

type Props = {
  seance: Seance;
};

export default function OpenSeance({ seance }: Props) {
  return (
    <div className="w-[80%] h-auto flex flex-col justify-center border-2 border-black border-dashed rounded-xl mt-12 overflow-hidden ">
      <div className="w-full h-12 flex items-center justify-between bg-red-300 p-2">
        <h3 className="font-mono">
          <strong>Sujet : </strong> {seance.sujet}
        </h3>
        <h3 className="font-mono">
          <strong>Date :</strong>{" "}
          {format(seance.createdAt, "dd/MM/yyyy", { locale: fr })}
        </h3>
      </div>
      <div className="flex flex-col p-6">
        <div>
          <h3 className="font-mono font-bold mt-4">Thèmes abordés</h3>
          <p className="mt-2 font-mono text-justify">{seance.accomplished}</p>
        </div>
        <div>
          <h3 className="font-mono font-bold mt-4">Difficultés rencontrés :</h3>
          <p className="mt-2 font-mono text-justify">{seance.difficulty}</p>
        </div>
        <div>
          <h3 className="font-mono font-bold mt-4">Points importants :</h3>
          <p className="mt-2 font-mono text-justify">{seance.keyPoint}</p>
        </div>
      </div>
    </div>
  );
}
