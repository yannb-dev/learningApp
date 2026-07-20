"use client";

export default function Error({
  error,
  reset,
}: {
  error: React.ReactNode;
  reset: () => void;
}) {
  return (
    <div>
      <p>Impossible de charger la page de connexion.</p>
      <button onClick={reset}>Réessayer</button>
    </div>
  );
}
