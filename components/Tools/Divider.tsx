import React from "react";

const Divider = ({ text }: { text: string }) => {
  return (
    <div className="relative flex justify-center">
      <h3 className="text-xs text-gray-400 z-10 bg-white dark:bg-slate-900 px-3">
        {text}
      </h3>
      <i className="absolute top-1/2 transform -translate-y-1/2 w-full border-t border-gray-500 border-opacity-30"></i>
    </div>
  );
};

export default Divider;
