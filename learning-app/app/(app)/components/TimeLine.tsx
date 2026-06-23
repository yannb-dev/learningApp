"use client";

import { parse, format, differenceInDays, differenceInMonths } from "date-fns";
import { fr } from "date-fns/locale";

import { useState } from "react";

import OpenSeance from "./OpenSeance";

import { FaChevronCircleUp } from "react-icons/fa";

export default function TimeLine({ seances, roadmap }) {
  //___________________ Calcul placement seance et mois ________________________
  const days = differenceInDays(roadmap.echeance, roadmap.createdAt);
  const numberMonth = differenceInMonths(roadmap.echeance, roadmap.createdAt);
  const arrayPositionMonth = [];

  let position = 0;

  for (let index = 0; index < numberMonth; index++) {
    position = position + (days * 10) / numberMonth;
    arrayPositionMonth.push({ num: index + 1, position: position });
  }

  const [seanceSelect, setSeanceSelect] = useState(null);

  function positionSeance(date) {
    const positionSeance = differenceInDays(date, roadmap.createdAt);

    return positionSeance;
  }

  //__________________ Ouverture d'une seance _________________________________
  const handleSelectSeance = (seance) => {
    setSeanceSelect(seance);
  };

  return (
    <div className="w-full h-auto flex flex-col items-center p-6">
      <div className="w-[80%] h-60 overflow-x-auto flex items-center p-2">
        <div
          style={{ minWidth: `${days * 10}px` }}
          className="relative h-6 bg-red-400 rounded-xl"
        >
          {seances &&
            seances.map((seance) => (
              <div
                key={seance.id}
                style={{ left: `${positionSeance(seance.createdAt)}px` }}
                className="absolute bottom-2 h-20 w-2 bg-black rounded-xl "
                onClick={() => handleSelectSeance(seance)}
              >
                <div className="absolute h-6 w-6 flex justify-center items-center rounded-[50%] bg-black top-0 left-1 translate-x-[-50%] translate-y-[-50%] ">
                  <div className="h-3 w-3 bg-white rounded-[50%]"></div>
                </div>
              </div>
            ))}
          {arrayPositionMonth.map((position) => (
            <div
              key={position.num}
              style={{ left: `${position.position}px` }}
              className="flex flex-col items-center absolute top-8"
            >
              <FaChevronCircleUp />
              <p className="">{position.num} mois</p>
            </div>
          ))}
        </div>
      </div>
      {seanceSelect && <OpenSeance seance={seanceSelect} />}
      {seanceSelect && (
        <button
          className="p-1 rounded-sm bg-red-400 mt-10"
          onClick={() => setSeanceSelect(null)}
        >
          Fermer
        </button>
      )}

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
