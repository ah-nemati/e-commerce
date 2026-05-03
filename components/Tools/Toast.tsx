import { useEffect, useState } from "react";
import React from "react";

interface ToastProps {
  msg: string;
  bg: string;
  color: string;
  handelShow: () => void;
  svg: React.ReactNode;
  IsShow: boolean;
}

export const Toast: React.FC<ToastProps> = ({ msg, bg, color, handelShow, svg, IsShow }) => {
  if (!IsShow) return null;

  return (
    <div
      className="flex justify-between fixed z-10
     md:p-3 md:text-lg p-3 text-sm rounded-md m-6 shadow-sm
     animate-[wiggle_.3s_ease-in-out]
     "
      style={{
        color: `${color}`,
        backgroundColor: `${bg}`,
      }}
    >
      <div className="flex pl-6">
        {svg}
        <span className="px-2">{msg}</span>
      </div>
      <button onClick={handelShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
