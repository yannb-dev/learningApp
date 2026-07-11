"use client";

import { useState } from "react";

export default function Toogle() {
  const [stateToogle, setStateToogle] = useState(false);

  const toogle = () => {
    setStateToogle(!stateToogle);
  };
  return (
    <button
      onClick={toogle}
      className={`h-5 w-11 flex ${stateToogle ? "justify-start" : "justify-end"}  items-center rounded-[10px] p-px bg-white`}
    >
      <div className="h-4.5 w-4.5 rounded-[9px] bg-black"></div>
    </button>
  );
}
