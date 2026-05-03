import React from "react";

const LoadCard: React.FC = () => (
  <div
    className="flex sm:flex-col gap-8 dark:bg-slate-900 dark:border-slate-700 bg-white cursor-pointer items-center shadow-gray-700
    border md:w-1/3 xl:w-1/4 sm:w-1/2 p-2 hover:shadow-custom text-gray-800 relative "
  >
    {/* cartImage */}
    <div className="bg-gray-100 h-[40vh] sm:w-4/5 w-1/3 animate-pulse"></div>
    {/* bodyCart */}
    <div className="flex flex-col gap-4 sm:w-full w-2/3">
      {/* titleCart */}
      <div className="flex self-center text-xs sm:text-sm p-4 w-1/2 bg-gray-100 animate-pulse"></div>
      {/* rate */}
      <div className="flex gap-1 bg-gray-100 w-3/4 h-10 self-center animate-pulse"></div>
      {/* add to Cart */}
      <div className="flex justify-between text-sm bg-gray-100 h-10 w-10/12 self-center animate-pulse"></div>
    </div>
    {/* color */}
    <div className="w-2 h-auto flex flex-col absolute bottom-1 top-4 sm:left-2 gap-2">
      {}
    </div>
  </div>
);

export const ProductLoad: React.FC = () => {
  return (
    <>
      {[...Array(8)].map((_, index: number) => (
        <LoadCard key={index} />
      ))}
    </>
  );
};
