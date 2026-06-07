"use client";

import { signOut } from "next-auth/react";

export default function BtnLogOut() {
  console.log("Clique de déconnexion");

  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: "/login" })}>
        Deconnexion
      </button>
    </div>
  );
}
