"use client";

import { Prisma } from "@/app/generated/prisma";

import { parse, format, differenceInDays, differenceInMonths } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";

import { Seance } from "@/lib/schema/SeanceApi";
import { Objective } from "@/app/generated/prisma";

//____________________ Import components ______________________________________
import IconSeance from "./IconSeance";

//____________________ Import icon ___________________________________________
import { FaRegHandPointDown } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";

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
    <div className="w-full flex flex-col items-start mt-20 bg-aside rounded-xl border-1 border-gray-300">
      <h1 className="m-4 text-gray-100 font-mono">
        Chronologie des sessions :
      </h1>
      <div className="h-px w-full bg-gray-300"></div>
      <div className="h-80 w-full overflow-y-scroll flex flex-col justify-start p-6 ">
        {seances.map((s) => (
          <div key={s.id} className="flex flex-col items-center">
            <div className="w-full flex justify-between mb-6" key={s.id}>
              <div>
                <div className="flex">
                  <IconSeance />
                  <div className="flex flex-col ml-6">
                    <h1 className="font-mono text-white text-sm">{s.sujet}</h1>
                    <div></div>
                    <p className="w-200 font-mono text-gray-400 text-xs text-justify mt-4">
                      {s.accomplished}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex h-min items-center">
                <FaCircle className="text-amber-600 text-sm" />
                <p className="font-mono text-white ml-4">
                  {format(s.createdAt, "dd/MM", { locale: fr })}
                </p>
              </div>
            </div>
            <div className="w-[50%] h-[1px] bg-gray-300 rounded-xl mb-6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
