import Image from "next/image";
import { useEffect, useState, FC } from "react";
import { Dispatch } from "redux";
import PersianNumber from "../../hooks/PersianNumber";
import {
  decreaseNumOfProduct,
  increaseNumOfProduct,
  RemoveCart,
} from "../../Store/Actions";
import { ProductType as CartItemType } from "../../types/index";

interface Props {
  product: CartItemType;
  cartProduct: CartItemType[];
  dispatch: Dispatch<any>;
}

export const CartItem: FC<Props> = ({ product, cartProduct, dispatch }) => {
  const [isDisable, setIsDisable] = useState<boolean>(false);

  useEffect(() => {
    setIsDisable(product.Quantity < 2);
  }, [product]);

  const imageUrl = product.image?.url?.[0];

  return (
    <div className="flex items-center gap-3 px-4 py-4 min-w-0">
      {/* Product Image */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700 shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            fill
            sizes="80px"
            alt={product.title_fa ?? "product"}
            className="object-cover"
            priority
            onError={(e) =>
              ((e.target as HTMLImageElement).style.display = "none")
            }
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7 text-gray-300 dark:text-slate-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5M4.5 3h15A2.25 2.25 0 0121.75 5.25v13.5A2.25 2.25 0 0119.5 21H4.5a2.25 2.25 0 01-2.25-2.25V5.25A2.25 2.25 0 014.5 3z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2 leading-snug">
          {product.title_fa}
        </p>

        {/* Color indicator if available */}
        {product.selectedColor && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full border border-gray-200 dark:border-slate-500 shrink-0"
              style={{ background: product.selectedColor.hex_code }}
            />
            <span className="text-xs text-gray-400 dark:text-slate-500">
              {product.selectedColor.title}
            </span>
          </div>
        )}

        <span className="text-sm font-semibold text-orange-500">
          {PersianNumber(product.price)} تومان
        </span>

        {/* Total price for multiple quantities */}
        {product.Quantity > 1 && (
          <span className="text-xs text-gray-400 dark:text-slate-500">
            جمع: {PersianNumber(product.price * product.Quantity)} تومان
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-end gap-3 shrink-0">
        {/* Remove button */}
        <button
          onClick={() => dispatch(RemoveCart(product.id))}
          className="p-1.5 text-gray-300 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="حذف از سبد"
        >
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>

        {/* Quantity controls */}
        <div className="flex items-center gap-1 border border-gray-200 dark:border-slate-600 rounded-lg overflow-hidden">
          <button
            onClick={() =>
              dispatch(increaseNumOfProduct(product.id, cartProduct))
            }
            className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>

          <span className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-800 dark:text-white border-x border-gray-200 dark:border-slate-600">
            {PersianNumber(product.Quantity)}
          </span>

          <button
            onClick={() =>
              dispatch(decreaseNumOfProduct(product.id, cartProduct))
            }
            disabled={isDisable}
            className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
