import React, {
  useEffect,
  useState,
  FC,
  ChangeEvent,
  useCallback,
} from "react";

type Props = {
  onChange?: (min: number, max: number) => void;
};

export const PriceRange: FC<Props> = ({ onChange }) => {
  const MAX_PRICE = 100000000;
  const MIN_GAP = 500000; // حداقل فاصله ۵۰۰ هزار تومان

  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(MAX_PRICE);

  const formatPrice = (num: number): string => {
    return num.toLocaleString("fa-IR");
  };

  const parsePrice = (str: string): number => {
    return Number(str.replace(/[^0-9]/g, "")) || 0;
  };

  const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parsePrice(e.target.value);
    if (value > maxValue - MIN_GAP) value = maxValue - MIN_GAP;
    if (value < 0) value = 0;
    setMinValue(value);
  };

  const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parsePrice(e.target.value);
    if (value < minValue + MIN_GAP) value = minValue + MIN_GAP;
    if (value > MAX_PRICE) value = MAX_PRICE;
    setMaxValue(value);
  };

  // هندلر اسلایدر
  const handleMinSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value > maxValue - MIN_GAP) value = maxValue - MIN_GAP;
    setMinValue(value);
  };

  const handleMaxSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < minValue + MIN_GAP) value = minValue + MIN_GAP;
    setMaxValue(value);
  };

  // به‌روزرسانی بک‌گراند اسلایدر
  useEffect(() => {
    const sliderTrack = document.getElementById(
      "slider-track",
    ) as HTMLDivElement | null;
    if (!sliderTrack) return;

    const percent1 = (minValue / MAX_PRICE) * 100;
    const percent2 = (maxValue / MAX_PRICE) * 100;

    sliderTrack.style.background = `linear-gradient(to left, 
      #4b5563 ${percent1}%, 
      #22d3ee ${percent1}%, 
      #22d3ee ${percent2}%, 
      #4b5563 ${percent2}%)`;
  }, [minValue, maxValue]);

  // Debounce onChange
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange?.(minValue, maxValue);
    }, 350);
    return () => clearTimeout(timeout);
  }, [minValue, maxValue, onChange]);

  return (
    <>
      <div className="space-y-5">
        {/* از */}
        <div className="flex items-center justify-between">
          <span className="text-base text-gray-400 dark:text-gray-500">از</span>
          <input
            type="text"
            className="flex-1 mx-3 text-left text-sm font-bold p-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none dark:text-white"
            value={formatPrice(minValue)}
            onChange={handleMinInputChange}
          />
          <span className="text-base text-gray-400 dark:text-gray-500 whitespace-nowrap">
            تومان
          </span>
        </div>

        {/* تا */}
        <div className="flex items-center justify-between">
          <span className="text-base text-gray-400 dark:text-gray-500">تا</span>
          <input
            type="text"
            className="flex-1 mx-3 text-left text-sm font-bold p-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none dark:text-white"
            value={formatPrice(maxValue)}
            onChange={handleMaxInputChange}
          />
          <span className="text-base text-gray-400 dark:text-gray-500 whitespace-nowrap">
            تومان
          </span>
        </div>
      </div>

      {/* اسلایدر */}
      <div className="range mt-8 mb-8 relative">
        <div id="slider-track" className="h-2 w-full rounded-full relative" />

        <div className="relative mt-1">
          <input
            type="range"
            min="0"
            max={MAX_PRICE}
            value={minValue}
            onChange={handleMinSliderChange}
            className="absolute w-full accent-cyan-400 pointer-events-auto z-20"
          />
          <input
            type="range"
            min="0"
            max={MAX_PRICE}
            value={maxValue}
            onChange={handleMaxSliderChange}
            className="absolute w-full accent-cyan-400 pointer-events-auto z-20"
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-6">
          <span>ارزان‌ترین</span>
          <span>گران‌ترین</span>
        </div>
      </div>
    </>
  );
};
