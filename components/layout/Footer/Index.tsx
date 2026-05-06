import cashOnDelivery from "./../../../images/cash-on-delivery.svg";
import daysReturn from "./../../../images/days-return.svg";
import expressDelivery from "./../../../images/express-delivery.svg";
import originalProducts from "./../../../images/original-products.svg";
import support from "./../../../images/support.svg";
import FeatureItem from "./FeatureItem";
import FooterSection from "./FooterSection";
import FooterSocial from "./FooterSocial";

const features = [
  { icon: originalProducts, title: "ضمانت اصل بودن کالا" },
  { icon: daysReturn, title: "ضمانت بازگشت کالا" },
  { icon: support, title: "پشتیبانی ۲۴ ساعته" },
  { icon: cashOnDelivery, title: "امکان پرداخت در محل" },
  { icon: expressDelivery, title: "امکان تحویل اکسپرس" },
];

const footerSections = [
  {
    title: "با فروشگاه",
    items: [
      "اتاق خبر فروشگاه",
      "فروش در فروشگاه",
      "فرصت های شغلی",
      "تماس با فروشگاه",
      "درباره فروشگاه",
    ],
  },
  {
    title: "خدمات مشتریان",
    items: [
      "پاسخ به پرسش های متداول",
      "رویه های بازگرداندن کالا",
      "شرایط استفاده",
      "حریم خصوصی",
      "گزارش باگ",
    ],
  },
  {
    title: "راهنمای خرید از فروشگاه",
    items: ["نحوه ثبت سفارش", "رویه ارسال سفارش", "شیوه های پرداخت"],
  },
];

export const Footer = () => {
  return (
    <div className="flex flex-col p-6 gap-12 md:mx-14 dark:border dark:border-slate-700 dark:bg-slate-900 bg-white md:rounded-md">
      {/* TOP */}
      <div className="flex flex-wrap justify-between md:mx-10 gap-2">
        {features.map((item) => (
          <FeatureItem key={item.title} {...item} />
        ))}
      </div>

      {/* BOTTOM */}
      <div className="flex flex-wrap justify-between text-gray-800 dark:text-white">
        {footerSections.map((section) => (
          <FooterSection key={section.title} {...section} />
        ))}

        <FooterSocial />
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-sm text-gray-600 dark:text-white">
        <hr className="pb-6" />
        <span>همه‌ حقوق برای «فروشگاه» است. © 1401</span>
      </div>
    </div>
  );
};
