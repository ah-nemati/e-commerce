import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { CartItem } from "../components/Tools/CartItem";
import PersianNumber from "../hooks/PersianNumber";
import { Action, ProductType as CartItemType, State } from "../types/index";

const DISCOUNT_CODES: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
};

const Cart = () => {
  const cartProduct = useSelector((state: State) => state.cart);
  const dispatch: Dispatch<Action> = useDispatch();

  const [sumPrice, setSumPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [discountInput, setDiscountInput] = useState<string>("");
  const [discountError, setDiscountError] = useState<string>("");
  const [discountSuccess, setDiscountSuccess] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  useEffect(() => {
    const total = cartProduct.reduce(
      (prev, curr) => prev + curr.price * curr.Quantity,
      0,
    );
    setSumPrice(total);
    setDiscount(Math.round((total * discountPercent) / 100));
  }, [cartProduct, discountPercent]);

  const applyDiscount = () => {
    const code = discountInput.trim().toUpperCase();
    if (!code) {
      setDiscountError("کد تخفیف را وارد کنید");
      setDiscountSuccess("");
      return;
    }
    const percent = DISCOUNT_CODES[code];
    if (percent) {
      setDiscountPercent(percent);
      setDiscountSuccess(`کد تخفیف ${percent}٪ اعمال شد`);
      setDiscountError("");
    } else {
      setDiscountError("کد تخفیف نامعتبر است");
      setDiscountSuccess("");
      setDiscountPercent(0);
    }
  };

  const totalItems = cartProduct.reduce((acc, item) => acc + item.Quantity, 0);

  if (cartProduct.length === 0) {
    return (
      <div
        dir="rtl"
        className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4 text-center"
      >
        <div className="w-24 h-24 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12 text-orange-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            سبد خرید شما خالی است
          </h2>
          <p className="text-sm text-gray-400 dark:text-slate-400">
            هیچ محصولی به سبد خرید اضافه نشده است.
          </p>
        </div>
        <Link href="/" passHref>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            بازگشت به فروشگاه
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div dir="rtl" className="flex flex-col dark:text-white px-4 md:px-12 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            سبد خرید
          </h1>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold">
            {PersianNumber(totalItems)}
          </span>
        </div>
        <Link href="/" passHref>
          <button className="flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            ادامه خرید
          </button>
        </Link>
      </div>

      {/* Body */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Cart Items */}
        <div className="flex flex-col gap-3 lg:flex-1 w-full min-w-0">
          <div className="rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50 dark:divide-slate-700">
              {cartProduct.map((item: CartItemType) => (
                <CartItem
                  cartProduct={cartProduct}
                  key={item._id}
                  product={item}
                  dispatch={dispatch}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex flex-col gap-4 lg:w-80 w-full shrink-0">
          {/* Price breakdown */}
          <div className="rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-50 dark:border-slate-700">
              <h2 className="text-sm font-bold text-gray-800 dark:text-white">
                خلاصه سفارش
              </h2>
            </div>

            <div className="p-5 flex flex-col gap-4">
              {/* Discount Code */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500 dark:text-slate-400">
                  کد تخفیف
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountInput}
                    onChange={(e) => setDiscountInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyDiscount()}
                    placeholder="کد تخفیف دارید؟"
                    className="flex-1 min-w-0 border border-gray-200 dark:border-slate-600 bg-transparent px-3 py-2 rounded-lg outline-none focus:border-orange-400 dark:focus:border-orange-400 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-colors"
                  />
                  <button
                    onClick={applyDiscount}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium transition-colors shrink-0"
                  >
                    اعمال
                  </button>
                </div>
                {discountError && (
                  <p className="text-xs text-red-500 mt-0.5">{discountError}</p>
                )}
                {discountSuccess && (
                  <p className="text-xs text-green-500 mt-0.5 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {discountSuccess}
                  </p>
                )}
              </div>

              <hr className="border-gray-100 dark:border-slate-700" />

              {/* Price rows */}
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-slate-400">
                    قیمت کالاها ({PersianNumber(totalItems)} عدد)
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {PersianNumber(sumPrice)} تومان
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-slate-400">
                      تخفیف
                    </span>
                    <span className="font-medium text-green-500">
                      − {PersianNumber(discount)} تومان
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-slate-400">
                    هزینه ارسال
                  </span>
                  <span className="text-green-500 font-medium text-xs">
                    رایگان
                  </span>
                </div>
              </div>

              <hr className="border-gray-100 dark:border-slate-700" />

              {/* Final price */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-800 dark:text-white">
                  قیمت نهایی
                </span>
                <span className="text-lg font-bold text-orange-500">
                  {PersianNumber(sumPrice - discount)} تومان
                </span>
              </div>

              {/* CTA */}
              <button className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white py-3 rounded-xl text-sm font-bold transition-all">
                ادامه فرایند خرید
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm p-4">
            <div className="flex flex-col gap-3">
              {[
                { icon: "🔒", text: "پرداخت امن و مطمئن" },
                { icon: "🚚", text: "ارسال اکسپرس به سراسر کشور" },
                { icon: "↩️", text: "۷ روز ضمانت بازگشت کالا" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-slate-400"
                >
                  <span className="text-base">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cancel */}
          <Link href="/" passHref>
            <button className="w-full border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400 py-2.5 rounded-xl text-sm transition-colors">
              انصراف از خرید
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
