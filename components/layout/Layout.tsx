import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Toast } from "../Tools/Toast";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { State } from "../../types";

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [IsShow, setIsShow] = useState(false);
  const { message,status } = useSelector((state: State) => state.message);

  const notifyColor = {
    error: { color: "red", bg: "#ffd0d0" },
    success: { color: "green", bg: "#d5ffd5" },
  };

  const svg = {
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  useEffect(() => {
    if (message !== "") {
      setIsShow(true);
    }
  }, [message]);

  useEffect(() => {
    if (IsShow) {
      const timer = setTimeout(() => {
        setIsShow(!IsShow);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [IsShow]);

  const handelShow = () => setIsShow(!IsShow);

  return (
    <div dir="rtl" className="bg-gray-100 dark:bg-slate-900">
      <Navbar />
      {status === "error" && IsShow && (
        <Toast
          msg={message}
          color={notifyColor.error.color}
          bg={notifyColor.error.bg}
          handelShow={handelShow}
          IsShow={IsShow}
          svg={svg.error}
        />
      )}
      {status === "success" && IsShow && (
        <Toast
          msg={message}
          color={notifyColor.success.color}
          bg={notifyColor.success.bg}
          handelShow={handelShow}
          IsShow={IsShow}
          svg={svg.success}
        />
      )}
      <main>{children}</main>
      <Footer />
    </div>
  );
};
