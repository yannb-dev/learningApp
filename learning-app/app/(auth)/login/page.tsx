"use client";

import LoadingAnim from "@/app/(app)/components/LoadingAnim";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { FaGoogle } from "react-icons/fa";

import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (type: string) => {
    setLoading(true);
    await signIn(type, { callbackUrl: "/accueil" });
    setLoading(false);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-gray-300">
      {loading ? (
        <div>
          <LoadingAnim />
        </div>
      ) : (
        <div>
          <h1 className="text-5xl font-mono mb-10">
            Bienvenu sur Learning App
          </h1>

          <h3>Connectes toi avec GitHub : </h3>

          <section className="flex flex-col">
            <button
              className="w-80 h-20 rounded-xl flex items-center justify-evenly p-4 border-black border-2 mb-10 mt-4 hover:bg-gray-200 hover:cursor-pointer"
              onClick={() => handleSignIn("github")}
            >
              <h3 className="text-xl font-bold">GitHub</h3>

              <FaGithub />
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
