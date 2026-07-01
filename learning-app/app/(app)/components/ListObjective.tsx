"use client";

import { useState } from "react";

export default function ListObjective({ acquired, inProgress, upComming }) {
  const [filter, setFilter] = useState("");

  console.log(acquired, inProgress, upComming);

  const handleFilter = (filter: string) => {
    setFilter(filter);
    console.log(filter);
  };
  return (
    <div className="w-[40%] h-100 border-1 border-gray-300 rounded-xl">
      <div className="h-[10%] flex justify-evenly p-2">
        <button
          className="p-1 rounded-sm text-gray-300 bg-black border-1 border-gray-500 font-mono text-xs hover:cursor-pointer hover:text-orange-400 hover:border-orange-400"
          onClick={() => handleFilter("acquired")}
        >
          Acquis
        </button>
        <button
          className="p-1 rounded-sm text-gray-300 bg-black border-1 border-gray-500 font-mono text-xs hover:cursor-pointer hover:text-orange-400 hover:border-orange-400"
          onClick={() => handleFilter("inProgress")}
        >
          En cours
        </button>
        <button
          className="p-1 rounded-sm text-gray-300 bg-black border-1 border-gray-500 font-mono text-xs hover:cursor-pointer hover:text-orange-400 hover:border-orange-400"
          onClick={() => handleFilter("upComming")}
        >
          Non abordé
        </button>
      </div>
      <div className="h-px w-full bg-gray-300"></div>
      <div className="h-[85%] overflow-x-scroll p-4 text-gray-400">
        <div>
          {filter === "acquired" && (
            <div>
              {acquired.map((a) => (
                <div key={a.id}>{a.name}</div>
              ))}
            </div>
          )}
          {filter === "inProgress" && (
            <div>
              {inProgress.map((a) => (
                <div key={a.id}>{a.name}</div>
              ))}
            </div>
          )}
          {filter === "upComming" && (
            <div>
              {upComming.map((a) => (
                <div key={a.id}>{a.name}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
