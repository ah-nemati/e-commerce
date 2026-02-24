import Image from "next/image";
import React from "react";
import originalProducts from "./../../images/original-products.svg";
import daysReturn from "./../../images/days-return.svg";
import support from "./../../images/support.svg";
import cashOnDelivery from "./../../images/cash-on-delivery.svg";
import expressDelivery from "./../../images/express-delivery.svg";
import aparat from "./../../images/aparat.png";
import linkedin from "./../../images/linkedin.png";
import instagram from "./../../images/instagram.png";
import twitter from "./../../images/twitter.png";

export const Footer = () => {
  return (
    <div className="flex flex-col h-50 p-6 gap-12 md:mx-14 dark:border dark:border-slate-700 dark:bg-slate-900 bg-white md:rounded-md">
      {/* top footer */}
      <div className="flex flex-wrap justify-between md:mx-10 md:gap-0 gap-2">
        <div className="flex flex-col items-center text-xs dark:text-white text-gray-700 gap-2">
          <span className="md:w-16 w-12 h-12 md:h-16">
            <Image
              src={originalProducts}
              width={100}
              height={100}
              alt="originalProducts"
              priority={true}
            />
          </span>
          <span>ضمانت اصل بودن کالا</span>
        </div>
        <div className="flex flex-col items-center  text-xs dark:text-white text-gray-700 gap-2">
          <span className="md:w-16 w-12 h-12 md:h-16">
            <Image
              src={daysReturn}
              width={100}
              height={100}
              alt="daysReturn"
              priority={true}
            />
          </span>
          <span> ضمانت بازگشت کالا</span>
        </div>
        <div className="flex flex-col items-center  text-xs dark:text-white text-gray-700 gap-2">
          <span className="md:w-16 w-12 h-12 md:h-16">
            <Image
              src={support}
              width={100}
              height={100}
              alt="support"
              priority={true}
            />
          </span>
          <span>پشتیبانی ۲۴ ﺳﺎﻋﺘﻪ</span>
        </div>
        <div className="flex flex-col items-center  text-xs dark:text-white text-gray-700 gap-2">
          <span className="md:w-16 w-12 h-12 md:h-16">
            <Image
              src={cashOnDelivery}
              width={100}
              height={100}
              alt="cashOnDelivery"
              priority={true}
            />
          </span>
          <span>امکان پرداخت در محل</span>
        </div>
        <div className="flex flex-col items-center  text-xs dark:text-white text-gray-700 gap-2">
          <span className="md:w-16 w-12 h-12 md:h-16">
            <Image
              src={expressDelivery}
              width={100}
              height={100}
              alt="expressDelivery"
            />
          </span>
          <span>اﻣﮑﺎن ﺗﺤﻮﯾﻞ اﮐﺴﭙﺮس</span>
        </div>
      </div>
      {/* bottom footer */}
      <div className="flex dark:text-white text-gray-800 flex-wrap justify-between">
        <div className="flex flex-col ">
          <h3 className="text-lg mb-4">با فروشگاه</h3>
          <ul className="dark:text-white text-gray-500">
            <li className="py-2">اتاق خبر فروشگاه</li>
            <li className="py-2">فروش در فروشگاه</li>
            <li className="py-2">فرصت های شغلی </li>
            <li className="py-2">تماس با فروشگاه</li>
            <li className="py-2">درباره فروشگاه</li>
          </ul>
        </div>
        <div className="flex flex-col ">
          <h3 className="text-lg mb-4">خدمات مشتریان</h3>
          <ul className="dark:text-white text-gray-500 text-base">
            <li className="py-2">پاسخ به پرسش های متداول</li>
            <li className="py-2">رویه های بازگرداندن کالا</li>
            <li className="py-2">شرایط استفاده</li>
            <li className="py-2">حریم خصوصی </li>
            <li className="py-2"> گزارش باگ </li>
          </ul>
        </div>
        <div className="flex flex-col ">
          <h3 className="text-lg mb-4">راهنمای خرید از فروشگاه</h3>
          <ul className="dark:text-white text-gray-500 text-base">
            <li className="py-2">نحوه ثبت سفارش</li>
            <li className="py-2">رویه ارسال سفارش</li>
            <li className="py-2">شیوه های پرداخت</li>
          </ul>
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="md:py-0 py-4">همراه ما باشید !</h3>
          <div className="flex justify-between pl-12">
            <button className="w-10 h-10">
              <Image
                src={aparat}
                alt="aparat"
                width={100}
                height={100}
              />
            </button>
            <button className="w-10 h-10">
              <Image
                src={linkedin}
                alt="linkedin"
                width={100}
                height={100}
              />
            </button>
            <button className="w-10 h-10">
              <Image
                src={instagram}
                alt="instagram"
                width={100}
                height={100}
              />
            </button>
            <button className="w-10 h-10">
              <Image  src={twitter} alt="twitter" width={100} height={100} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="mt-6">
              با ثبت ایمیل ، از جدیدترین تخفیف ها خبردار شوید
            </h4>
            <div className="flex gap-2">
              <input
                type="email"
                className="outline-none p-3 w-3/4  rounded-md dark:bg-slate-800 dark:placeholder-white bg-gray-100 text-sm"
                placeholder="ایمیل شما"
              />
              <button className="bg-orange-400 rounded-md p-4 w-1/4 text-sm text-white">
                ثبت
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-sm dark:text-white text-gray-600">
        <hr className="pb-6" />
        <span>همه‌ حقوق برای «فروشگاه» است. © 1401</span>
      </div>
    </div>
  );
};
