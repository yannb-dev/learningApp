"use client";

import { IoLogOut } from "react-icons/io5";

import { signOut } from "next-auth/react";

export default function BtnLogOut() {
  return (
    <div className="hidden md:flex md:mb-10 mt-2 justify-end p-2">
      <button
        className="h-8 w-8 md:h-12 md:w-12 flex justify-center items-center rounded-[50%] bg-black hover:scale-110 hover:cursor-pointer"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        <IoLogOut className="text-white text-xl md:text-2xl" />
      </button>
    </div>
  );
}
