"use client";

import { useState } from "react";

import { FaCheck } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { RiMailForbidFill } from "react-icons/ri";

export default function ListObjective({
  acquired,
  inProgress,
  upComming,
  numberModule,
}) {
  const [filter, setFilter] = useState("acquired");

  const handleListModule = (value) => {
    if (value.length === 0) {
      return (
        <div>
          <h3>Aucune compétences dans la section !</h3>
        </div>
      );
    }

    return Array.from({ length: numberModule + 1 }, (_, i) => i + 1).map(
      (index) => {
        const tri = value.filter((objective) => index === objective.moduleRef);

        if (tri.length === 0) {
          return (
            //   <div key={index}>
            //     <h3 className="text-amber-600 font-mono font-bold mb-4">
            //       Module N°{index}
            //     </h3>
            //     <p>Aucune compétences dans ce module</p>
            //   </div>
            <div></div>
          );
        }

        return (
          <div className="mt-6" key={index}>
            <h3 className="text-amber-600 font-mono font-bold mb-4">
              Module N°{index}
            </h3>
            {tri.map((objective) => (
              <div
                className="flex mb-2 items-center font-mono text-xs"
                key={objective.id}
              >
                <RiMailForbidFill className="mr-4 text-sm" />
                {objective.name}
              </div>
            ))}
          </div>
        );
      },
    );
  };

  const handleFilter = (filter: string) => {
    setFilter(filter);
  };
  return (
    <div className="w-[40%] h-80 border-1 border-gray-300 rounded-xl">
      <div className="h-[15%] flex justify-evenly p-2">
        <button
          className={`${filter === "acquired" ? "border-amber-600 text-amber-600" : "border-gray-500 text-gray-300"} p-1 rounded-sm  bg-black border-1  font-mono text-xs hover:cursor-pointer hover:text-amber-600 hover:border-amber-600`}
          onClick={() => handleFilter("acquired")}
        >
          Acquis
        </button>
        <button
          className={`${filter === "inProgress" ? "border-amber-600 text-amber-600" : "border-gray-500 text-gray-300"} p-1 rounded-sm  bg-black border-1 font-mono text-xs hover:cursor-pointer hover:text-amber-600 hover:border-amber-600`}
          onClick={() => handleFilter("inProgress")}
        >
          En cours
        </button>
        <button
          className={`${filter === "upComming" ? "border-amber-600 text-amber-600" : "border-gray-500 text-gray-300"} p-1 rounded-sm bg-black border-1 font-mono text-xs hover:cursor-pointer hover:text-amber-600 hover:border-amber-600`}
          onClick={() => handleFilter("upComming")}
        >
          Non abordé
        </button>
      </div>
      <div className="h-px w-full bg-gray-300"></div>
      <div className="h-[75%] overflow-x-scroll p-4 text-gray-400">
        <div>
          {filter === "acquired" && <div>{handleListModule(acquired)}</div>}
          {filter === "inProgress" && <div>{handleListModule(inProgress)}</div>}
          {filter === "upComming" && <div>{handleListModule(upComming)}</div>}
        </div>
      </div>
    </div>
  );
}
