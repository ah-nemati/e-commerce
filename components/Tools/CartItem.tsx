import Image from "next/image";
import { useEffect, useState, FC } from "react";
import { Dispatch } from "redux";
import PersianNumber from "../../Hooks/PersianNumber";
import {
  decreaseNumOfProduct,
  increaseNumOfProduct,
  RemoveCart,
} from "../../Store/Actions";

// This interface describes the product object as it is used in this component.
interface CartProduct {
  id: string;
  images: {
    url: string[];
  };
  title_fa: string;
  price: number;
  Quanity: number;
}

interface Props {
  product: CartProduct;
  cartProduct: CartProduct[];
  dispatch: Dispatch<any>;
}

export const CartItem: FC<Props> = ({ product, cartProduct, dispatch }) => {
  const [IsDisable, setIsDisable] = useState<boolean>(false);

  useEffect(() => {
    // The button to decrease the quantity should be disabled if the quantity is 1 or less.
    setIsDisable(product.Quanity < 2);
  }, [product]);

  return (
    <div
      className="flex md:text-base text-xs justify-between dark:bg-slate-900 dark:border-slate-500 dark:border bg-white rounded-md shadow-md p-2"
      key={product.id}
    >
      <div className="flex gap-2">
        <div className="flex flex-col">
          <span className="w-[15vw]">
            <Image
              src={product.images.url[0]}
              width="300"
              height="300"
              alt="product"
              priority
            />
          </span>
        </div>
        <div className="flex flex-col justify-around w-[60vw] sm:w-[25vw] mr-4">
          <span className="break-words">{product.title_fa}</span>
          <span className="text-orange-500 md:text-lg text-xs">
            {PersianNumber(product.price)} تومان{" "}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        {/* delete button */}
        <button
          className="self-end"
          onClick={() => dispatch(RemoveCart(product.id))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-orange-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* count of product */}
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              dispatch(increaseNumOfProduct(product.id, cartProduct));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 bg-gray-100 dark:bg-slate-700 rounded-full"
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
          <span className="border border-orange-500 rounded p-1 outline-none">
            {product.Quanity}
          </span>
          <button
            onClick={() => {
              dispatch(decreaseNumOfProduct(product.id, cartProduct));
            }}
            disabled={IsDisable}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 bg-red-100 dark:bg-slate-700 rounded-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
