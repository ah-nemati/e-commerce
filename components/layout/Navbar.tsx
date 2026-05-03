import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearSearch, SetFilter, SetTheme } from "../../Store/Actions";
import { State } from "../../types";

export const Navbar = () => {
  const { cart, theme, user, products } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const [themepage, setthemepage] = useState(theme);
  const [themeListShow, setthemeListShow] = useState(false);
  const [userName, setuserName] = useState<string>("");
  const [searchValue, setsearchValue] = useState("");

  const themeLight = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7"
    >
      <path
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        className="fill-sky-400/20 stroke-sky-500"
      ></path>
      <path
        d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
        className="stroke-sky-500"
      ></path>
    </svg>
  );

  const themeDark = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-7 h-7 focus:fill-gray-500"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
        className="fill-sky-400/20"
      ></path>
      <path
        d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
        className="fill-sky-500"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
        className="fill-sky-500"
      ></path>
    </svg>
  );

  const themeSystem = (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
      <path
        d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
        strokeWidth="2"
        strokeLinejoin="round"
        className="stroke-sky-500 fill-sky-400/20"
      ></path>
      <path
        d="M14 15c0 3 2 5 2 5H8s2-2 2-5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-sky-500"
      ></path>
    </svg>
  );

  useEffect(() => {
    if (themeListShow) {
      document
        .querySelectorAll(".option")
        .forEach((element) =>
          element.addEventListener("click", () =>
            element.getAttribute("value") === "system"
              ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? setthemepage("dark")
                : setthemepage("light")
              : setthemepage((element.getAttribute("value") as "light" | "dark" | "system") ?? "system")
          )
        );
      dispatch(SetTheme(themepage));
    }
  }, [themeListShow, themepage, dispatch]);

  useEffect(() => {
    setuserName(user && user.email ? user.email.split("@")[0] : "");
  }, [user]);

  const handleSearch = () => {
    dispatch(
      SetFilter(
        products.filter((item) => item.title_fa.includes(searchValue))
      )
    );
  };

  useEffect(() => {
    if (searchValue === "") {
      dispatch(ClearSearch());
    } else {
      const filtered = products.filter((item) =>
        item.title_fa.includes(searchValue)
      );
      dispatch(SetFilter(filtered));
    }
  }, [searchValue, dispatch, products]);

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", themepage);
    } else if (localStorage.getItem("theme") !== themepage) {
      localStorage.setItem("theme", themepage);
    }

    switch (theme) {
      case "dark":
        document
          .getElementsByTagName("html")
          .item(0)
          ?.setAttribute("class", "dark");
        break;
      case "system":
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document
            .getElementsByTagName("html")
            .item(0)
            ?.setAttribute("class", "dark");
        } else {
          document
            .getElementsByTagName("html")
            .item(0)
            ?.removeAttribute("class");
        }
        break;
      default:
        document.getElementsByTagName("html").item(0)?.removeAttribute("class");
        break;
    }
  }, [theme, themepage]);
  return (
    <>
      <div className="flex flex-col shadow-md border-b sticky dark:border-slate-700 dark:bg-slate-900 dark:text-white bg-white top-0 z-20">
        <div className="flex items-center dark:bg-slate-900 dark:text-white bg-white h-20 w-full px-8">
          {/*  logo  */}
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
          {/* search input  */}
          <div className="md:flex items-center hidden dark:text-white dark:bg-slate-800 bg-dark w-5/12 rounded-md px-2">
            <button onClick={handleSearch}>
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
              onChange={(e) => setsearchValue(e.target.value)}
              className="outline-none h-12 px-2 bg-dark dark:placeholder-white dark:text-white dark:bg-slate-800 w-full"
              placeholder="جستجو در بازار"
            />
          </div>
          {/* cart and login  */}
          <div className="md:w-5/12 w-2/3 flex gap-6 justify-end items-center absolute left-8">
            {/* login icon */}
            {userName !== "" ? (
              <Link href={"/profile"} passHref legacyBehavior>
                <button className="md:flex hidden flex-col items-center text-xs gap-1">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-600 dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {userName}
                </button>
              </Link>
            ) : (
              <Link href={"/Auth/Signin"} passHref legacyBehavior>
                <button className="md:flex hidden items-center gap-3 text-xs border p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600 dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  ورود به حساب کاربری
                </button>
              </Link>
            )}
            {userName !== "" ? (
              <Link href={"/profile"} passHref legacyBehavior>
                <button className="md:hidden flex items-center gap-3 text-xs rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-600 dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </Link>
            ) : (
              <Link href={"/Auth/Signin"} passHref legacyBehavior>
                <button className="md:hidden flex items-center gap-3 text-xs rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-600 dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </Link>
            )}
            <div className="w-[1.5px] h-5 bg-gray-400"></div>
            {/* cart icon */}
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
            {/* favorite icon */}
            <button
              className="flex flex-col items-center dark:text-white text-gray-600 gap-1 text-base"
              onClick={() => setthemeListShow(!themeListShow)}
            >
              {themepage === "light"
                ? themeLight
                : themepage === "dark"
                ? themeDark
                : themeSystem}
            </button>
            <ul
              className="flex flex-col bg-white rounded-md absolute top-16 w-40 p-2
            shadow-md text-gray-500"
              dir="ltr"
              style={{ display: themeListShow ? "block" : "none" }}
              onMouseLeave={() => setthemeListShow(!themeListShow)}
            >
              <li
                className="flex gap-2 p-2 cursor-pointer hover:bg-gray-50 option"
                value={"dark"}
              >
                {themeDark}
                تاریک
              </li>
              <li
                className="flex gap-2 p-2 cursor-pointer hover:bg-gray-50 option"
                value={"light"}
              >
                {themeLight}
                روشن
              </li>
              <li
                className="flex gap-2 p-2 cursor-pointer hover:bg-gray-50 option"
                value={"system"}
              >
                {themeSystem}
                سیستم
              </li>
            </ul>
          </div>
        </div>
        {/* mobile search input  */}
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
            className="outline-none h-12 px-2 dark:placeholder-white dark:text-white dark:bg-slate-800 bg-dark w-full"
            placeholder="جستجو در بازار"
          />
        </div>
      </div>
    </>
  );
};
