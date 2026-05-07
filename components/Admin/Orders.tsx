import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, State } from "../../types";
import { CartItem } from "../Tools/CartItem";

const Orders: React.FC = () => {
  const cart = useSelector((state: State) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 w-full min-h-[40vh]">
      <div className="p-6 border-b border-gray-100 dark:border-slate-700">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          سفارش‌های من
        </h2>
        {cart.length > 0 && (
          <p className="text-sm text-gray-400 dark:text-slate-400 mt-1">
            {cart.length} سفارش فعال
          </p>
        )}
      </div>

      <div className="flex flex-col flex-1">
        {cart.length > 0 ? (
          cart.map((item: ProductType) => (
            <CartItem
              cartProduct={cart}
              key={item.id}
              product={item}
              dispatch={dispatch}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 gap-4 py-16 text-gray-400 dark:text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12 opacity-40"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
              />
            </svg>
            <span className="text-sm">هیچ سفارشی موجود نمی‌باشد.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
