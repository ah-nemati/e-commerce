import Image from "next/image";
import cashOnDelivery from "./../../../images/cash-on-delivery.svg";
import daysReturn from "./../../../images/days-return.svg";
import expressDelivery from "./../../../images/express-delivery.svg";
import originalProducts from "./../../../images/original-products.svg";
import support from "./../../../images/support.svg";
import aparat from "./../../../images/aparat.png";
import linkedin from "./../../../images/linkedin.png";
import instagram from "./../../../images/instagram.png";
import twitter from "./../../../images/twitter.png";
import Link from "next/link";
import { useState } from "react";

const FEATURES = [
  {
    icon: originalProducts,
    title: "ضمانت اصل بودن کالا",
    subtitle: "تمام محصولات اورجینال",
  },
  {
    icon: daysReturn,
    title: "ضمانت بازگشت کالا",
    subtitle: "تا ۷ روز بدون سوال",
  },
  {
    icon: support,
    title: "پشتیبانی ۲۴ ساعته",
    subtitle: "همه روزه آماده پاسخ‌گویی",
  },
  {
    icon: cashOnDelivery,
    title: "پرداخت در محل",
    subtitle: "تحویل و پرداخت همزمان",
  },
  {
    icon: expressDelivery,
    title: "ارسال اکسپرس",
    subtitle: "تحویل سریع در تهران",
  },
];

const FOOTER_SECTIONS = [
  {
    title: "با فروشگاه",
    links: [
      "اتاق خبر",
      "فروش در فروشگاه",
      "فرصت‌های شغلی",
      "تماس با ما",
      "درباره فروشگاه",
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      "سوالات متداول",
      "رویه بازگرداندن کالا",
      "شرایط استفاده",
      "حریم خصوصی",
      "گزارش مشکل",
    ],
  },
  {
    title: "راهنمای خرید",
    links: ["نحوه ثبت سفارش", "رویه ارسال سفارش", "شیوه‌های پرداخت"],
  },
];

const SOCIALS = [
  { icon: instagram, alt: "instagram", label: "اینستاگرام" },
  { icon: twitter, alt: "twitter", label: "توییتر" },
  { icon: linkedin, alt: "linkedin", label: "لینکدین" },
  { icon: aparat, alt: "aparat", label: "آپارات" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer
      dir="rtl"
      className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800"
    >
      {/* Trust features strip */}
      <div className="border-b border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-950/50">
        <div className="max-w-screen-xl mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-5">
            {FEATURES.map((item) => (
              <div key={item.title} className="flex items-center gap-3 group">
                <div className="w-11 h-11 shrink-0 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={26}
                    height={26}
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand + social */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-200 dark:shadow-orange-900/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="font-black text-sm text-orange-500">فروشگاه</p>
                <p className="text-[11px] text-gray-400 dark:text-slate-500">
                  market
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-slate-400 leading-6">
              بهترین فروشگاه آنلاین برای خرید تکنولوژی با قیمت مناسب و ضمانت
              اصالت.
            </p>

            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <button
                  key={s.alt}
                  title={s.label}
                  className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 flex items-center justify-center border border-gray-100 dark:border-slate-700 hover:border-orange-200 dark:hover:border-orange-800/40 transition-all"
                >
                  <Image src={s.icon} alt={s.alt} width={18} height={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-gray-800 dark:text-white">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div>
              <p className="text-sm font-bold text-gray-800 dark:text-white mb-1">
                خبرنامه فروشگاه
              </p>
              <p className="text-xs text-gray-400 dark:text-slate-500">
                از جدیدترین تخفیف‌ها و محصولات با خبر شوید
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2.5 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                با موفقیت ثبت شد!
              </div>
            ) : (
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  placeholder="ایمیل شما"
                  className="flex-1 md:w-60 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 outline-none focus:border-orange-400 transition-colors"
                />
                <button
                  onClick={handleSubscribe}
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-orange-200 dark:shadow-orange-900/30 shrink-0"
                >
                  عضویت
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-950/50">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400 dark:text-slate-500">
            © {new Date().getFullYear()} — تمامی حقوق برای «فروشگاه» محفوظ است.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-gray-400 dark:text-slate-500 hover:text-orange-500 transition-colors"
            >
              قوانین و مقررات
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-400 dark:text-slate-500 hover:text-orange-500 transition-colors"
            >
              حریم خصوصی
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
