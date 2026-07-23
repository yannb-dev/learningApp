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

const number = Math.floor(Math.random() * 6) + 1;

export default function IconSeance() {
  const filter = tabIcon.find((icon) => icon.index === number);

  return (
    <div className="w-[10%]">
      {
        <div className="w-8 h-8 flex justify-center items-center rounded-[50%] border-2 border-white">
          {filter === undefined ? (
            <GiPerspectiveDiceSixFacesFive />
          ) : (
            <filter.Icon className={filter?.className} />
          )}
        </div>
      }
    </div>
  );
}
