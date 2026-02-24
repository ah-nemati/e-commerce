import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PersianNumber from "../../Hooks/PersianNumber";
import { AddToCart, Notify } from "../../Store/Actions";
import { State, CartItem } from "../../Store/types";

// Based on the usage in this component, the product prop has a more detailed structure
// than the Product type in Store/types.ts.
interface ProductProp {
  id: string;
  images: {
    url: string[];
  };
  data_layer: {
    brand: string;
  };
  colors: {
    id: React.Key;
    hex_code: string;
  }[];
  title_fa: string;
  rating: {
    rate: number;
    count: number;
  };
  price: number;
}

interface Props {
  product: ProductProp;
}

export const ProductItem: React.FC<Props> = ({ product }) => {
  const cartProduct = useSelector((state: State) => state.cart);
  const dispatch = useDispatch();

  const whiteSpace = (title: string): string => {
    if (title.length > 50) {
      return title.substring(0, 50) + "...";
    }
    return title;
  };

  const handleAddToCart = (): void => {
    const isAlreadyInCart = cartProduct.some((item: CartItem) => item.id === product.id);

    if (isAlreadyInCart) {
      dispatch(Notify("error", "کالای مورد نظر در سبد خرید موجود است !"));
    } else {
      // The AddToCart action expects a CartItem, but the product prop has a different shape.
      // Casting to 'any' to preserve the original behavior until the Redux store and actions are fully typed.
      dispatch(AddToCart(product as any));
      dispatch(Notify("success", "کالای مورد نظر به سبد خرید افزوده شد"));
    }
  };
  return (
    <>
      <Link
        href={`./product/${product.id}`}
        className="sm:w-1/2 md:w-1/3 lg:w-1/4"
        passHref
        key={product.id}
      >
        <div
          className="flex sm:flex-col gap-8 bg-white cursor-pointer items-center dark:text-white dark:bg-slate-900 shadow-gray-700
                dark:border-slate-700 border p-2 hover:shadow-custom text-gray-800 relative dark:shadow-slate-700 "
        >
          {/* cartImage */}
          <div className="">
            <Image
              src={product.images.url[0]}
              width={300}
              height={300}
              alt="product"
              className="relative"
            />
          </div>
          {/* bodyCart */}
          <div className="flex flex-col gap-4 sm:w-full w-2/3">
            <hr className="sm:block hidden" />
            {/* color */}
            <div className="flex flex-row justify-between">
              <span className="text-gray-300 dark:text-white">
                {product.data_layer.brand}
              </span>
              <div className="flex flex-row">
                {product.colors.map((color) => (
                  <span
                    key={color.id}
                    className="sm:w-8 sm:h-8 w-5 h-5 rounded-full border-2"
                    style={{ backgroundColor: color.hex_code }}
                  ></span>
                ))}
              </div>
            </div>
            {/* titleCart */}
            <div className="text-xs sm:text-sm p-2 h-20 leading-5">
              <span>{whiteSpace(product.title_fa)}</span>
            </div>
            {/* rate */}
            <div className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-yellow-400 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{(product.rating.rate * 5) / 100}</span>
              <span className="mx-2 text-gray-600 dark:text-white text-sm">
                ({product.rating.count} نظر)
              </span>
            </div>
            {/* add to Cart */}
            <div className="flex w-full justify-between text-sm">
              <button
                className="flex justify-center items-center bg-primary text-white rounded p-1 hover:text-primary
                    hover:bg-white hover:border h-6 w-6 border-primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
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
                {PersianNumber(product.price)} تومان
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
