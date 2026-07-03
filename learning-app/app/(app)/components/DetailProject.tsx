import { FaChevronCircleRight } from "react-icons/fa";

export default function DetailProject() {
  return (
    <div className="w-[55%] h-80 border-1 border-gray-300 rounded-xl font-mono text-xs text-gray-200">
      <h1 className="m-4">Project en cours :</h1>
      <div className="h-px w-full bg-gray-300"></div>
      <div className="p-2">
        <h3>Titre :</h3>
        <h3>Techniques :</h3>
        <h3>Détail :</h3>
        <h3>Points d'intentions :</h3>
        <div className="min-h-40 overflow-y-scroll m-4 p-4 bg-aside rounded-xl border border-gray-200 font-mono">
          <h3 className="mb-4">Conseil :</h3>
          <ul>
            <li className="flex items-center">
              <FaChevronCircleRight />
              <p className="ml-4">Commencer par</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
