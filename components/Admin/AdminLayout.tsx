import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import Notifications from "./Notifications";
import Settings from "./Settings";
import Orders from "./Orders";
import Wallet from "./Wallet";
import AdminPanel from "./AdminPanel";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";

type ViewType =
  | "dashboard"
  | "orders"
  | "admin"
  | "notifications"
  | "settings"
  | "create"
  | "edit";

const NAV_ICONS = {
  dashboard: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
    />
  ),
  orders: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
    />
  ),
  admin: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
    />
  ),
  notifications: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    />
  ),
  settings: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  ),
};

const NavIcon = ({ type }: { type: keyof typeof NAV_ICONS }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5"
  >
    {NAV_ICONS[type]}
  </svg>
);

const AdminLayout = () => {
  const { user } = useUser();
  const [activeView, setActiveView] = useState<ViewType>("dashboard");
  const [editProductId, setEditProductId] = useState<string | null>(null);

  if (!user) return null;

  const navigateTo = (view: ViewType, productId?: string) => {
    if (view === "edit" && productId) setEditProductId(productId);
    setActiveView(view);
  };

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Wallet />;
      case "orders":
        return <Orders />;
      case "admin":
        return (
          <AdminPanel
            onCreateClick={() => navigateTo("create")}
            onEditClick={(id) => navigateTo("edit", id)}
          />
        );
      case "create":
        return <CreateProduct onBack={() => navigateTo("admin")} />;
      case "edit":
        return (
          <EditProduct
            productId={editProductId!}
            onBack={() => navigateTo("admin")}
          />
        );
      case "notifications":
        return <Notifications />;
      case "settings":
        return <Settings />;
    }
  };

  const menuItems = [
    { key: "dashboard" as ViewType, label: "کیف پول", show: true },
    { key: "orders" as ViewType, label: "سفارش‌ها", show: !user.role },
    { key: "admin" as ViewType, label: "پنل ادمین", show: !!user.role },
    { key: "notifications" as ViewType, label: "پیام‌ها", show: true },
    { key: "settings" as ViewType, label: "تنظیمات", show: true },
  ];

  const activeMenuKey =
    activeView === "create" || activeView === "edit" ? "admin" : activeView;

  return (
    <div
      dir="rtl"
      className="flex sm:flex-row flex-col md:mx-16 lg:mx-32 my-10 sm:gap-6 gap-4 px-4"
    >
      <aside className="flex flex-col sm:w-64 w-full shrink-0 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 p-5 border-b border-gray-100 dark:border-slate-700 bg-gradient-to-l from-orange-50 to-white dark:from-slate-800 dark:to-slate-800">
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-800 dark:text-white">
              {user.email?.split("@")[0]}
            </span>
            <span className="text-xs text-gray-400 dark:text-slate-400">
              {user.role ? "ادمین" : "کاربر"}
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {menuItems.map(
            ({ key, label, show }) =>
              show && (
                <button
                  key={key}
                  onClick={() => navigateTo(key)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-right ${
                    activeMenuKey === key
                      ? "bg-orange-500 text-white shadow-sm shadow-orange-200 dark:shadow-orange-900/30"
                      : "text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/60"
                  }`}
                >
                  <span
                    className={
                      activeMenuKey === key
                        ? "text-white"
                        : "text-gray-400 dark:text-slate-400"
                    }
                  >
                    <NavIcon type={key as keyof typeof NAV_ICONS} />
                  </span>
                  {label}
                </button>
              ),
          )}
        </nav>
      </aside>

      <main className="flex-1 min-h-[70vh] flex flex-col items-center">
        {renderView()}
      </main>
    </div>
  );
};

export default AdminLayout;
