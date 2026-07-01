import { FaDocker } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaGitlab } from "react-icons/fa";
import { FaInternetExplorer } from "react-icons/fa";
import { FaJs } from "react-icons/fa";
import { FaReact } from "react-icons/fa";

import { FaSkyatlas } from "react-icons/fa";
import { FaSuperpowers } from "react-icons/fa";
import { GiCandlebright } from "react-icons/gi";
import { GiDrop } from "react-icons/gi";
import { GiFlamer } from "react-icons/gi";
import { GiLightBulb } from "react-icons/gi";
import { GiMaterialsScience } from "react-icons/gi";
import { GiRosaShield } from "react-icons/gi";

// Dé en perspective
import { GiPerspectiveDiceSixFacesFive } from "react-icons/gi";
import { GiPerspectiveDiceSixFacesFour } from "react-icons/gi";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { GiPerspectiveDiceSixFacesTwo } from "react-icons/gi";
import { GiPerspectiveDiceSixFacesThree } from "react-icons/gi";
import { GiPerspectiveDiceSixFacesSix } from "react-icons/gi";

const tabIcon = [
  {
    index: 1,
    Icon: GiPerspectiveDiceSixFacesOne,
    color: "blue-200",
    className: "text-blue-200 text-2xl",
  },
  {
    index: 2,
    Icon: GiPerspectiveDiceSixFacesTwo,
    color: "text-yellow-200",
    className: "text-yellow-200 text-2xl",
  },
  {
    index: 3,
    Icon: GiPerspectiveDiceSixFacesThree,
    color: "text-green-800",
    className: "text-green-800 text-2xl",
  },
  {
    index: 4,
    Icon: GiPerspectiveDiceSixFacesFour,
    color: "red-400",
    className: "text-red-400 text-2xl",
  },
  {
    index: 5,
    Icon: GiPerspectiveDiceSixFacesFive,
    color: "orange-400",
    className: "text-orange-400 text-2xl",
  },
  {
    index: 6,
    Icon: GiPerspectiveDiceSixFacesSix,
    color: "white",
    className: "text-white text-2xl",
  },
];

export default function IconSeance() {
  const number = Math.floor(Math.random() * 6) + 1;

  const filter = tabIcon.find((icon) => icon.index === number);

  return (
    <div>
      {
        <div className="w-12 h-12 flex justify-center items-center rounded-[50%] border-2 border-gray-500">
          <filter.Icon className={filter?.className} />
        </div>
      }
    </div>
  );
}
