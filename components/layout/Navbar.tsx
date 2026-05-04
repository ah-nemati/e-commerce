import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../types";
import Profile from "../Profile";
import { ThemeToggle } from "../ThemeToggle";

export const Navbar = () => {
  const cart = useSelector((state: State) => state.cart);
  const [searchValue, setSearchValue] = useState("");

  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setParams((prev) => ({
        ...prev,
        search: searchValue,
        page: 1,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = new URLSearchParams({
          search: params.search,
          page: String(params.page),
          limit: String(params.limit),
        }).toString();

        await fetch(`/api/products?${query}`);
      } catch (e) {}
    };

    fetchProducts();
  }, [params]);

  return (
    <>
      <div className="flex flex-col shadow-md border-b sticky dark:border-slate-700 dark:bg-slate-900 dark:text-white bg-white top-0 z-20">
        <div className="flex items-center dark:bg-slate-900 dark:text-white bg-white h-20 w-full px-8">
          <Link href={"/"} passHref legacyBehavior>
            <div className="flex items-center gap-2 md:ml-10 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-orange-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-base text-orange-500">فروشگاه</h1>
                <h3 className="text-xs text-gray-500 dark:text-white">
                  market
                </h3>
              </div>
            </div>
          </Link>

          <div className="md:flex items-center hidden dark:text-white dark:bg-slate-800 bg-dark w-5/12 rounded-md px-2">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-gray-400 dark:stroke-white h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="outline-none h-12 px-2 bg-dark dark:placeholder-white dark:text-white dark:bg-slate-800 w-full"
              placeholder="جستجو در بازار"
            />
          </div>

          <div className="md:w-5/12 w-2/3 flex gap-6 justify-end items-center absolute left-8">
            <Profile />
            <div className="w-[1.5px] h-5 bg-gray-400"></div>

            <Link href={"/cart"} passHref legacyBehavior>
              <button className="flex flex-col items-center dark:text-white text-gray-600 gap-1 text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </Link>

            <span className="absolute text-xs flex justify-center items-center dark:border-none text-white bg-orange-500 w-7 h-7 left-[63px] md:-top-[3px] -top-[10px] border-white border-4 rounded-full">
              {Array.isArray(cart) ? cart.length : 0}
            </span>
            <ThemeToggle />
          </div>
        </div>

        <div className="md:hidden items-center flex dark:text-white dark:bg-slate-800 bg-dark w-10/12 rounded-md mx-auto px-2 mb-4 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-gray-400 dark:stroke-white h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="outline-none h-12 px-2 dark:placeholder-white dark:text-white dark:bg-slate-800 bg-dark w-full"
            placeholder="جستجو در بازار"
          />
        </div>
      </div>
    </>
  );
};
