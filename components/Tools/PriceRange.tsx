import React, {
  useEffect,
  useState,
  FC,
  ChangeEvent,
  useCallback,
  useId,
} from "react";
import PersianNumber from "../../hooks/PersianNumber";

type Props = {
  onChange?: (min: number, max: number) => void;
};

export const PriceRange: FC<Props> = ({ onChange }) => {
  const MAX_PRICE = 100_000_000;
  const MIN_GAP = 500_000;

  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(MAX_PRICE);
  const [minInput, setMinInput] = useState<string>("");
  const [maxInput, setMaxInput] = useState<string>("");
  const [editingMin, setEditingMin] = useState(false);
  const [editingMax, setEditingMax] = useState(false);

  const formatPrice = (num: number) => num.toLocaleString("fa-IR");
  const parsePrice = (str: string) => Number(str.replace(/[^0-9]/g, "")) || 0;

  const minPct = (minValue / MAX_PRICE) * 100;
  const maxPct = (maxValue / MAX_PRICE) * 100;
  const trackStyle = {
    background: `linear-gradient(to right,
      #e5e7eb ${minPct}%,
      #f97316 ${minPct}%,
      #f97316 ${maxPct}%,
      #e5e7eb ${maxPct}%)`,
  };

  // Debounced onChange
  useEffect(() => {
    const t = setTimeout(() => onChange?.(minValue, maxValue), 350);
    return () => clearTimeout(t);
  }, [minValue, maxValue, onChange]);

  /* ── Slider handlers ── */
  const handleMinSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const v = Math.min(Number(e.target.value), maxValue - MIN_GAP);
    setMinValue(v);
  };

  const handleMaxSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(Number(e.target.value), minValue + MIN_GAP);
    setMaxValue(v);
  };

  /* ── Text input handlers ── */
  const commitMin = () => {
    let v = parsePrice(minInput);
    v = Math.max(0, Math.min(v, maxValue - MIN_GAP));
    setMinValue(v);
    setEditingMin(false);
  };

  const commitMax = () => {
    let v = parsePrice(maxInput);
    v = Math.min(MAX_PRICE, Math.max(v, minValue + MIN_GAP));
    setMaxValue(v);
    setEditingMax(false);
  };

  return (
    <div className="flex flex-col gap-5" dir="rtl">
      {/* Price inputs */}
      <div className="flex items-center gap-2">
        {/* Min */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs text-gray-400 dark:text-slate-500">
            از
          </label>
          <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-lg px-2 py-1.5 focus-within:border-orange-400 dark:focus-within:border-orange-400 transition-colors bg-transparent">
            <input
              type="text"
              inputMode="numeric"
              className="flex-1 min-w-0 text-xs font-semibold bg-transparent outline-none text-gray-800 dark:text-white text-left"
              value={editingMin ? minInput : formatPrice(minValue)}
              onFocus={() => {
                setEditingMin(true);
                setMinInput(String(minValue));
              }}
              onChange={(e) => setMinInput(e.target.value)}
              onBlur={commitMin}
              onKeyDown={(e) => e.key === "Enter" && commitMin()}
            />
            <span className="text-xs text-gray-400 dark:text-slate-500 shrink-0 mr-1">
              ت
            </span>
          </div>
        </div>

        <span className="text-gray-300 dark:text-slate-600 text-sm mt-4">
          —
        </span>

        {/* Max */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs text-gray-400 dark:text-slate-500">
            تا
          </label>
          <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-lg px-2 py-1.5 focus-within:border-orange-400 dark:focus-within:border-orange-400 transition-colors bg-transparent">
            <input
              type="text"
              inputMode="numeric"
              className="flex-1 min-w-0 text-xs font-semibold bg-transparent outline-none text-gray-800 dark:text-white text-left"
              value={editingMax ? maxInput : formatPrice(maxValue)}
              onFocus={() => {
                setEditingMax(true);
                setMaxInput(String(maxValue));
              }}
              onChange={(e) => setMaxInput(e.target.value)}
              onBlur={commitMax}
              onKeyDown={(e) => e.key === "Enter" && commitMax()}
            />
            <span className="text-xs text-gray-400 dark:text-slate-500 shrink-0 mr-1">
              ت
            </span>
          </div>
        </div>
      </div>

      {/* Dual range slider */}
      <div className="relative px-1">
        {/* Track */}
        <div className="h-1.5 w-full rounded-full" style={trackStyle} />

        {/* Sliders — stacked, pointer-events managed via z-index */}
        <div className="relative" style={{ marginTop: "-0.45rem" }}>
          <input
            type="range"
            min={0}
            max={MAX_PRICE}
            step={MIN_GAP}
            value={minValue}
            onChange={handleMinSlider}
            className="range-thumb absolute w-full h-4 appearance-none bg-transparent cursor-pointer z-20"
            style={{ direction: "ltr" }}
          />
          <input
            type="range"
            min={0}
            max={MAX_PRICE}
            step={MIN_GAP}
            value={maxValue}
            onChange={handleMaxSlider}
            className="range-thumb absolute w-full h-4 appearance-none bg-transparent cursor-pointer z-20"
            style={{ direction: "ltr" }}
          />
        </div>

        {/* Labels */}
        <div className="flex justify-between text-xs text-gray-400 dark:text-slate-500 mt-6">
          <span>۰</span>
          <span>{formatPrice(MAX_PRICE / 2)}</span>
          <span>{formatPrice(MAX_PRICE)}</span>
        </div>
      </div>

      {/* Selected range pill */}
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center gap-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-medium px-3 py-1.5 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          {formatPrice(minValue)} — {formatPrice(maxValue)} تومان
        </span>
      </div>

      <style jsx>{`
        .range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #f97316;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition:
            transform 0.1s,
            box-shadow 0.1s;
        }
        .range-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.15);
        }
        .range-thumb::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #f97316;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
