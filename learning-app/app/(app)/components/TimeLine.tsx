"use client";

import { Prisma } from "@/app/generated/prisma";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";

import { Seance } from "@/lib/schema/SeanceApi";

//____________________ Import components ______________________________________
import IconSeance from "./IconSeance";

//____________________ Import icon ___________________________________________
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
  return (
    <div className="w-full flex flex-col items-start mt-8 bg-aside rounded-xl border border-gray-300">
      <h1 className="m-2 text-gray-100 text-sm font-mono">
        Chronologie des sessions :
      </h1>
      <div className="h-px w-full bg-gray-300"></div>
      <div className="h-60 md:h-80 w-full overflow-y-scroll box-border flex flex-col justify-start p-2 ">
        {seances.map((s) => (
          <div
            key={s.id}
            className="w-full h-auto flex flex-col items-center mt-2"
          >
            <div className="w-full flex justify-between mb-6" key={s.id}>
              <div className="w-full">
                <div className="flex p-2">
                  <IconSeance />
                  <div className="w-[95%] flex flex-col ml-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <h1 className="font-mono text-white text-xs">
                        {s.sujet}{" "}
                      </h1>
                      <div className="w-auto flex h-min items-center">
                        <FaCircle className="text-amber-600 text-sm" />
                        <p className="font-mono text-white ml-4">
                          {format(s.createdAt, "dd/MM", { locale: fr })}
                        </p>
                      </div>
                    </div>

                    <div className="w-[95%] flex flex-wrap gap-2 mt-2">
                      {s.tags.map((tag) => (
                        <p
                          key={tag}
                          className="p-1 rounded-md bg-amber-600 text-white ml-2 text-xs"
                        >
                          {tag}
                        </p>
                      ))}
                    </div>
                    <p className="w-auto font-mono text-gray-400 text-xs text-justify mt-4">
                      {s.accomplished}
                    </p>
                  </div>
                  <div className="flex "></div>
                </div>
              </div>
            </div>
            <div className="w-[50%] h-px bg-gray-300 rounded-xl mb-6"></div>
          </div>
        ))}
        {!roadmap && (
          <div className="flex flex-col items-center mt-2">
            <p>Aucune Roadmap initialisé rendez vous dans la section Gestion</p>
          </div>
        )}
      </div>
    </div>
  );
}
