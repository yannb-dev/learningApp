import { FaChevronCircleRight } from "react-icons/fa";
import { FiTool } from "react-icons/fi";
import { FiPenTool } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

import { Practicalproject } from "@/app/generated/prisma";

export default function DetailProject({
  project,
}: {
  project: Practicalproject;
}) {
  return (
    <div className="w-[55%] h-80 border border-gray-300 rounded-xl font-mono text-xs text-gray-200 bg-aside">
      <div className="w-full flex items-center justify-between p-2">
        <h1>Project en cours :</h1>
        <h1 className="p-2 text-md bg-amber-600 rounded-md">{project.state}</h1>
      </div>

      <div className="h-px w-full bg-gray-300"></div>
      <div className="h-60 overflow-y-scroll overflow-hidden p-4">
        <h3 className="font-bold mb-2">Titre : {project.name}</h3>
        <h3 className="font-bold mt-2 mb-2 flex items-center">
          <FiTool className="text-sm text-amber-600 mr-4" />
          Techniques :
        </h3>
        <p className="text-gray-300">{project.stack}</p>
        <h3 className="font-bold mt-2 mb-2 flex items-center">
          <FaSearch className="text-sm text-amber-600 mr-4" />
          Détail :
        </h3>
        <p className="text-justify text-gray-300">{project.detail}</p>
        <h3 className="font-bold mt-2 mb-2 flex items-center">
          <IoIosWarning className="text-sm text-amber-600 mr-4" />
          Points d'intentions :
        </h3>
        <p className="text-gray-300">{project.warning}</p>
        <div className="mb-4 mt-4 p-4 bg-aside rounded-xl border border-gray-200 font-mono">
          <h3 className="mb-4 font-bold mt-2">Conseil :</h3>
          <ul>
            {project.stepHelp.map((list) => (
              <li key={list} className="flex items-center mb-2">
                <FaChevronCircleRight />
                <p className="ml-4">{list}</p>
              </li>
            ))}
          </ul>
        </div>
        <h3 className="mb-2 font-bold mt-2 flex items-center">
          <FiPenTool className="text-sm text-amber-600 mr-4" />
          Note de progression
        </h3>
        <p className="text-gray-300">{project.noteInProgress}</p>
      </div>
    </div>
  );
}
