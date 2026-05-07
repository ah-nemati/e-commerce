const Wallet = () => {
  return (
    <div className="flex flex-col rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 w-full">
      <div className="p-6 border-b border-gray-100 dark:border-slate-700">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          کیف پول
        </h2>
      </div>

      <div className="flex flex-col items-center gap-8 p-10">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400 dark:text-slate-400 mb-1">
              اعتبار فعلی شما
            </p>
            <p className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
              ۰ تومان
            </p>
          </div>
        </div>

        <div className="w-full max-w-xs flex flex-col gap-3">
          <button className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white py-3 px-6 rounded-xl font-medium transition-colors duration-200 shadow-sm shadow-orange-200 dark:shadow-none">
            افزایش اعتبار
          </button>
          <button className="w-full border-2 border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-500 dark:text-orange-400 rounded-xl py-3 px-6 font-medium transition-colors duration-200">
            نقد کردن اعتبار
          </button>
        </div>

        <div className="w-full max-w-sm p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600">
          <p className="text-xs text-center text-gray-400 dark:text-slate-400">
            برای افزایش اعتبار از درگاه پرداخت امن استفاده می‌شود
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
