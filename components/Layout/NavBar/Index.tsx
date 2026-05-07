import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../types";
import Profile from "../../Profile";
import { ThemeToggle } from "../../Theme/ThemeToggle";
import { useDebounce } from "./hooks/useDebounce";
import CartIcon from "./CartIcon";

export const Navbar = () => {
  const cart = useSelector((state: State) => state.cart);
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const debouncedSearch = useDebounce(searchValue, 450);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("product-search", { detail: debouncedSearch }),
    );
  }, [debouncedSearch]);

  const cartCount = Array.isArray(cart) ? cart.length : 0;

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm"
    >
      <div className="flex items-center h-16 px-4 md:px-8 gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-200 dark:shadow-orange-900/40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-black text-sm text-orange-500 tracking-tight">
                فروشگاه
              </span>
              <span className="text-[10px] text-gray-400 dark:text-slate-500">
                market
              </span>
            </div>
          </div>
        </Link>

        {/* Search — desktop */}
        <div className="hidden md:flex flex-1 max-w-xl mx-auto">
          <div className="relative w-full group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
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
              placeholder="جستجو در فروشگاه..."
              className="w-full h-10 pr-10 pl-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-orange-400 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 mr-auto">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="md:hidden p-2 text-gray-500 dark:text-slate-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <Profile />

          <div className="w-px h-5 bg-gray-200 dark:bg-slate-700 hidden sm:block" />

          {/* Cart */}
          <Link href="/cart">
            <button className="relative p-2 text-gray-600 dark:text-slate-300 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -left-0.5 min-w-[18px] h-[18px] text-[10px] font-bold flex items-center justify-center bg-orange-500 text-white rounded-full px-1 border-2 border-white dark:border-slate-900">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>

          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 border-t border-gray-100 dark:border-slate-800 pt-3">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
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
              placeholder="جستجو در فروشگاه..."
              autoFocus
              className="w-full h-10 pr-10 pl-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 outline-none focus:border-orange-400 transition-all"
            />
          </div>
        </div>
      )}
    </header>
  );
};
