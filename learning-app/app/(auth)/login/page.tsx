"use client";

import { signIn } from "next-auth/react";

import { FaGoogle } from "react-icons/fa";

import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-gray-300">
      <h1 className="text-5xl font-mono mb-10">Bienvenu sur Learning App</h1>

      <h3>Choisis ta méthode de connexion: </h3>

      <section className="flex flex-col">
        <div
          className="w-80 h-20 rounded-xl flex items-center justify-evenly p-4 border-black border-2 mb-10 mt-4 hover:bg-gray-200 hover:cursor-pointer"
          onClick={() => signIn("google", { callbackUrl: "/accueil" })}
        >
          <h3 className="text-xl font-bold">Google</h3>

          <FaGoogle />
        </div>

        <div
          className="w-80 h-20 rounded-xl flex items-center justify-evenly p-4 border-black border-2 mb-10 mt-4 hover:bg-gray-200 hover:cursor-pointer"
          onClick={() => signIn("github", { callbackUrl: "/accueil" })}
        >
          <h3 className="text-xl font-bold">GitHub</h3>

          <FaGithub />
        </div>
      </section>
    </div>
  );
}
