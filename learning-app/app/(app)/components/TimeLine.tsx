"use client";

import { parse, format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";

import { useState } from "react";

import OpenSeance from "./OpenSeance";

export default function TimeLine({ seances, roadmap }) {
  const days = differenceInDays(roadmap.echeance, roadmap.createdAt);
  const positionSeance = differenceInDays(seances.createdAt, roadmap.createdAt);

  const [seanceSelect, setSeanceSelect] = useState(null);

  const handleSelectSeance = (seance) => {
    setSeanceSelect(seance);
  };

  return (
    <div className="w-full h-auto flex flex-col items-center p-6">
      <div className="w-[80%] h-60 overflow-x-auto flex items-end rounded-xl p-4">
        <div
          style={{ minWidth: `${days * 10}px` }}
          className="relative h-6 bg-red-400 rounded-xl"
        >
          {seances &&
            seances.map((seance) => (
              <div
                key={seance.id}
                style={{ left: `${positionSeance}px` }}
                className="absolute bottom-2 h-50 w-2 bg-black rounded-xl "
                onClick={() => handleSelectSeance(seance)}
              >
                <div className="absolute h-6 w-6 flex justify-center items-center rounded-[50%] bg-black top-0 left-1 translate-x-[-50%] translate-y-[-50%] ">
                  <div className="h-3 w-3 bg-white rounded-[50%]"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {seanceSelect && <OpenSeance seance={seanceSelect} />}

      <div className="w-full flex justify-evenly mt-10">
        <div className="h-70 w-80 border-2 border-black rounded-xl">
          Maitrisé
        </div>
        <div className="h-70 w-80 border-2 border-black rounded-xl">
          En cours d'apprentissage
        </div>
        <div className="h-70 w-80 border-2 border-black rounded-xl">
          Non abordé
        </div>
      </div>
    </div>
  );
}
