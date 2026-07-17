"use client";

import { Prisma } from "@/app/generated/prisma";

import { useState } from "react";

//________________component ________________
import CodeBlock from "./CodeBlock";

// _______________ type _________________
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
    setListMemo(memo.filter((m) => m.tags.find((t) => t.slug === tag)));
  };

  //____________ Tri alphabétique tags ____________
  const arrayTri = array.sort((a, b) => {
    return a.slug.localeCompare(b.slug);
  });

  return (
    <div className="w-full h-screen flex flex-col items-center font-mono">
      <div>
        <div className="flex flex-wrap mt-6 mb-6">
          {arrayTri.map((tag) => (
            <button
              className={`${stateTag === tag.slug ? "bg-gray-300" : ""} text-xs p-1 text-amber-600 font-bold rounded-sm mr-4 mb-4 hover:cursor-pointer`}
              key={tag.slug}
              onClick={() => {
                (setStateTag(tag.slug), handleFiltre(tag.slug));
              }}
            >
              #{tag.slug}
            </button>
          ))}
        </div>
        <button
          className="text-xs hover:cursor-pointer text-center text-amber-600 font-bold mb-4"
          onClick={() => {
            (setStateTag(""), setListMemo(memo));
          }}
        >
          Effacer les filtres
        </button>
      </div>
      <div className="w-full h-[70%] overflow-y-scroll">
        {memo.length > 0 ? (
          <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <h3 className="mt-4 mb-2">Snippet :</h3>
                <CodeBlock code={memo.snippet} />
                <h3 className=" text-xs mt-4 mb-2">Notes :</h3>
                <p className="text-justify mt-6 text-xs">{memo.notes}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center text-gray-300 font-mono">
            <h1>Aucun memo dans cet section !</h1>
          </div>
        )}
      </div>
    </div>
  );
}
