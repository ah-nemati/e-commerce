import { useEffect, useState } from "react";
import Link from "next/link";

const Profile = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setUserName(email.split("@")[0]);
    } else {
      setUserName("");
    }
  }, []);

  if (userName === "") return null;

  return (
    <>
      {userName !== "" ? (
        <Link href={"/profile"} passHref legacyBehavior>
          <button className="md:flex hidden flex-col items-center text-xs gap-1">
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
    </>
  );
};

export default Profile;
