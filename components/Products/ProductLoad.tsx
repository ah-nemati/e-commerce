import React from "react";

const LoadCard: React.FC = () => (
  <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-1.5">
    <div className="flex flex-col bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden">
      <div className="aspect-square bg-gray-100 dark:bg-slate-800 animate-pulse" />
      <div className="flex flex-col gap-3 p-4">
        <div className="w-16 h-5 bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        <div className="flex flex-col gap-1.5">
          <div className="w-full h-4 bg-gray-100 dark:bg-slate-800 rounded animate-pulse" />
          <div className="w-3/4 h-4 bg-gray-100 dark:bg-slate-800 rounded animate-pulse" />
        </div>
        <div className="w-24 h-3 bg-gray-100 dark:bg-slate-800 rounded animate-pulse" />
        <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-slate-800">
          <div className="w-20 h-5 bg-gray-100 dark:bg-slate-800 rounded animate-pulse" />
          <div className="w-20 h-8 bg-gray-100 dark:bg-slate-800 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

export const ProductLoad: React.FC = () => (
  <>
    {Array.from({ length: 8 }).map((_, i) => (
      <LoadCard key={i} />
    ))}
  </>
);
