import React, { useEffect, useState } from "react";
import { ProductItem } from "./ProductItem";
import Filter from "./Filter";
import { ProductLoad } from "./ProductLoad";
import { useSelector } from "react-redux";
import { ProductType, State } from "../../types/index";

interface Props {
  product: ProductType[];
}

export const Products: React.FC<Props> = ({ product }) => {
  const [mostvisited, setmostvisited] = useState<boolean>(true);
  const [cheapest, setcheapest] = useState<boolean>(false);
  const [mostexpensive, setmostexpensive] = useState<boolean>(false);
  const [mostpopular, setmostpopular] = useState<boolean>(false);
  const [productItem, setproductItem] = useState<ProductType[]>([]);
  const { theme } = useSelector((state: State) => state);

  useEffect(() => {
    if (mostexpensive) {
      return setproductItem(
        product ? [...product].sort((a, b) => b.price - a.price) : []
      );
    }

    if (mostvisited) {
      return setproductItem(
        product
          ? [...product].sort((a: ProductType, b: ProductType) => b.rating.count - a.rating.count)
          : []
      );
    }

    if (cheapest) {
      return setproductItem(
        product ? [...product].sort((a, b) => a.price - b.price) : []
      );
    }

    if (mostpopular) {
      return setproductItem(
        product
          ? [...product].sort((a: ProductType, b: ProductType) => b.rating.rate - a.rating.rate)
          : []
      );
    }
  }, [mostexpensive, mostpopular, mostvisited, cheapest, product]);

  return (
    <div className="flex justify-center md:p-14 p-2 bg-gray-100 dark:bg-slate-800">
      <div className="xl:flex hidden w-full xl:w-1/4 h-fit xl:sticky xl:top-24">
        <Filter />
      </div>
      <div className="flex flex-col w-full xl:w-3/4 gap-4">
        <div className="flex gap-3 dark:bg-slate-900 dark:text-white text-gray-500 bg-white rounded p-3 items-center">
          <span className="bg-orange-100 dark:bg-slate-700 p-1 rounded ">
            <svg
              direction={"rtl"}
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 stroke-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
          </span>
          <div className="flex gap-6 mr-2 text-gray-500">
            <button
              className="relative"
              style={{
                color: mostvisited
                  ? theme === "dark"
                    ? "white"
                    : "#374151"
                  : "rgb(107,114,128)",
                fontWeight: mostvisited ? "bold" : "normal",
              }}
              onClick={() => {
                setcheapest(false);
                setmostexpensive(false);
                setmostpopular(false);
                setmostvisited(true);
              }}
            >
              پربازدید ترین
              {mostvisited ? (
                <span className="bg-orange-600 w-2 h-2 absolute rounded-full -top-1"></span>
              ) : (
                ""
              )}
            </button>
            <button
              className="relative "
              style={{
                color: cheapest
                  ? theme === "dark"
                    ? "white"
                    : "#374151"
                  : "rgb(107,114,128)",
                fontWeight: cheapest ? "bold" : "normal",
              }}
              onClick={() => {
                setcheapest(true);
                setmostexpensive(false);
                setmostpopular(false);
                setmostvisited(false);
              }}
            >
              ارزان ترین
              {cheapest ? (
                <span className="bg-orange-600 w-2 h-2 absolute rounded-full -top-1"></span>
              ) : (
                ""
              )}
            </button>
            <button
              className="relative "
              style={{
                color: mostexpensive
                  ? theme === "dark"
                    ? "white"
                    : "#374151"
                  : "rgb(107,114,128)",
                fontWeight: mostexpensive ? "bold" : "normal",
              }}
              onClick={() => {
                setcheapest(false);
                setmostexpensive(true);
                setmostpopular(false);
                setmostvisited(false);
              }}
            >
              گران ترین
              {mostexpensive ? (
                <span className="bg-orange-600 w-2 h-2 absolute rounded-full -top-1"></span>
              ) : (
                ""
              )}
            </button>
            <button
              className="relative "
              style={{
                color: mostpopular
                  ? theme === "dark"
                    ? "white"
                    : "#374151"
                  : "rgb(107,114,128)",
                fontWeight: mostpopular ? "bold" : "normal",
              }}
              onClick={() => {
                setcheapest(false);
                setmostexpensive(false);
                setmostpopular(true);
                setmostvisited(false);
              }}
            >
              محبوب ترین
              {mostpopular ? (
                <span className="bg-orange-600 w-2 h-2 absolute rounded-full -top-1"></span>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-row custom:flex-col sm:flex-wrap">
          {productItem.length > 0 ? (
            productItem.map((item: ProductType) => (
              <ProductItem product={item} key={item._id} />
            ))
          ) : (
            <ProductLoad />
          )}
        </div>
      </div>
    </div>
  );
};
