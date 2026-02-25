import React, { useEffect, useState, FC, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetFilter } from "../../Store/Actions";
import { ProductType, State } from "../../types";

export const PriceRange: FC = () => {
  const [minvalue, setMinValue] = useState<number>(0);
  const [maxvalue, setMaxValue] = useState<number>(100000000);
  const minGap = 0;
  const dispatch = useDispatch();
  const products = useSelector((state: State) => state.products);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinValue(Number(e.target.value));
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxValue(Number(e.target.value));
  };

  useEffect(() => {
    if (maxvalue - minvalue < minGap) {
      setMinValue(maxvalue - minGap);
      setMaxValue(minvalue + minGap);
    }
console.log(products);

    // if (products) {
    //   dispatch(
    //     SetFilter(
    //       products?.filter(
    //         (item: ProductType) =>
    //           item.price / 10 <= maxvalue && item.price / 10 >= minvalue
    //       )
    //     )
    //   );
    // }

    const sliderTrack = document.getElementById("slider-track");
    if (sliderTrack) {
      const per1 = (minvalue / 100000000) * 100;
      const per2 = (maxvalue / 100000000) * 100;
      sliderTrack.style.background = `linear-gradient(to left, #e0e5e6 ${per1}%,#19bfd3 ${per1}%,#19bfd3 ${per2}%,#e0e5e6 ${per2}%)`;
    }
  }, [minvalue, maxvalue, products, dispatch, minGap]);

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-base">از</span>
        <input
          type="text"
          className="flex text-left text-sm outline-none shadow-none p-2 border-b dark:border-none dark:w-10/12 font-bold text-gray-800 rounded dark:bg-slate-800 dark:text-white w-11/12"
          onChange={handleMinChange}
          value={minvalue}
        />
        <span className="text-base mr-1">تومان</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-base">تا</span>
        <input
          type="text"
          className="flex text-left outline-none shadow-none p-2 border-b dark:border-none dark:w-10/12 font-bold text-sm text-gray-800 rounded dark:bg-slate-800 dark:text-white w-11/12"
          onChange={handleMaxChange}
          value={maxvalue}
        />
        <span className="text-base mr-1">تومان</span>
      </div>
      <div className="range mb-8">
        <div className="slider-track" id="slider-track"></div>
        <div className="wrapper">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100000000"
              value={minvalue}
              id="min-range"
              onChange={handleMinChange}
            />
            <input
              type="range"
              min="0"
              max="100000000"
              value={maxvalue}
              id="max-range"
              onChange={handleMaxChange}
            />
          </div>
          <div className="flex justify-between w-full text-xs text-gray-500 mt-3 pb-5">
            <span>ارزانترین</span>
            <span>گرانترین</span>
          </div>
        </div>
      </div>
    </>
  );
};
