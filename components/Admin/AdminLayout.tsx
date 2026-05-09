"use client";

import { memo, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

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

const Bone = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-lg bg-gray-100 dark:bg-slate-700 ${className}`}
  />
);

const BoneCircle = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-full bg-gray-100 dark:bg-slate-700 ${className}`}
  />
);

const SkeletonCard = ({ children }: { children: ReactNode }) => (
  <div className="flex w-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
    {children}
  </div>
);

const SidebarSkeleton = () => (
  <aside className="flex w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:w-64">
    <div className="flex items-center gap-3 border-b border-gray-100 p-5 dark:border-slate-700">
      <BoneCircle className="h-12 w-12 shrink-0" />
      <div className="flex flex-1 flex-col gap-2">
        <Bone className="h-4 w-24" />
        <Bone className="h-3 w-12" />
      </div>
    </div>
    <div className="flex flex-col gap-1 p-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Bone key={i} className="h-10 w-full rounded-xl" />
      ))}
    </div>
  </aside>
);

const WalletSkeleton = () => (
  <SkeletonCard>
    <div className="border-b border-gray-100 p-6 dark:border-slate-700">
      <Bone className="h-5 w-32" />
    </div>
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between rounded-xl bg-gray-50 p-5 dark:bg-slate-700/30">
        <div className="flex flex-col gap-2">
          <Bone className="h-3 w-20" />
          <Bone className="h-7 w-36" />
        </div>
        <BoneCircle className="h-12 w-12" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-xl border border-gray-100 p-4 dark:border-slate-700"
          >
            <Bone className="h-3 w-16" />
            <Bone className="h-5 w-24" />
          </div>
        ))}
      </div>
    </div>
  </SkeletonCard>
);

const OrdersSkeleton = () => (
  <SkeletonCard>
    <div className="flex justify-between border-b border-gray-100 p-6 dark:border-slate-700">
      <Bone className="h-5 w-28" />
      <Bone className="h-5 w-16" />
    </div>
    <div className="divide-y divide-gray-50 dark:divide-slate-700">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-4">
          <Bone className="h-16 w-16 shrink-0 rounded-xl sm:h-20 sm:w-20" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Bone className="h-4 w-full" />
            <Bone className="h-3 w-2/3" />
          </div>
          <Bone className="h-8 w-24 rounded-lg" />
        </div>
      ))}
    </div>
  </SkeletonCard>
);

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
  logout: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3H9m0 0l3-3m-3 3l3 3"
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
    className="h-5 w-5"
  >
    {NAV_ICONS[type]}
  </svg>
);

const AdminLayout = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const [activeView, setActiveView] = useState<ViewType>("dashboard");
  const [editProductId, setEditProductId] = useState<string | null>(null);

  const navigateTo = (view: ViewType, productId?: string) => {
    if (view === "edit" && productId) setEditProductId(productId);
    setActiveView(view);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.replace("/Auth/Signin");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
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
      default:
        return <Wallet />;
    }
  };

  const renderSkeletonView = () => {
    switch (activeView) {
      case "dashboard":
        return <WalletSkeleton />;
      case "orders":
        return <OrdersSkeleton />;
      case "admin":
        return <Bone className="h-96 w-full" />;
      default:
        return <WalletSkeleton />;
    }
  };

  if (loading) {
    return (
      <div
        dir="rtl"
        className="my-10 flex flex-col gap-4 overflow-x-hidden px-4 sm:flex-row sm:gap-6 md:mx-16 lg:mx-32"
      >
        <SidebarSkeleton />
        <main className="flex min-h-[70vh] w-full min-w-0 flex-1 flex-col">
          {renderSkeletonView()}
        </main>
      </div>
    );
  }

  if (!user) {
    router.replace("/Auth/Signin");
    return null;
  }

  const menuItems = [
    { key: "dashboard", label: "کیف پول", show: true },
    { key: "orders", label: "سفارش‌ها", show: true },
    { key: "admin", label: "پنل ادمین", show: user.role === "admin" },
    { key: "notifications", label: "پیام‌ها", show: true },
    { key: "settings", label: "تنظیمات", show: true },
  ];

  const activeMenuKey =
    activeView === "create" || activeView === "edit" ? "admin" : activeView;

  return (
    <div
      dir="rtl"
      className="my-10 flex flex-col gap-4 overflow-x-hidden px-4 sm:flex-row sm:gap-6 md:mx-16 lg:mx-32"
    >
      {/* SIDEBAR */}
      <aside className="flex w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:w-64">
        {/* USER INFO */}
        <div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-l from-orange-50 to-white p-5 dark:border-slate-700 dark:from-slate-800 dark:to-slate-800">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 shadow-sm ring-1 ring-orange-200 dark:bg-orange-900/30 dark:ring-orange-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-orange-500"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0ZM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-gray-800 dark:text-white">
              {user.email?.split("@")[0]}
            </p>
            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${user.role === "admin" ? "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300" : "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"}`}
            >
              {user.role === "admin" ? "ادمین" : "کاربر"}
            </span>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {menuItems.map(
            ({ key, label, show }) =>
              show && (
                <button
                  key={key}
                  onClick={() => navigateTo(key as ViewType)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-right text-sm font-medium transition-all duration-200 ${
                    activeMenuKey === key
                      ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                      : "text-gray-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700/60"
                  }`}
                >
                  <NavIcon type={key as keyof typeof NAV_ICONS} />
                  {label}
                </button>
              ),
          )}
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 text-right text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <NavIcon type="logout" />
            خروج از حساب
          </button>
        </nav>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex min-h-[70vh] w-full min-w-0 flex-1 flex-col">
        {renderView()}
      </main>
    </div>
  );
};

export default memo(AdminLayout);
