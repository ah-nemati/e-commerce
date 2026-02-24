import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { Logout } from "../../Store/Actions";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

const ProfileNav = () => {
  const dispatch = useDispatch();
  const [isProfile, setIsProfile] = useState(true);
  const [isOrders, setIsOrders] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { theme, user } = useSelector((state) => state);
  const { email, role } = user;

  const router = useRouter();
  useEffect(() => {
    if (Object.keys(user).length == 0) {
      router.push("/");
    }
  }, [user]);
  useEffect(() => {
    switch (router.pathname) {
      case "/profile/settings":
        setIsProfile(false);
        setIsOrders(false);
        setIsNotifications(false);
        setIsSettings(true);
        setIsAdmin(false);
        break;
      case "/profile/orders":
        setIsProfile(false);
        setIsOrders(true);
        setIsNotifications(false);
        setIsSettings(false);
        setIsAdmin(false);
        break;
      case "/profile/notifications":
        setIsProfile(false);
        setIsOrders(false);
        setIsNotifications(true);
        setIsSettings(false);
        setIsAdmin(false);
        break;
      case "/profile/admin":
        setIsProfile(false);
        setIsOrders(false);
        setIsNotifications(false);
        setIsSettings(false);
        setIsAdmin(true);
        break;
      case "/profile/admin/create":
        setIsProfile(false);
        setIsOrders(false);
        setIsNotifications(false);
        setIsSettings(false);
        setIsAdmin(true);
        break;
      case "/profile/admin/edit/[id]":
        setIsProfile(false);
        setIsOrders(false);
        setIsNotifications(false);
        setIsSettings(false);
        setIsAdmin(true);
        break;
      default:
        setIsProfile(true);
        setIsOrders(false);
        setIsNotifications(false);
        setIsSettings(false);
        break;
    }
  }, [router.pathname]);

  return (
    <div className="flex-col text-gray-600 max-h-[50vh] bg-white rounded dark:bg-slate-600 dark:text-white p-4 sm:w-3/12 gap-4">
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
        <span>{email && email.split("@")[0]}</span>
      </div>
      <hr className="pb-2" />
      {/* index */}
      <Link
        href={"/profile"}
        className="text-orange-500"
        style={{
          background:
            theme == "light"
              ? isProfile
                ? "rgb(254 242 242)"
                : "white"
              : "rgb(71 85 105)",
          color:
            theme == "light"
              ? isProfile
                ? "rgb(249 115 22)"
                : "rgb(75 85 99)"
              : "white",
        }}
      >
        <NavItem
          d1={
            "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          }
          value={"کیف پول"}
        />
      </Link>
      {/* orders */}
      {!role ? (
        <Link
          href={"/profile/orders"}
          style={{
            background:
              theme == "light"
                ? isOrders
                  ? "rgb(254 242 242)"
                  : "white"
                : "rgb(71 85 105)",
            color:
              theme == "light"
                ? isOrders
                  ? "rgb(249 115 22)"
                  : "rgb(75 85 99)"
                : "white",
          }}
        >
          <NavItem
            d1={
              "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            }
            value={"سفارش ها"}
          />
        </Link>
      ) : (
        ""
      )}
      {/* admin options */}
      {role ? (
        <Link
          href={"/profile/admin"}
          style={{
            background:
              theme == "light"
                ? isAdmin
                  ? "rgb(254 242 242)"
                  : "white"
                : "rgb(71 85 105)",
            color:
              theme == "light"
                ? isAdmin
                  ? "rgb(249 115 22)"
                  : "rgb(75 85 99)"
                : "white",
          }}
        >
          <NavItem
            d1={
              "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
            }
            value={"پنل ادمین"}
          />
        </Link>
      ) : (
        ""
      )}
      {/* end admin options */}
      {/* notifications */}
      <Link
        href={"/profile/notifications"}
        style={{
          background:
            theme == "light"
              ? isNotifications
                ? "rgb(254 242 242)"
                : "white"
              : "rgb(71 85 105)",
          color:
            theme == "light"
              ? isNotifications
                ? "rgb(249 115 22)"
                : "rgb(75 85 99)"
              : "white",
        }}
      >
        <NavItem
          d1={
            "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          }
          value={"پیغام ها"}
        />
      </Link>
      {/* settings */}
      <Link
        href={"/profile/settings"}
        style={{
          background:
            theme == "light"
              ? isSettings
                ? "rgb(254 242 242)"
                : "white"
              : "rgb(71 85 105)",
          color:
            theme == "light"
              ? isSettings
                ? "rgb(249 115 22)"
                : "rgb(75 85 99)"
              : "white",
        }}
      >
        <NavItem
          d1={
            "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          }
          d2={"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}
          value={"تنظیمات"}
        />
      </Link>
      <hr className="pb-2" />
      <NavItem
        d1={
          "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
        }
        value={"خروج"}
        onClick={() => {
          localStorage.getItem("email") ? localStorage.removeItem("email") : "";
          dispatch(Logout());
          router.push("/");
        }}
      />
    </div>
  );
};

export default ProfileNav;
