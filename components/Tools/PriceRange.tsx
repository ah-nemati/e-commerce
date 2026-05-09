import React, { FC, ChangeEvent, useEffect, useState } from "react";

type Props = {
  min: number;
  max: number;
  onChange?: (min: number, max: number) => void;
};

const MAX_PRICE = 100_000_000;
const MIN_PRICE = 0;
const MIN_GAP = 500_000;

const formatPrice = (num: number) => {
  return num.toLocaleString("fa-IR");
};

const parsePrice = (value: string) => {
  return Number(
    value
      .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1728))
      .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
      .replace(/[^\d]/g, ""),
  );
};

export const PriceRange: FC<Props> = ({ min, max, onChange }) => {
  const [minInput, setMinInput] = useState("");

  const [maxInput, setMaxInput] = useState("");

  const [editingMin, setEditingMin] = useState(false);

  const [editingMax, setEditingMax] = useState(false);

  const minPct = (min / MAX_PRICE) * 100;

  const maxPct = (max / MAX_PRICE) * 100;

  const trackStyle = {
    background: `linear-gradient(to left,
      #e5e7eb ${minPct}%,
      #f97316 ${minPct}%,
      #f97316 ${maxPct}%,
      #e5e7eb ${maxPct}%)`,
  };

  const handleMinSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), max - MIN_GAP);

    onChange?.(value, max);
  };

  const handleMaxSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), min + MIN_GAP);

    onChange?.(min, value);
  };

  const commitMin = () => {
    let value = parsePrice(minInput);

    value = Math.max(MIN_PRICE, Math.min(value, max - MIN_GAP));

    onChange?.(value, max);

    setEditingMin(false);
  };

  const commitMax = () => {
    let value = parsePrice(maxInput);

    value = Math.min(MAX_PRICE, Math.max(value, min + MIN_GAP));

    onChange?.(min, value);

    setEditingMax(false);
  };

  useEffect(() => {
    if (!editingMin) {
      setMinInput(formatPrice(min));
    }
  }, [min, editingMin]);

  useEffect(() => {
    if (!editingMax) {
      setMaxInput(formatPrice(max));
    }
  }, [max, editingMax]);

  return (
    <div className="flex w-full flex-col gap-5" dir="rtl">
      {/* INPUTS */}
      <div className="flex w-full items-center gap-3">
        {/* MIN */}
        <div className="flex w-full min-w-0 flex-col gap-1">
          <label className="text-xs text-gray-400 dark:text-slate-500">
            از
          </label>

          <div className="flex w-full items-center gap-1 rounded-lg border border-gray-200 bg-transparent px-2 py-1.5 transition-colors focus-within:border-orange-400 dark:border-slate-600 dark:focus-within:border-orange-400">
            <input
              type="text"
              inputMode="numeric"
              className="w-full min-w-0 bg-transparent text-left text-xs font-semibold text-gray-800 outline-none dark:text-white"
              value={editingMin ? minInput : formatPrice(min)}
              onFocus={() => {
                setEditingMin(true);
                setMinInput(String(min));
              }}
              onChange={(e) => setMinInput(e.target.value)}
              onBlur={commitMin}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  commitMin();
                }
              }}
            />

            <span className="shrink-0 text-xs text-gray-400 dark:text-slate-500">
              ت
            </span>
          </div>
        </div>

        <span className="mt-5 shrink-0 text-sm text-gray-300 dark:text-slate-600">
          —
        </span>

        {/* MAX */}
        <div className="flex w-full min-w-0 flex-col gap-1">
          <label className="text-xs text-gray-400 dark:text-slate-500">
            تا
          </label>

          <div className="flex w-full items-center gap-1 rounded-lg border border-gray-200 bg-transparent px-2 py-1.5 transition-colors focus-within:border-orange-400 dark:border-slate-600 dark:focus-within:border-orange-400">
            <input
              type="text"
              inputMode="numeric"
              className="w-full min-w-0 bg-transparent text-left text-xs font-semibold text-gray-800 outline-none dark:text-white"
              value={editingMax ? maxInput : formatPrice(max)}
              onFocus={() => {
                setEditingMax(true);
                setMaxInput(String(max));
              }}
              onChange={(e) => setMaxInput(e.target.value)}
              onBlur={commitMax}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  commitMax();
                }
              }}
            />

            <span className="shrink-0 text-xs text-gray-400 dark:text-slate-500">
              ت
            </span>
          </div>
        </div>
      </div>

      {/* RANGE */}
      <div className="relative mt-2 px-1">
        <div className="relative flex w-full items-center">
          {/* TRACK */}
          <div
            className="absolute h-1.5 w-full rounded-full"
            style={trackStyle}
          />

          {/* MIN RANGE */}
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={MIN_GAP}
            value={min}
            onChange={handleMinSlider}
            className="range-thumb absolute z-30 w-full appearance-none bg-transparent outline-none"
          />

          {/* MAX RANGE */}
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={MIN_GAP}
            value={max}
            onChange={handleMaxSlider}
            className="range-thumb absolute z-20 w-full appearance-none bg-transparent outline-none"
          />
        </div>

        {/* LABELS */}
        <div className="mt-6 flex justify-between text-xs text-gray-400 dark:text-slate-500">
          <span>۰</span>
          <span>{formatPrice(MAX_PRICE / 2)}</span>
          <span>{formatPrice(MAX_PRICE)}</span>
        </div>
      </div>

      {/* RESULT */}
      <div className="mt-2 flex items-center justify-center">
        <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-3 w-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          {formatPrice(min)} — {formatPrice(max)} تومان
        </span>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .range-thumb {
          pointer-events: none;
          height: 18px;
        }

        .range-thumb::-webkit-slider-thumb {
          pointer-events: auto;
          -webkit-appearance: none;

          width: 18px;
          height: 18px;

          border-radius: 9999px;

          background: #f97316;
          border: 2px solid white;

          cursor: pointer;

          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);

          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease;
        }

        .range-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);

          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.15);
        }

        .range-thumb::-moz-range-thumb {
          pointer-events: auto;

          width: 18px;
          height: 18px;

          border-radius: 9999px;

          background: #f97316;
          border: 2px solid white;

          cursor: pointer;

          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }

        .range-thumb::-webkit-slider-runnable-track {
          background: transparent;
        }

        .range-thumb::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};
