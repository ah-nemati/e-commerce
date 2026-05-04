import Filter from "@/components/Products/Filter";
import { ProductItem } from "@/components/Products/ProductItem";
import { ProductLoad } from "@/components/Products/ProductLoad";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductType, State } from "../types/index";

const Home: NextPage = () => {
  const { theme } = useSelector((state: State) => state);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({
    sort: "visited",
    search: "",
    page: 1,
    limit: 10,
  });

  const fetchProducts = async () => {
    setLoading(true);

    const query = new URLSearchParams({
      sort: params.sort,
      search: params.search,
      page: String(params.page),
      limit: String(params.limit),
    }).toString();

    try {
      const res = await fetch(`/api/products?${query}`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [params]);

  useEffect(() => {
    const handleSearch = (e: any) => {
      setParams((prev) => ({
        ...prev,
        search: e.detail,
        page: 1,
      }));
    };

    window.addEventListener("product-search", handleSearch);

    return () => {
      window.removeEventListener("product-search", handleSearch);
    };
  }, []);

  return (
    <div className="bg-gray-100 dark:text-white dark:bg-gray-500">
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
                  color:
                    params.sort === "visited"
                      ? theme === "dark"
                        ? "white"
                        : "#374151"
                      : "rgb(107,114,128)",
                  fontWeight: params.sort === "visited" ? "bold" : "normal",
                }}
                onClick={() =>
                  setParams((p) => ({ ...p, sort: "visited", page: 1 }))
                }
              >
                پربازدید ترین
                {params.sort === "visited" && (
                  <span className="bg-orange-600 w-2 h-2 absolute rounded-full -top-1" />
                )}
              </button>

              <button
                className="relative"
                style={{
                  color:
                    params.sort === "price_asc"
                      ? theme === "dark"
                        ? "white"
                        : "#374151"
                      : "rgb(107,114,128)",
                  fontWeight: params.sort === "price_asc" ? "bold" : "normal",
                }}
                onClick={() =>
                  setParams((p) => ({ ...p, sort: "price_asc", page: 1 }))
                }
              >
                ارزان ترین
                {params.sort === "price_asc" && (
                  <span className="bg-orange-600 w-2 h-2 absolute rounded-full -top-1" />
                )}
              </button>

              <button
                className="relative"
                style={{
                  color:
                    params.sort === "price_desc"
                      ? theme === "dark"
                        ? "white"
                        : "#374151"
                      : "rgb(107,114,128)",
                  fontWeight: params.sort === "price_desc" ? "bold" : "normal",
                }}
                onClick={() =>
                  setParams((p) => ({ ...p, sort: "price_desc", page: 1 }))
                }
              >
                گران ترین
                {params.sort === "price_desc" && (
                  <span className="bg-orange-600 w-2 h-2 absolute rounded-full -top-1" />
                )}
              </button>

              <button
                className="relative"
                style={{
                  color:
                    params.sort === "rating"
                      ? theme === "dark"
                        ? "white"
                        : "#374151"
                      : "rgb(107,114,128)",
                  fontWeight: params.sort === "rating" ? "bold" : "normal",
                }}
                onClick={() =>
                  setParams((p) => ({ ...p, sort: "rating", page: 1 }))
                }
              >
                محبوب ترین
                {params.sort === "rating" && (
                  <span className="bg-orange-600 w-2 h-2 absolute rounded-full -top-1" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-row custom:flex-col sm:flex-wrap">
            {loading ? (
              <ProductLoad />
            ) : products.length > 0 ? (
              products.map((item: ProductType) => (
                <ProductItem product={item} key={item.id} />
              ))
            ) : (
              <div className="text-center w-full">محصولی یافت نشد</div>
            )}
          </div>

          <div className="flex gap-2 justify-center mt-4">
            <button
              onClick={() =>
                setParams((p) => ({
                  ...p,
                  page: Math.max(1, p.page - 1),
                }))
              }
            >
              قبلی
            </button>

            <span>صفحه {params.page}</span>

            <button
              onClick={() =>
                setParams((p) => ({
                  ...p,
                  page: p.page + 1,
                }))
              }
            >
              بعدی
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Home;
