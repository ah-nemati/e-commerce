import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PersianNumber from "../../hooks/PersianNumber";
import { AddToCart, Notify } from "../../Store/Actions";
import { ProductType, State } from "@/types";

const truncate = (text: string, max = 55) =>
  text?.length > max ? text.slice(0, max) + "…" : text;

export const ProductItem: React.FC<{ product: ProductType }> = ({
  product,
}) => {
  const cartItems = useSelector((state: State) => state.cart);
  const dispatch = useDispatch();

  const isInCart = cartItems.some(
    (item: ProductType) => item.id === product.id,
  );
  const rating = product?.rating?.rate ? (product.rating.rate * 5) / 100 : 0;
  const ratingStars = Math.round(rating);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      dispatch(Notify("error", "این کالا قبلاً به سبد خرید اضافه شده!"));
      return;
    }

    dispatch(AddToCart({ ...product, Quantity: 1 }));
    dispatch(Notify("success", "کالا به سبد خرید افزوده شد"));
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-1.5"
    >
      <div className="group flex flex-col bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-orange-200 dark:hover:border-orange-800/50 hover:shadow-lg hover:shadow-orange-50 dark:hover:shadow-orange-900/10 transition-all duration-300 h-full">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 dark:bg-slate-800 overflow-hidden">
          <Image
            src={product?.image?.url?.[0] || "/placeholder.png"}
            alt={product?.title_fa || "product"}
            fill
            className="object-contain p-5 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Colors overlay */}
          {product?.colors?.length > 0 && (
            <div className="absolute bottom-2.5 right-2.5 flex gap-1">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color.id}
                  className="w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
                  style={{ backgroundColor: color.hex_code }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="w-3.5 h-3.5 rounded-full bg-gray-200 dark:bg-slate-600 border-2 border-white dark:border-slate-700 text-[7px] flex items-center justify-center text-gray-500 font-bold">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-4 gap-3">
          {/* Brand */}
          <span className="text-[11px] font-medium text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-md w-fit">
            {product?.data_layer?.brand || "سایر"}
          </span>

          {/* Title */}
          <p className="text-sm text-gray-700 dark:text-slate-200 leading-6 flex-1">
            {truncate(product?.title_fa)}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  viewBox="0 0 20 20"
                  className={`w-3 h-3 ${s <= ratingStars ? "text-amber-400" : "text-gray-200 dark:text-slate-700"}`}
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-slate-400">
              {rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-300 dark:text-slate-600">
              ({product?.rating?.count || 0})
            </span>
          </div>

          {/* Price + Add to cart */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-slate-800">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {product?.price ? PersianNumber(product.price) : "—"}
              </span>
              <span className="text-[10px] text-gray-400 dark:text-slate-500">
                تومان
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isInCart
                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                  : "bg-orange-500 hover:bg-orange-600 active:scale-95 text-white shadow-sm shadow-orange-200 dark:shadow-orange-900/30"
              }`}
            >
              {isInCart ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  در سبد
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  افزودن
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
