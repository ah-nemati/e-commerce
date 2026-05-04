import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PersianNumber from "../../Hooks/PersianNumber";
import { AddToCart, Notify } from "../../Store/Actions";
import { ProductType, State } from "@/types";

interface Props {
  product: ProductType;
}

// 🧠 util بهتر (قابل reuse)
const truncateText = (text: string, max = 50) =>
  text?.length > max ? text.substring(0, max) + "..." : text;

export const ProductItem: React.FC<Props> = ({ product }) => {
  const cartProduct = useSelector((state: State) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // جلوگیری از رفتن به لینک

    const isAlreadyInCart = cartProduct.some(
      (item: ProductType) => item.id === product.id,
    );

    if (isAlreadyInCart) {
      dispatch(Notify("error", "کالای مورد نظر در سبد خرید موجود است !"));
      return;
    }

    dispatch(AddToCart(product));
    dispatch(Notify("success", "کالای مورد نظر به سبد خرید افزوده شد"));
  };

  // 🧠 safe rating calc
  const rating = product?.rating?.rate ? (product.rating.rate * 5) / 100 : 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="sm:w-1/2 md:w-1/3 lg:w-1/4"
    >
      <div className="flex sm:flex-col gap-8 bg-white cursor-pointer items-center dark:text-white dark:bg-slate-900 shadow-gray-700 dark:border-slate-700 border p-2 hover:shadow-custom text-gray-800 relative">
        {/* 🖼 IMAGE */}
        <div className="relative w-[120px] h-[120px] sm:w-full sm:h-[200px]">
          <Image
            src={product?.image?.url?.[0] || "/placeholder.png"}
            alt={product?.title_fa || "product"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>

        {/* 🧾 BODY */}
        <div className="flex flex-col gap-4 sm:w-full w-2/3">
          <hr className="sm:block hidden" />

          {/* 🏷 BRAND + COLORS */}
          <div className="flex flex-row justify-between items-center">
            <span className="text-gray-300 dark:text-white text-xs">
              {product?.data_layer?.brand}
            </span>

            <div className="flex gap-1">
              {product?.colors?.map((color) => (
                <span
                  key={color.id}
                  className="sm:w-6 sm:h-6 w-4 h-4 rounded-full border"
                  style={{ backgroundColor: color.hex_code }}
                />
              ))}
            </div>
          </div>

          {/* 📝 TITLE */}
          <div className="text-xs sm:text-sm p-2 h-20 leading-5">
            <span>{truncateText(product?.title_fa)}</span>
          </div>

          {/* ⭐ RATING */}
          <div className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-yellow-400 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>

            <span>{rating.toFixed(1)}</span>

            <span className="mx-2 text-gray-600 dark:text-white text-sm">
              ({product?.rating?.count || 0} نظر)
            </span>
          </div>

          {/* 🛒 PRICE + ADD TO CART */}
          <div className="flex w-full justify-between text-sm items-center">
            <button
              className="flex justify-center items-center bg-primary text-white rounded p-1 hover:text-primary hover:bg-white hover:border h-6 w-6 border-primary"
              onClick={handleAddToCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>

            <span className="text-gray-600 dark:text-white">
              {product?.price ? PersianNumber(product.price) : "-"} تومان
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
