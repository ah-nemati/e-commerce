import React, { useCallback, useState } from "react";
import { PriceRange } from "../Tools/PriceRange";

type Props = {
  params: any;
  setParams: React.Dispatch<React.SetStateAction<any>>;
};

const CATEGORIES = [
  {
    value: "",
    label: "همه محصولات",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    ),
  },
  {
    value: "گوشی موبایل",
    label: "گوشی موبایل",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    ),
  },
  {
    value: "لپ تاپ و الترابوک",
    label: "لپ تاپ",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    value: "قطعات کامپیوتر",
    label: "قطعات کامپیوتر",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
      />
    ),
  },
  {
    value: "هدفون و هندزفری",
    label: "هدفون و هندزفری",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
      />
    ),
  },
];

const BRANDS = ["اپل", "سامسونگ", "شیائومی", "ایسوس", "لنوو", "متفرقه"];

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const Filter: React.FC<Props> = ({ params, setParams }) => {
  const [brandOpen, setBrandOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    params.brand ? params.brand.split(",").filter(Boolean) : [],
  );

  const handleCategory = (value: string) =>
    setParams((prev: any) => ({ ...prev, category: value, page: 1 }));

  const handleBrand = (b: string) => {
    const next = selectedBrands.includes(b)
      ? selectedBrands.filter((x) => x !== b)
      : [...selectedBrands, b];
    setSelectedBrands(next);
    setParams((prev: any) => ({
      ...prev,
      brand: next.join(","),
      page: 1,
    }));
  };

  const handlePrice = useCallback(
    (min: number, max: number) => {
      setParams((prev: any) => {
        if (prev.minPrice === String(min) && prev.maxPrice === String(max))
          return prev;
        return {
          ...prev,
          minPrice: String(min),
          maxPrice: String(max),
          page: 1,
        };
      });
    },
    [setParams],
  );

  const resetAll = () => {
    setSelectedBrands([]);
    setParams((prev: any) => ({
      ...prev,
      category: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      page: 1,
    }));
  };

  const hasActiveFilters =
    params.category ||
    selectedBrands.length > 0 ||
    params.minPrice ||
    params.maxPrice;

  return (
    <div
      dir="rtl"
      className="flex flex-col gap-1 w-full ml-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
            />
          </svg>
          <span className="font-bold text-gray-800 dark:text-white text-sm">
            فیلترها
          </span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-orange-500" />
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetAll}
            className="text-xs text-orange-500 hover:text-orange-600 font-medium"
          >
            پاک کردن
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-1">
          دسته‌بندی
        </p>
        <div className="flex flex-col gap-0.5">
          {CATEGORIES.map((cat) => {
            const active = params.category === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => handleCategory(cat.value)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-right ${
                  active
                    ? "bg-orange-500 text-white font-semibold"
                    : "text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 shrink-0 ${active ? "text-white" : "text-gray-400 dark:text-slate-500"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  {cat.icon}
                </svg>
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand accordion */}
      <div className="border-b border-gray-100 dark:border-slate-800">
        <button
          onClick={() => setBrandOpen((v) => !v)}
          className="flex items-center justify-between w-full px-5 py-4 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            برند
            {selectedBrands.length > 0 && (
              <span className="text-[11px] bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {selectedBrands.length}
              </span>
            )}
          </span>
          <ChevronIcon open={brandOpen} />
        </button>
        {brandOpen && (
          <div className="px-4 pb-4 flex flex-col gap-1">
            {BRANDS.map((b) => (
              <label
                key={b}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              >
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                    selectedBrands.includes(b)
                      ? "bg-orange-500 border-orange-500"
                      : "border-gray-300 dark:border-slate-600"
                  }`}
                  onClick={() => handleBrand(b)}
                >
                  {selectedBrands.includes(b) && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700 dark:text-slate-300">
                  {b}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range accordion */}
      <div>
        <button
          onClick={() => setPriceOpen((v) => !v)}
          className="flex items-center justify-between w-full px-5 py-4 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            محدوده قیمت
            {(params.minPrice || params.maxPrice) && (
              <span className="w-2 h-2 rounded-full bg-orange-500" />
            )}
          </span>
          <ChevronIcon open={priceOpen} />
        </button>
        {priceOpen && (
          <div className="px-5 pb-5">
            <PriceRange onChange={handlePrice} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
