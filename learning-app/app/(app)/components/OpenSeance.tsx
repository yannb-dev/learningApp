"use client";

export default function OpenSeance(seance) {
  console.log("Depuis le componente", seance.seance.sujet);

  return (
    <div className="w-[80%] h-auto flex flex-col justify-center border-2 border-gray-300 border-dashed rounded-xl mt-12 p-4 ">
      <div className="w-full flex justify-evenly">
        <h3>Seance N°{}</h3>
        <h3>Sujet : {seance.seance.sujet}</h3>
        <h3>Date : {}</h3>
      </div>
      <div className="flex flex-col">
        <p className="mt-4">
          <strong>Thèmes abordés :</strong> {seance.seance.accomplished}
        </p>
        <p className="mt-4">
          <strong>Difficultés rencontrés :</strong> {seance.seance.difficulty}
        </p>
        <p className="mt-4">
          <strong>Points importants :</strong> {seance.seance.keyPoint}
        </p>
      </div>
    </div>
  );
}
