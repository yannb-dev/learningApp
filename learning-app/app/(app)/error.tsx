"use client";

export default function Error({ reset }) {
  return (
    <div>
      <p>Impossible de charger la page d'accueil.</p>
      <button onClick={reset}>Réessayer</button>
    </div>
  );
}
