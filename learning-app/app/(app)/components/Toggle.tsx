"use client";

import { useState } from "react";

export default function Toogle() {
  const [stateToogle, setStateToogle] = useState(false);

  const toogle = () => {
    setStateToogle(!stateToogle);
  };
  return (
    <div
      onClick={toogle}
      className={`h-[20px] w-[44px] flex ${stateToogle ? "justify-start" : "justify-end"}  items-center rounded-[10px] p-[1px] bg-white`}
    >
      <div className="h-[18px] w-[18px] rounded-[9px] bg-black"></div>
    </div>
  );
}
