import Link from "next/link";
import { useUser } from "@/hooks/useUser";

const Profile = () => {
  const { user } = useUser();
  console.log(user);
  const isLoggedIn = !!user?.email;

  const icon = (
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
  );

  if (isLoggedIn) {
    return (
      <Link href="/profile">
        <button className="md:flex hidden flex-col items-center text-xs gap-1">
          {icon}
          {user?.email?.split("@")[0]}
        </button>
      </Link>
    );
  }

  return (
    <Link href="/Auth/Signin">
      <button className="md:flex hidden items-center gap-3 text-xs border p-2 rounded-md">
        {icon}
        ورود به حساب کاربری
      </button>
    </Link>
  );
};

export default Profile;
