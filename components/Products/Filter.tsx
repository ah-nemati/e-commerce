import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetFilter } from "../../Store/Actions";
import { PriceRange } from "../Tools/PriceRange";
import { State, Product } from "../../Store/types";

const Filter: React.FC = () => {
  const [showBrandBtn, setshowBrandBtn] = useState<boolean>(true);
  const [displayBrand, setdisplaybrand] = useState<string>("none");
  const [showRangeBtn, setshowRangeBtn] = useState<boolean>(true);
  const [displayRange, setdisplayRange] = useState<string>("none");
  const [brand, setBrand] = useState<string[]>([]);

  const dispatch = useDispatch();

  const { product, theme } = useSelector((state: State) => state);

  const handelShowBrand = (): void => {
    setshowBrandBtn(!showBrandBtn);
  };

  const handelShowRange = (): void => {
    setshowRangeBtn(!showRangeBtn);
  };
  const saveBrandName = (str: string): void => {
    brand.includes(str)
      ? setBrand(brand.filter((item) => item != str))
      : setBrand([...brand, str]);
  };
  useEffect(() => {
    if (showBrandBtn) {
      setdisplaybrand("none");
    } else setdisplaybrand("flex");
  }, [showBrandBtn]);

  useEffect(() => {
    if (showRangeBtn) {
      setdisplayRange("none");
    } else setdisplayRange("flex");
  }, [showRangeBtn]);

  useEffect(() => {
    if (Array.isArray(product)) {
      dispatch(
        SetFilter(
          product.filter((item: Product) => brand.includes(item.name))
        )
      );
    }
  }, [brand]);

  const [IsMobile, setIsMobile] = useState<boolean>(false);
  const [IsLaptop, setIsLaptop] = useState<boolean>(false);
  const [IsOther, setIsOther] = useState<boolean>(false);
  const [IsAll, setIsAll] = useState<boolean>(true);

  return (
    <div
      className="flex dark:bg-slate-900 dark:text-white bg-white flex-col gap-4 w-full ml-4 rounded-md p-6 text-gray-700
    text-lg"
    >
      <h1 className="text-2xl text-orange-600">دسته بندی</h1>
      <button
        className="flex gap-2 relative text-gray-400 rounded-sm hover:bg-gray-50 dark:hover:bg-slate-600 p-1
        text-base"
        style={{
          color: IsAll
            ? theme == "dark"
              ? "white"
              : "#374151"
            : "rgb(107,114,128)",
          fontWeight: IsAll ? "bold" : "normal",
        }}
        onClick={() => {
          if (Array.isArray(product)) {
            dispatch(SetFilter(product.filter((item: Product) => item)));
            setIsMobile(false);
            setIsLaptop(false);
            setIsOther(false);
            setIsAll(true);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 z-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        <span className="absolute dark:bg-slate-300 bg-gray-100 w-6 h-6 rounded-full -right-[8px] -top-[8px]"></span>
        همه محصولات
      </button>
      <button
        className="flex gap-2 relative text-gray-400 rounded-sm hover:bg-gray-50 dark:hover:bg-slate-600 p-1
        text-base"
        style={{
          color: IsMobile
            ? theme == "dark"
              ? "white"
              : "#374151"
            : "rgb(107,114,128)",
          fontWeight: IsMobile ? "bold" : "normal",
        }}
        onClick={() => {
          if (Array.isArray(product)) {
            dispatch(
              SetFilter(
                product.filter(
                  (item: any) => item.data_layer.category === "گوشی موبایل"
                )
              )
            );
            setIsMobile(true);
            setIsLaptop(false);
            setIsOther(false);
            setIsAll(false);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 z-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          ></path>
        </svg>
        <span className="absolute dark:bg-slate-300 bg-gray-100 w-6 h-6 rounded-full -right-[8px] -top-[8px]"></span>
        تلفن همراه
      </button>
      <button
        className="flex gap-2 relative text-gray-400 rounded-sm hover:bg-gray-50 dark:hover:bg-slate-600 p-1 
    text-base"
        style={{
          color: IsLaptop
            ? theme == "dark"
              ? "white"
              : "#374151"
            : "rgb(107,114,128)",
          fontWeight: IsLaptop ? "bold" : "normal",
        }}
        onClick={() => {
          if (Array.isArray(product)) {
            dispatch(
              SetFilter(
                product.filter(
                  (item: any) => item.data_layer.category === "لپ تاپ و الترابوک"
                )
              )
            );
            setIsMobile(false);
            setIsLaptop(true);
            setIsOther(false);
            setIsAll(false);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 z-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
        <span className="absolute dark:bg-slate-300 bg-gray-100 w-6 h-6 rounded-full -right-[9px] -top-[9px]"></span>
        لپ تاپ
      </button>
      <button
        className="flex gap-2 relative text-gray-400 hover:bg-gray-50 rounded-sm dark:hover:bg-slate-600 p-1 text-base"
        style={{
          color: IsOther
            ? theme == "dark"
              ? "white"
              : "#374151"
            : "rgb(107,114,128)",
          fontWeight: IsOther ? "bold" : "normal",
        }}
        onClick={() => {
          if (Array.isArray(product)) {
            dispatch(
              SetFilter(
                product.filter(
                  (item: any) =>
                    item.data_layer.category !== "لپ تاپ و الترابوک" &&
                    item.data_layer.category !== "گوشی موبایل"
                )
              )
            );
            setIsMobile(false);
            setIsLaptop(false);
            setIsOther(true);
            setIsAll(false);
          }
        }}
      >
        <span className="w-5 h-5 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </span>
        <span className="absolute dark:bg-slate-300 bg-gray-100 w-6 h-6 rounded-full -right-[7px] -top-[7px]"></span>
        سایر
      </button>

      <h1 className="text-2xl text-orange-600 mt-6">فیلتر</h1>
      <button
        className="flex justify-between dark:text-white text-gray-700 dark:hover:bg-slate-600 hover:bg-gray-50
         rounded-md pt-2"
        onClick={handelShowBrand}
      >
        <span className="flex gap-2 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="absolute dark:bg-slate-300 bg-gray-100 w-5 h-5 rounded-full -right-[10px] -top-[10px]"></span>
          برند
        </span>
        {showBrandBtn ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transition-all duration-500 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}
      </button>
      <ul
        className="flex-col text-base gap-2 h-48 overflow-y-scroll"
        style={{ display: displayBrand }}
      >
        <button className="flex items-center gap-6 border-b p-2">
          <input
            onClick={() => saveBrandName("اپل")}
            type="checkbox"
            className="scale-150"
          />
          <span>اپل</span>
        </button>
        <li className="flex items-center gap-6 border-b p-2">
          <input
            onClick={() => saveBrandName("سامسونگ")}
            type="checkbox"
            className="scale-150"
          />{" "}
          <span>سامسونگ</span>
        </li>
        <li className="flex items-center gap-6 border-b p-2">
          <input
            onClick={() => saveBrandName("شیائومی")}
            type="checkbox"
            className="scale-150"
          />{" "}
          <span>شیائومی</span>
        </li>
        <li className="flex items-center gap-6 border-b p-2">
          <input
            onClick={() => saveBrandName("ایسوس")}
            type="checkbox"
            className="scale-150"
          />{" "}
          <span>ایسوس</span>
        </li>
        <li className="flex items-center gap-6 border-b p-2">
          <input
            onClick={() => saveBrandName("لنوو")}
            type="checkbox"
            className="scale-150"
          />{" "}
          <span>لنوو</span>
        </li>
      </ul>
      <button
        className="flex justify-between pt-2 dark:text-white text-gray-700 dark:hover:bg-slate-600 hover:bg-gray-50 rounded-md"
        onClick={handelShowRange}
      >
        <span className="flex gap-2 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="absolute dark:bg-slate-300 bg-gray-100 w-5 h-5 rounded-full -right-[8px] -top-[8px]"></span>
          محدوده قیمت
        </span>
        {showRangeBtn ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transition-all duration-500 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}
      </button>
      <div style={{ display: displayRange }} className="flex flex-col gap-2">
        <PriceRange />
      </div>
    </div>
  );
};

export default Filter;