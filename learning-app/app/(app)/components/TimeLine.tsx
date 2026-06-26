"use client";

import { parse, format, differenceInDays, differenceInMonths } from "date-fns";
import { fr } from "date-fns/locale";
import { FaChevronCircleUp } from "react-icons/fa";
import { useState } from "react";

//____________________ Import components ______________________________________
import OpenSeance from "./OpenSeance";

//____________________ Import icon ___________________________________________
import { FaRegHandPointDown } from "react-icons/fa";

export default function TimeLine({
  seances,
  roadmap,
  acquired,
  inProgress,
  upComming,
}) {
  const [seanceSelect, setSeanceSelect] = useState(null);
  const [stateBulle, setStateBulle] = useState(null);
  const [stateBackgroundBulle, setStateBackgroundBulle] = useState(null);

  //___________________ Calcul placement seance et mois ________________________
  const days = differenceInDays(roadmap.echeance, roadmap.createdAt);
  const numberMonth = differenceInMonths(roadmap.echeance, roadmap.createdAt);
  const arrayPositionMonth = [];

  let position = 0;

  for (let index = 0; index < numberMonth; index++) {
    position = position + (days * 10) / numberMonth;
    arrayPositionMonth.push({ num: index + 1, position: position });
  }

  function positionSeance(date) {
    const positionSeance = differenceInDays(date, roadmap.createdAt);

    return positionSeance;
  }

  //__________________ Ouverture d'une seance _________________________________
  const handleSelectSeance = (seance) => {
    setSeanceSelect(seance);
    setStateBackgroundBulle(seance.id);
  };

  //__________________ Listing des objectives _________________________________
  const handleListObjective = (tri) => {
    const tab = tri.map((objective) => (
      <div key={objective.id} className="flex flex-col font-mono mb-4">
        <FaRegHandPointDown className="text-red-500 mb-2" />
        {objective.name}
      </div>
    ));

    return tab;
  };

  return (
    <div className="w-full h-auto flex flex-col items-center p-6">
      <div className="w-[80%] h-60 overflow-x-auto flex items-center p-4">
        <div
          style={{ minWidth: `${days * 10}px` }}
          className="relative h-4 bg-red-300"
        >
          {seances &&
            seances.map((seance) => (
              <div
                key={seance.id}
                style={{ left: `${positionSeance(seance.createdAt)}px` }}
                className="absolute bottom-0 h-20 w-[4px] bg-black rounded-xl "
                onClick={() => handleSelectSeance(seance)}
              >
                <div className="absolute h-6 w-6 flex justify-center items-center rounded-[50%] bg-black top-0 left-[2px] translate-x-[-50%] translate-y-[-50%] ">
                  <div
                    onMouseEnter={() => setStateBulle(seance.id)}
                    onMouseLeave={() => setStateBulle(null)}
                    className={`h-5 w-5 rounded-[50%] hover:bg-green-500 ${stateBackgroundBulle === seance.id ? "bg-green-500" : "bg-red-300"}`}
                  ></div>
                </div>
                {stateBulle === seance.id && (
                  <div className="absolute h-10 w-100 flex items-center border-1 border-black rounded-sm bottom-5 left-0 p-1">
                    <p className="text-sm">{seance.sujet}</p>
                  </div>
                )}
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
          onClick={() => {
            (setSeanceSelect(null), setStateBackgroundBulle(null));
          }}
        >
          Fermer
        </button>
      )}

      <div className="w-full flex justify-evenly mt-10">
        <div className="h-min w-80 border-2 border-black rounded-xl p-2">
          <h1 className="font-mono font-bold text-center mb-6">Maitrisé</h1>
          {handleListObjective(acquired)}
        </div>
        <div className="h-min w-80 border-2 border-black rounded-xl p-2">
          <h1 className="font-mono font-bold text-center mb-6">
            En cours d'apprentissage
          </h1>
          {handleListObjective(inProgress)}
        </div>
        <div className="h-min w-80 border-2 border-black rounded-xl p-2">
          <h1 className="font-mono font-bold text-center mb-6">Non abordé</h1>
          {handleListObjective(upComming)}
        </div>
      </div>
    </div>
  );
}
