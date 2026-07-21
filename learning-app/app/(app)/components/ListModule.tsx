"use client";

import { Prisma } from "@prisma/client";

import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import Card from "./ui/Card";
import DivAmber from "./ui/DivAmber";

type ModuleWithChildren = Prisma.ModuleGetPayload<{
  include: { objectives: true; criterias: true; practicalproject: true };
}>;

export default function ListModule({
  module,
}: {
  module: ModuleWithChildren[];
}) {
  const [numViewModule, setNumViewModule] = useState(1);

  const handleSelectModule = (value: string) => {
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
    <div className="w-full flex mt-4">
      <button className="w-[10%] flex justify-center items-center">
        <FaChevronLeft
          onClick={() => handleSelectModule("-")}
          className={`hover:scale-105 hover:text-amber-600 ${numViewModule === 1 ? "hidden" : ""}`}
        />
      </button>
      {viewModule && (
        <Card
          className="w-[80%"
          children={
            <div>
              <div className="flex p-4 justify-between">
                <h3 className="font-bold">Module N°{viewModule.numModule}</h3>
                <DivAmber
                  className="text-xs"
                  children={<p>{viewModule.duration} heures</p>}
                />
              </div>
              <div className="w-full overflow-y-scroll flex flex-col md:flex-row p-2">
                <div className="w-full flex flex-col p-2">
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
                <div className="w-full flex flex-col p-2">
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
          }
        />
      )}

      <button className="w-[10%] flex justify-center items-center">
        <FaChevronRight
          onClick={() => handleSelectModule("+")}
          className={`hover:scale-105 hover:text-amber-600 ${numViewModule === module.length ? "hidden" : ""}`}
        />
      </button>
    </div>
  );
}
