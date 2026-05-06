import { useUser } from "@/hooks/useUser";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import NavItem from "./NavItem";

const ProfileNav = () => {
  const { user } = useUser();
  const router = useRouter();

  const pathname = router.pathname;

  const isActive = (path: string) => pathname === path;
  const isAdminRoute = pathname.startsWith("/profile/admin");

  const handleLogout = () => {
    axios.patch("/api/logout");
    router.push("/");
  };

  if (!user) return null;

  const menu = [
    {
      href: "/profile",
      label: "کیف پول",
      icon: ["M2.25 18.75a60.07..."],
      show: true,
      active: isActive("/profile"),
    },
    {
      href: "/profile/orders",
      label: "سفارش ها",
      icon: ["M15.75 10.5V6a3.75..."],
      show: !user?.role,
      active: isActive("/profile/orders"),
    },
    {
      href: "/profile/admin",
      label: "پنل ادمین",
      icon: ["M11.42 15.17L17.25..."],
      show: !!user?.role,
      active: isAdminRoute,
    },
    {
      href: "/profile/notifications",
      label: "پیغام ها",
      icon: ["M14.857 17.082..."],
      show: true,
      active: isActive("/profile/notifications"),
    },
    {
      href: "/profile/settings",
      label: "تنظیمات",
      icon: ["M9.594 3.94...", "M15 12..."],
      show: true,
      active: isActive("/profile/settings"),
    },
  ];

  return (
    <aside className="flex flex-col w-full sm:w-3/12 max-h-[60vh] p-4 rounded-2xl bg-white dark:bg-slate-700 text-gray-700 dark:text-white shadow-sm">
      <div className="flex items-center gap-3 pb-6 border-b border-gray-200 dark:border-slate-600">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <span className="font-medium">{user?.email?.split("@")[0]}</span>
      </div>

      <nav className="flex flex-col gap-1 mt-4">
        {menu.map(
          (item) =>
            item.show && (
              <Link key={item.href} href={item.href}>
                <NavItem
                  label={item.label}
                  d1={item.icon[0]}
                  d2={item.icon[1]}
                  active={item.active}
                />
              </Link>
            ),
        )}
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-slate-600">
        <NavItem
          label="خروج"
          d1="M15.75 9V5.25..."
          onClick={handleLogout}
          danger
        />
      </div>
    </aside>
  );
};

export default ProfileNav;
