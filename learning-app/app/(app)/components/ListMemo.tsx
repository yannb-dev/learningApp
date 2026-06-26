"use client";

import { useState } from "react";

export default function ListMemo({ memo }) {
  const arrayTag = [];

  memo.map((memo) => {
    memo.tags.map((tag) => {
      const includeArray = arrayTag.some((a) => a.slug === tag.slug);

      if (!includeArray) {
        arrayTag.push({ slug: tag.slug });
      }
    });
  });

  return (
    <div>
      <div>
        <input
          className="h-10 rounded-xl bg-gray-200 p-2"
          type="text"
          placeholder="Recherche un mémo"
        />
        <div className="flex mt-6 mb-6">
          {arrayTag.map((tag) => (
            <div
              className="p-2 bg-blue-500 text-white rounded-xl mr-4"
              key={tag.slug}
            >
              #{tag.slug}
            </div>
          ))}
        </div>
      </div>
      {memo.length > 0 ? (
        <div className="">
          {memo.map((memo) => (
            <div key={memo.id}>{memo.topic}</div>
          ))}
        </div>
      ) : (
        <h1>Aucun memo</h1>
      )}
    </div>
  );
}
