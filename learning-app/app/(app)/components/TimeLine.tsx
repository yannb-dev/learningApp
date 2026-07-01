"use client";

import { Prisma } from "@/app/generated/prisma";

import { parse, format, differenceInDays, differenceInMonths } from "date-fns";
import { fr } from "date-fns/locale";
import { FaChevronCircleUp } from "react-icons/fa";
import { useState } from "react";

import { Seance } from "@/lib/schema/SeanceApi";
import { Objective } from "@/app/generated/prisma";

//____________________ Import components ______________________________________
import IconSeance from "./IconSeance";

//____________________ Import icon ___________________________________________
import { FaRegHandPointDown } from "react-icons/fa";

type RoadmapData = Prisma.RoadmapGetPayload<{
  include: {
    module: {
      include: {
        criterias: true;
        objectives: true;
      };
    };
  };
}>;

type Props = {
  seances: Seance[];
  roadmap: RoadmapData;
};

export default function TimeLine({ seances, roadmap }: Props) {
  const [seanceSelect, setSeanceSelect] = useState<Seance | null>();

  //__________________ Ouverture d'une seance _________________________________
  const handleSelectSeance = (seance: Seance) => {
    setSeanceSelect(seance);
  };

  //__________________ Listing des objectives _________________________________
  const handleListObjective = (tri: Objective[]) => {
    const tab = tri.map((objective) => (
      <div key={objective.id} className="flex flex-col font-mono mb-4">
        <FaRegHandPointDown className="text-red-500 mb-2" />
        {objective.name}
      </div>
    ));

    //_________________handleColorPoint _______________________________________

    return tab;
  };

  const handleColorPoint = () => {
    console.log();
  };

  return (
    <div className="w-full h-min-100 flex flex-col items-start mt-20 bg-aside rounded-xl border-1 border-gray-300">
      <h1 className="m-4 text-gray-100 font-mono">
        Chronologie des sessions :
      </h1>
      <div className="h-px w-full bg-gray-300"></div>
      <div className="h-full w-[80%] overflow-y flex flex-col justify-center p-4">
        {seances.map((s) => (
          <div className="w-full flex justify-between" key={s.id}>
            <div className="flex">
              <IconSeance />
              <div className="flex flex-col ml-6">
                <h1 className="font-mono text-white text-sm">
                  {s.sujet}
                  {/* {s.tags.map((t) => (
                <div
                  className="p-1 rounded-xl bg-gray-100 font-mono text-amber-600"
                  key={t.slug}
                >
                  #{t.name}
                </div>
              ))} */}
                </h1>
                <p className="font-mono text-gray-400 text-xs mt-4">
                  {s.accomplished}
                </p>
              </div>
            </div>
            <p className="font-mono text-white">
              {format(s.createdAt, "dd/MM", { locale: fr })}
            </p>
          </div>
        ))}
      </div>

      {/* {seanceSelect && <OpenSeance seance={seanceSelect} />}
      {seanceSelect && (
        <button
          className="p-1 rounded-sm bg-red-400 mt-10"
          onClick={() => {
            setSeanceSelect(null);
          }}
        >
          Fermer
        </button>
      )} */}
      {/* <div className="w-full flex justify-evenly mt-10">
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
      </div> */}
    </div>
  );
}
