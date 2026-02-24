import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../components/Tools/CartItem";
import PersianNumber from "../Hooks/PersianNumber";
import { State, CartItem as CartItemType } from "../Store/types";
import { Dispatch } from "redux";
import { Action } from "../Store/types";

const Cart = () => {
  const cartProduct = useSelector((state: State) => state.cart);
  const [sumPrice, setsumPrice] = useState<number>(0);

  useEffect(() => {
    setsumPrice(
      cartProduct.reduce((prev, curr) => prev + curr.price * curr.Quanity, 0)
    );
  }, [cartProduct]);

  const dispatch: Dispatch<Action> = useDispatch();

  return (
    <div className="flex flex-col dark:text-white">
      <div className="flex md:flex-nowrap flex-wrap mt-8 mx-12">
        <div className="flex flex-col md:w-4/6 ml-4 w-full">
          <div className="flex justify-between">
            <span>سبد خرید</span>
            <Link href={"/"} passHref>
              <button className="text-orange-500">بازگشت به خانه</button>
            </Link>
          </div>
        </div>{" "}
        <div className="flex flex-col md:w-2/6 w-full"></div>
      </div>
      <div className="flex md:flex-nowrap flex-wrap my-8 mx-12 gap-4">
        <div className="flex flex-col md:w-4/6 w-full gap-4">
          {cartProduct.length > 0 ? (
            cartProduct.map((item: CartItemType) => (
              <CartItem
                cartProduct={cartProduct}
                key={item.id}
                product={item}
                dispatch={dispatch}
              />
            ))
          ) : (
            <span>سبد خرید شما خالی می باشد.</span>
          )}
        </div>
        <div className="flex flex-col md:text-base text-xs md:w-2/6 gap-4 w-full">
          <div className="flex flex-col gap-4 bg-white dark:border dark:border-slate-700 dark:bg-slate-900 p-4 rounded-md">
            <div className="flex justify-between">
              <span>مجموع قیمت :</span>
              <span className="text-orange-500">
                {sumPrice ? PersianNumber(sumPrice) : "۰"} تومان
              </span>
            </div>
            <div className="flex justify-between items-center flex-wrap">
              <span className=""> کد تخفیف :</span>
              <div className="flex border-2 dark:border-slate-800 rounded-md">
                <input
                  type="text"
                  className="border-none outline-none p-2 dark:bg-slate-800 lg:w-full w-[90%]"
                />
                <button className="bg-orange-500 text-white px-6">تایید</button>
              </div>
            </div>
            <div className="flex justify-between">
              <span> تخفیf :</span>
              <span className="text-gray-800 dark:text-white">
                {PersianNumber(500000)} تومان
              </span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span> قیمت نهایی :</span>
              <span className="text-orange-500">
                {sumPrice ? PersianNumber(sumPrice - 500000) : "۰"} تومان
              </span>
            </div>
          </div>
          <button className="bg-orange-500 text-white py-2 rounded-md">
            ادامه فرایند خرید
          </button>
          <Link
            className="text-orange-500 border-orange-600 border-2 py-2 text-center rounded-md"
            href={"/"}
            passHref
          >
            <button>انصراف از خرید</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
