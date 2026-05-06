import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../types";
import Profile from "../../Profile";
import { ThemeToggle } from "../../Theme/ThemeToggle";
import { useDebounce } from "./hooks/useDebounce";
import SearchInput from "./SearchInput";
import CartIcon from "./CartIcon";

export const Navbar = () => {
  const cart = useSelector((state: State) => state.cart);

  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debouncedSearch) return;

    const query = new URLSearchParams({
      search: debouncedSearch,
      page: "1",
      limit: "10",
    }).toString();

    fetch(`/api/products?${query}`).catch(() => {});
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col shadow-md border-b sticky dark:border-slate-700 dark:bg-slate-900 dark:text-white bg-white top-0 z-20">
      {/* TOP BAR */}
      <div className="flex items-center h-20 w-full px-8">
        {/* LOGO */}
        <Link href="/">
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
              <h3 className="text-xs text-gray-500 dark:text-white">market</h3>
            </div>
          </div>
        </Link>

        {/* SEARCH DESKTOP */}
        <SearchInput value={searchValue} setValue={setSearchValue} />

        {/* RIGHT SIDE */}
        <div className="md:w-5/12 w-2/3 flex gap-6 justify-end items-center absolute left-8">
          <Profile />

          <div className="w-[1.5px] h-5 bg-gray-400" />

          {/* CART */}
          <Link href="/cart">
            <button className="flex flex-col items-center dark:text-white text-gray-600 gap-1 text-base">
              <CartIcon />
            </button>
          </Link>

          <span className="absolute text-xs flex justify-center items-center text-white bg-orange-500 w-7 h-7 left-[63px] md:-top-[3px] -top-[10px] border-white border-4 rounded-full">
            {Array.isArray(cart) ? cart.length : 0}
          </span>

          <ThemeToggle />
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="md:hidden flex items-center dark:bg-slate-800 bg-dark w-10/12 rounded-md mx-auto px-2 mb-4">
        <SearchInput value={searchValue} setValue={setSearchValue} />
      </div>
    </div>
  );
};
