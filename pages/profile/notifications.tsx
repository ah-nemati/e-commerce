import { useState } from "react";
import ProfileNav from "../../components/Tools/ProfileNav";

const Notifications = () => {
  const [email, setEmail] = useState(
    typeof window !== "undefined" ? localStorage.getItem("email") : ""
  );
  return (
    <div className="sm:flex-row flex-col md:mx-52 m-0 my-10 sm:justify-around sm:p-0 p-3 sm:gap-0 gap-2">
      <ProfileNav />
      <div className="flex-col dark:text-white text-gray-600 rounded bg-white dark:bg-slate-600 h-80 sm:w-8/12 justify-center items-center gap-8">
        هیچ پیغامی موجود نیست !
      </div>
    </div>
  );
};

export default Notifications;
