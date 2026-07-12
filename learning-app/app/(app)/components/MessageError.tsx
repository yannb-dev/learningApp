"use client";

export default function MessageError({ error, reset }) {
  return (
    <div className="h-screen w-full flex flex-col items center justify-center font-mono text-gray-300">
      <h1 className="font-bold text-xl">
        Oups... Erreur lors du chargement {error} !
      </h1>
      <button
        className="p rounded-sm bg-amber-600 mt-12 hover:scale-105 hover:cursor-pointer"
        onClick={reset}
      >
        Réessayer
      </button>
    </div>
  );
}
