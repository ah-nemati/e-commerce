import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ProfileNav from "../../components/Tools/ProfileNav";

interface RootState {
  user: {
    email: string;
  }
}

const Profile = () => {
  const { user } = useSelector((state: RootState) => state);
  const { push } = useRouter();
  useEffect(() => {
    if (!user.email) {
      push("/");
    }
  }, [user]);

  return (
    <div className="sm:flex-row flex-col md:mx-52 m-0 my-10 sm:justify-around sm:p-0 p-3 sm:gap-0 gap-2">
      <ProfileNav />
      <div className="flex-col rounded bg-white dark:bg-slate-600 h-80 sm:w-8/12 justify-center items-center gap-8">
        <div className="flex-col dark:text-white text-gray-600 gap-2">
          <span className="flex-row self-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </span>
          <span className="text-xl">اعتبار فعلی شما : </span>
          <span className="text-center">۰ تومان</span>
        </div>
        <div className="flex-row justify-center gap-4">
          <button className="bg-orange-600 text-white py-2 px-6 rounded">
            افزایش اعتبار
          </button>
          <button className="border border-orange-600 dark:text-orange-400 text-orange-600 rounded py-2 px-6">
            نقد کردن اعتبار
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
