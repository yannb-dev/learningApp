"use client";

import { Prisma } from "@/app/generated/prisma";

import { useState } from "react";

type Memo = Prisma.MemoGetPayload<{
  include: {
    tags: true;
  };
}>;

type Props = {
  memo: Memo[];
  tags: { slug: string }[];
};

export default function ListMemo({ memo, tags }: Props) {
  const [listMemo, setListMemo] = useState(memo);
  const [stateTag, setStateTag] = useState("");

  //____________ Filtre par tag ____________________
  const handleFiltre = (tag: string) => {
    setListMemo(
      memo.filter((m) => {
        m.tags.some((t) => t.slug === tag);
      }),
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div>
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
            (setStateTag(""), setListMemo(memo));
          }}
        >
          Effacer les filtres
        </h3>
      </div>
      {memo.length > 0 ? (
        <div className=" w-[90%] h-auto grid grid-cols-3 gap-4 ">
          {listMemo.map((memo) => (
            <div
              className="h-80 rounded-xl border-2 border-gray-400 bg-gray-100 p-4"
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
              <p className="text-justify mt-6">{memo.notes}</p>
            </div>
          ))}
        </div>
      ) : (
        <h1>Aucun memo</h1>
      )}
    </div>
  );
}
