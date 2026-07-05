"use client";

import { Prisma } from "@/app/generated/prisma";
import { log } from "console";

import { useState } from "react";

type Memo = Prisma.MemoGetPayload<{
  include: {
    tags: true;
  };
}>;

type Props = {
  memo: Memo[];
  array: { slug: string }[];
};

export default function ListMemo({ memo, array }: Props) {
  const [listMemo, setListMemo] = useState(memo);
  const [stateTag, setStateTag] = useState("");

  //____________ Filtre par tag ____________________
  const handleFiltre = (tag: string) => {
    console.log(tag);

    setListMemo(memo.filter((m) => m.tags.find((t) => t.slug === tag)));
  };

  console.log(listMemo);

  return (
    <div className="w-full h-screen flex flex-col items-center font-mono">
      <div>
        <div className="flex flex-wrap mt-6 mb-6">
          {array.map((tag) => (
            <div
              className={`${stateTag === tag.slug ? "bg-gray-300" : ""}  p-1 text-amber-600 font-bold rounded-sm mr-4 mb-4 hover:cursor-pointer`}
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
          className="hover:cursor-pointer text-center text-amber-600 font-bold mb-4"
          onClick={() => {
            (setStateTag(""), setListMemo(memo));
          }}
        >
          Effacer les filtres
        </h3>
      </div>
      <div className="w-full h-[70%] overflow-y-scroll">
        {memo.length > 0 ? (
          <div className=" w-[90%] grid grid-cols-3 gap-4">
            {listMemo.map((memo) => (
              <div
                className="h-80 overflow-y-scroll rounded-xl border-2 border-gray-400 bg-aside text-gray-300 p-4"
                key={memo.id}
              >
                <h1 className="font-mono font-bold">Mémo :</h1>
                <h3 className="text-sm font-mono">{memo.topic}</h3>
                <div className="flex mt-2">
                  {memo.tags.map((tag) => (
                    <div
                      className="w-auto p-1 bg-amber-600 text-white text-xs rounded-xl mr-2 flex flex-wrap"
                      key={tag.slug}
                    >
                      #{tag.slug}
                    </div>
                  ))}
                </div>
                <p className="text-justify mt-6 text-sm">{memo.snippet}</p>
                <p className="text-justify mt-6 text-sm">{memo.notes}</p>
              </div>
            ))}
          </div>
        ) : (
          <h1>Aucun memo</h1>
        )}
      </div>
    </div>
  );
}
