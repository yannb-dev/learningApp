"use client";

import { useState } from "react";

import { FaCheck } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { RiMailForbidFill } from "react-icons/ri";

export default function ListObjective({ acquired, inProgress, upComming }) {
  const [filter, setFilter] = useState("");

  console.log(acquired, inProgress, upComming);

  const handleFilter = (filter: string) => {
    setFilter(filter);
    console.log(filter);
  };
  return (
    <div className="w-[40%] h-60 border-1 border-gray-300 rounded-xl">
      <div className="h-[20%] flex justify-evenly p-2">
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
          {filter === "acquired" && (
            <div>
              {acquired.map((a) => (
                <div className="flex mb-2" key={a.id}>
                  <FaCheck className="mr-4 text-sm" />
                  {a.name}
                </div>
              ))}
            </div>
          )}
          {filter === "inProgress" && (
            <div>
              {inProgress.map((a) => (
                <div className="flex mb-2" key={a.id}>
                  <GrInProgress className="mr-4 text-sm" />
                  {a.name}
                </div>
              ))}
            </div>
          )}
          {filter === "upComming" && (
            <div>
              {upComming.map((a) => (
                <div className="flex mb-2 items-center" key={a.id}>
                  <RiMailForbidFill className="mr-4 text-sm" />
                  {a.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
