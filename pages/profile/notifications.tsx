import { NextPage } from "next";
import ProfileNav from "../../components/Tools/ProfileNav";

const Notifications: NextPage = () => {
  return (
    <div className="flex sm:flex-row flex-col md:mx-52 m-0 my-10 sm:justify-around sm:p-0 p-3 sm:gap-0 gap-4">
      <ProfileNav />
      <div className="flex flex-col rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 sm:w-8/12">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            اعلان‌ها
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 gap-4 py-16 text-gray-400 dark:text-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12 opacity-40"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
          <span className="text-sm">هیچ پیغامی موجود نیست.</span>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
