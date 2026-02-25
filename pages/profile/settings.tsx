import { useState } from "react";
import ProfileNav from "../../components/Tools/ProfileNav";
import { NextPage } from "next";

const Settings: NextPage = () => {
  const [email, setEmail] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("email") : ""
  );
  return (
    <div className="flex sm:flex-row flex-col md:mx-52 m-0 my-10 sm:justify-around sm:p-0 p-3 sm:gap-0 gap-2">
      <ProfileNav />
      <div className="flex flex-col rounded dark:text-white text-gray-500 bg-white dark:bg-slate-600 h-80 sm:w-8/12 justify-center items-center gap-8">
        <span>
          نام کاربری :{" "}
          <span className="dark:text-white text-gray-800">
            {email && email.split("@")[0]}
          </span>
        </span>
        <span>
          ایمیل : <span className="dark:text-white text-gray-800">{email}</span>
        </span>
      </div>
    </div>
  );
};

export default Settings;
