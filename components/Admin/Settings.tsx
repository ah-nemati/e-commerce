import { useUser } from "@/hooks/useUser";

const Settings = () => {
  const { user, loading } = useUser();

  const username = !loading && user?.email ? user.email.split("@")[0] : "—";
  const email = user?.email ?? "—";

  return (
    <div className="flex flex-col rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 w-full p-8 gap-6">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-slate-700 pb-4">
        اطلاعات حساب
      </h2>

      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600">
          <span className="text-sm text-gray-400 dark:text-slate-400">
            نام کاربری
          </span>
          <span className="font-medium text-gray-800 dark:text-white">
            {loading ? (
              <span className="animate-pulse bg-gray-200 dark:bg-slate-600 rounded w-24 h-4 inline-block" />
            ) : (
              username
            )}
          </span>
        </div>

        <div className="flex flex-row items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600">
          <span className="text-sm text-gray-400 dark:text-slate-400">
            ایمیل
          </span>
          <span className="font-medium text-gray-800 dark:text-white" dir="ltr">
            {loading ? (
              <span className="animate-pulse bg-gray-200 dark:bg-slate-600 rounded w-36 h-4 inline-block" />
            ) : (
              email
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
