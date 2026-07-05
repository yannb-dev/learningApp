import { FaChevronCircleRight } from "react-icons/fa";

export default function DetailProject({ project }) {
  return (
    <div className="w-[55%] h-80 border-1 border-gray-300 rounded-xl font-mono text-xs text-gray-200">
      <h1 className="m-4">Project en cours :</h1>
      <div className="h-px w-full bg-gray-300"></div>
      <div className="h-60 overflow-y-scroll overflow-hidden p-2">
        <h3 className="font-bold">Titre : {project.name}</h3>
        <h3 className="font-bold mt-2">Techniques :</h3>
        <p>{project.stack}</p>
        <h3 className="font-bold mt-2">Détail :</h3>
        <p className="text-justify">{project.detail}</p>
        <h3 className="font-bold mt-2">Points d'intentions :</h3>
        <p>{project.warning}</p>
        <div className="m-4 p-4 bg-aside rounded-xl border border-gray-200 font-mono">
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
      </div>
    </div>
  );
}
