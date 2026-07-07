"use client";

import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";

export default function ListModule({ module }) {
  const [numViewModule, setNumViewModule] = useState(1);

  const handleSelectModule = (value) => {
    if (numViewModule < module.length && value === "+") {
      setNumViewModule(numViewModule + 1);
    }

    if (numViewModule > 1 && value === "-") {
      setNumViewModule(numViewModule - 1);
    }
  };

  const viewModule = module.find(
    (module) => module.numModule === numViewModule,
  );

  return (
    <div className="w-full flex mt-6">
      <div className="w-[5%] flex justify-center items-center">
        <FaChevronLeft
          onClick={() => handleSelectModule("-")}
          className={`hover:scale-105 hover:text-amber-600 ${numViewModule === 1 ? "hidden" : ""}`}
        />
      </div>
      <div className="w-[90%] flex flex-col h-100 border border-gray-300 bg-aside rounded-xl">
        <div className="flex p-4 justify-between">
          <h3 className="font-bold">Module N°{viewModule.numModule}</h3>
          <h3 className="p-1 bg-amber-600 rounded-sm">
            {viewModule.duration} heures
          </h3>
        </div>
        <div className="w-full overflow-y-scroll flex p-4">
          <div className="w-[50%] flex flex-col p-2">
            <h3>Pré-requis :</h3>
            <p className="text-xs text-gray-400 mt-2 mb-4">
              {viewModule.prerequisites}
            </p>
            <h3>Point critique :</h3>
            <p className="text-xs text-gray-400 text-justify mt-2 mb-4">
              {viewModule.pointcritical}
            </p>
            {viewModule.practicalproject && (
              <div>
                <h3>Projet :</h3>
                <p className="text-xs text-gray-400 text-justify mt-2 mb-4">
                  {viewModule.practicalproject.name}
                </p>
                <p className="text-xs text-gray-400 text-justify mt-2 mb-4">
                  {viewModule.practicalproject.detail}
                </p>
              </div>
            )}
          </div>
          <div className="w-[50%] flex flex-col p-2">
            <h3>Compétences :</h3>
            <ul className="mt-2 mb-4">
              {viewModule.objectives.map((objective) => (
                <li
                  className="flex items-start text-xs text-gray-400 mb-2"
                  key={objective.id}
                >
                  <FaFlag
                    className={`mr-2 ${objective.state === "InProgress" ? "text-amber-600" : ""} ${objective.state === "Acquired" ? "text-green-600" : ""}`}
                  />
                  {objective.name}
                </li>
              ))}
            </ul>
            <h3>Critère de validation :</h3>
            <ul className="mt-2 mb-4">
              {viewModule.criterias.map((criteria) => (
                <li
                  className="flex items-start text-xs text-gray-400 mb-2"
                  key={criteria.id}
                >
                  <TbPointFilled className="mr-2 text-green-600" />{" "}
                  {criteria.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[5%] flex justify-center items-center">
        <FaChevronRight
          onClick={() => handleSelectModule("+")}
          className={`hover:scale-105 hover:text-amber-600 ${numViewModule === module.length ? "hidden" : ""}`}
        />
      </div>
    </div>
  );
}
