import React, { useCallback, useState } from "react";
import { PriceRange } from "../Tools/PriceRange";

type Props = {
  params: any;
  setParams: React.Dispatch<React.SetStateAction<any>>;
};

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100_000_000;

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
    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
      open ? "rotate-180" : ""
    }`}
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

  // Helper function to check if price filter is active
  const hasActivePriceFilter = (): boolean => {
    const currentMin =
      typeof params.minPrice === "number"
        ? params.minPrice
        : Number(params.minPrice) || DEFAULT_MIN;

    const currentMax =
      typeof params.maxPrice === "number"
        ? params.maxPrice
        : Number(params.maxPrice) || DEFAULT_MAX;

    return currentMin !== DEFAULT_MIN || currentMax !== DEFAULT_MAX;
  };

  const hasActiveFilters =
    !!params.category || selectedBrands.length > 0 || hasActivePriceFilter();

  const handleCategory = (value: string) => {
    setParams((prev: any) => ({
      ...prev,
      category: value,
      page: 1,
    }));
  };

  const handleBrand = (brand: string) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((x) => x !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(next);

    setParams((prev: any) => ({
      ...prev,
      brand: next.join(","),
      page: 1,
    }));
  };

  const handlePrice = useCallback(
    (min: number, max: number) => {
      setParams((prev: any) => ({
        ...prev,
        minPrice: min,
        maxPrice: max,
        page: 1,
      }));
    },
    [setParams],
  );

  const resetAll = () => {
    setSelectedBrands([]);

    setParams((prev: any) => ({
      ...prev,
      category: "",
      brand: "",
      minPrice: DEFAULT_MIN,
      maxPrice: DEFAULT_MAX,
      page: 1,
    }));
  };

  return (
    <div
      dir="rtl"
      className="ml-4 flex w-full flex-col gap-1 overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-slate-800">
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

          <span className="text-sm font-bold text-gray-800 dark:text-white">
            فیلترها
          </span>

          {hasActiveFilters && (
            <span className="h-2 w-2 rounded-full bg-orange-500" />
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetAll}
            className="text-xs font-medium text-orange-500 hover:text-orange-600"
          >
            پاک کردن
          </button>
        )}
      </div>

      {/* CATEGORIES */}
      <div className="border-b border-gray-100 px-4 py-3 dark:border-slate-800">
        <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
          دسته‌بندی
        </p>

        <div className="flex flex-col gap-0.5">
          {CATEGORIES.map((cat) => {
            const active = params.category === cat.value;

            return (
              <button
                key={cat.value}
                onClick={() => handleCategory(cat.value)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm transition-all ${
                  active
                    ? "bg-orange-500 font-semibold text-white"
                    : "text-gray-600 hover:bg-gray-50 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 shrink-0 ${
                    active ? "text-white" : "text-gray-400 dark:text-slate-500"
                  }`}
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

      {/* BRANDS */}
      <div className="border-b border-gray-100 dark:border-slate-800">
        <button
          onClick={() => setBrandOpen((v) => !v)}
          className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span className="flex items-center gap-2">
            برند
            {selectedBrands.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[11px] font-bold text-white">
                {selectedBrands.length}
              </span>
            )}
          </span>

          <ChevronIcon open={brandOpen} />
        </button>

        {brandOpen && (
          <div className="flex flex-col gap-1 px-4 pb-4">
            {BRANDS.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                <div
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-all ${
                    selectedBrands.includes(brand)
                      ? "border-orange-500 bg-orange-500"
                      : "border-gray-300 dark:border-slate-600"
                  }`}
                  onClick={() => handleBrand(brand)}
                >
                  {selectedBrands.includes(brand) && (
                    <svg
                      className="h-2.5 w-2.5 text-white"
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
                  {brand}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* PRICE */}
      <div>
        <button
          onClick={() => setPriceOpen((v) => !v)}
          className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span className="flex items-center gap-2">
            محدوده قیمت
            {hasActivePriceFilter() && (
              <span className="h-2 w-2 rounded-full bg-orange-500" />
            )}
          </span>

          <ChevronIcon open={priceOpen} />
        </button>

        {priceOpen && (
          <div className="px-5 pb-5">
            <PriceRange
              min={
                typeof params.minPrice === "number"
                  ? params.minPrice
                  : Number(params.minPrice) || DEFAULT_MIN
              }
              max={
                typeof params.maxPrice === "number"
                  ? params.maxPrice
                  : Number(params.maxPrice) || DEFAULT_MAX
              }
              onChange={handlePrice}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
