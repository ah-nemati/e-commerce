import Link from "next/link";
import { useRouter } from "next/router";
import NavItem from "./NavItem";
import { Logout } from "../../Store/Actions";
import { useDispatch } from "react-redux";
import { useUser } from "@/hooks/useUser";

const ProfileNav = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useUser();

  const pathname = router.pathname;

  const isActive = (path: string) => pathname === path;

  const isAdminRoute = pathname.startsWith("/profile/admin");

  const getStyle = (active: boolean, theme: string) => ({
    background:
      theme === "light"
        ? active
          ? "rgb(254 242 242)"
          : "white"
        : "rgb(71 85 105)",
    color:
      theme === "light"
        ? active
          ? "rgb(249 115 22)"
          : "rgb(75 85 99)"
        : "white",
  });

  const handleLogout = () => {
    localStorage.removeItem("email");
    dispatch(Logout());
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="flex-col text-gray-600 max-h-[50vh] bg-white rounded dark:bg-slate-600 dark:text-white p-4 sm:w-3/12 gap-4">
      {/* header */}
      <div className="flex items-center gap-2 pb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        <span>{user?.email?.split("@")[0]}</span>
      </div>

      <hr className="pb-2" />

      {/* wallet */}
      <Link href="/profile" style={getStyle(isActive("/profile"), "light")}>
        <NavItem d1="M2.25 18.75a60.07..." value="کیف پول" />
      </Link>

      {/* orders */}
      {!user?.role && (
        <Link
          href="/profile/orders"
          style={getStyle(isActive("/profile/orders"), "light")}
        >
          <NavItem d1="M15.75 10.5V6a3.75..." value="سفارش ها" />
        </Link>
      )}

      {/* admin */}
      {user?.role && (
        <Link href="/profile/admin" style={getStyle(isAdminRoute, "light")}>
          <NavItem d1="M11.42 15.17L17.25..." value="پنل ادمین" />
        </Link>
      )}

      {/* notifications */}
      <Link
        href="/profile/notifications"
        style={getStyle(isActive("/profile/notifications"), "light")}
      >
        <NavItem d1="M14.857 17.082..." value="پیغام ها" />
      </Link>

      {/* settings */}
      <Link
        href="/profile/settings"
        style={getStyle(isActive("/profile/settings"), "light")}
      >
        <NavItem d1="M9.594 3.94..." d2="M15 12..." value="تنظیمات" />
      </Link>

      <hr className="pb-2" />

      {/* logout */}
      <NavItem d1="M15.75 9V5.25..." value="خروج" onClick={handleLogout} />
    </div>
  );
};

export default ProfileNav;
