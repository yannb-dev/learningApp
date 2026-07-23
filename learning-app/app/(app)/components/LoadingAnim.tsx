"use client";

import IconApp from "./IconApp";

export default function LoadingAnim() {
  return (
    <div className="h-50 w-50 relative flex items-center justify-center">
      <IconApp className=" w-30 h-30 text-gray-100" />
      <div className="h-50 w-50 absolute top-0 left-0 flex items-start justify-center animate-spin">
        <div className="h-4 w-4 rounded-[50%] bg-white"></div>
      </div>
    </div>
  );
}
