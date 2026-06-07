"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <p>Impossible de charger la page memo.</p>
      <button onClick={reset}>Réessayer</button>
    </div>
  );
}
