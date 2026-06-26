"use client";

import { useState } from "react";

export default function ListMemo({ memo, tags }) {
  const [listMemo, setListMemo] = useState(memo);
  const [stateTag, setStateTag] = useState(null);

  //____________ Filtre par tag ____________________
  const handleFiltre = async (tag) => {
    let newArray = [];

    await memo.map((m) => {
      const present = m.tags.some((t) => t.slug === tag);

      console.log(m.tags);

      if (present) {
        newArray.push(m);
      }
    });

    setListMemo(newArray);
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <input
          className="h-10 w-100 rounded-xl bg-gray-200 p-2"
          type="text"
          placeholder="Recherche un mémo"
        />
        <div className="flex mt-6 mb-6">
          {tags.map((tag) => (
            <div
              className={`${stateTag === tag.slug ? "bg-blue-500" : "bg-gray-300"}  p-2 text-white rounded-xl mr-4 hover:cursor-pointer`}
              key={tag.slug}
              onClick={() => {
                (setStateTag(tag.slug), handleFiltre(tag.slug));
              }}
            >
              #{tag.slug}
            </div>
          ))}
        </div>
        <h3
          className="hover:cursor-pointer text-center font-mono font-bold mb-6"
          onClick={() => {
            (setStateTag(null), setListMemo(memo));
          }}
        >
          Effacer les filtres
        </h3>
      </div>
      {memo.length > 0 ? (
        <div className=" w-[90%] h-auto grid grid-cols-4 gap-4 ">
          {listMemo.map((memo) => (
            <div
              className="h-60 rounded-xl border-2 border-gray-400 bg-gray-100 p-4"
              key={memo.id}
            >
              <h1 className="font-mono font-bold">Mémo :</h1>
              <h3 className="text-sm font-mono">{memo.topic}</h3>
              <div className="flex mt-2">
                {memo.tags.map((tag) => (
                  <div
                    className="w-auto p-1 bg-red-500 text-white rounded-xl mr-2"
                    key={tag.slug}
                  >
                    #{tag.slug}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>Aucun memo</h1>
      )}
    </div>
  );
}
