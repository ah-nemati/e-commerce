import Filter from "@/components/Products/Filter";
import { ProductItem } from "@/components/Products/ProductItem";
import { ProductLoad } from "@/components/Products/ProductLoad";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { ProductType } from "../types";

type Params = {
  sort: string;
  search: string;
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  page: number;
  limit: number;
};

const SORT_OPTIONS = [
  { label: "پربازدید ترین", value: "visited" },
  { label: "ارزان ترین", value: "price_asc" },
  { label: "گران ترین", value: "price_desc" },
  { label: "محبوب ترین", value: "rating" },
];

const Home: NextPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [params, setParams] = useState<Params>({
    sort: "visited",
    search: "",
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
    limit: 10,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const buildQuery = new URLSearchParams({
        sort: params.sort,
        search: params.search,
        category: params.category,
        brand: params.brand,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        page: String(params.page),
        limit: String(params.limit),
      }).toString();

      const res = await fetch(`/api/products?${buildQuery}`);
      const data = await res.json();

      setProducts(data.products || []);
      setHasMore(data.hasMore || false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [params]); // تابع فقط وقتی پارامترها واقعاً تغییر کنند عوض می‌شود[cite: 2]

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const handleSearch = (e: CustomEvent<string>) => {
      setParams((prev) => ({
        ...prev,
        search: e.detail,
        page: 1,
      }));
    };

    window.addEventListener("product-search", handleSearch as EventListener);
    return () => {
      window.removeEventListener(
        "product-search",
        handleSearch as EventListener,
      );
    };
  }, []);

  const getSortClass = (value: string) =>
    params.sort === value
      ? "font-bold text-gray-700 dark:text-white"
      : "font-normal text-gray-500";

  return (
    <div className="bg-gray-100 dark:text-white dark:bg-gray-500">
      <div className="flex justify-center md:p-14 p-2 bg-gray-100 dark:bg-slate-800">
        <div className="xl:flex hidden w-full xl:w-1/4 h-fit xl:sticky xl:top-24">
          <Filter params={params} setParams={setParams} />
        </div>

        <div className="flex flex-col w-full xl:w-3/4 gap-4">
          <div className="flex gap-3 dark:bg-slate-900 text-gray-500 bg-white rounded p-3 items-center">
            <span className="bg-orange-100 dark:bg-slate-700 p-1 rounded">
              <svg
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

            <div className="flex gap-6 mr-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`relative ${getSortClass(opt.value)}`}
                  onClick={() =>
                    setParams((prev) => ({ ...prev, sort: opt.value, page: 1 }))
                  }
                >
                  {opt.label}
                  {params.sort === opt.value && (
                    <span className="bg-orange-600 w-2 h-2 absolute rounded-full -top-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-row custom:flex-col sm:flex-wrap">
            {loading ? (
              <ProductLoad />
            ) : products.length > 0 ? (
              products.map((item) => (
                <ProductItem product={item} key={item.id} />
              ))
            ) : (
              <div className="text-center w-full py-10">محصولی یافت نشد</div>
            )}
          </div>

          <div className="flex gap-2 justify-center mt-4">
            <button
              className="px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded hover:bg-gray-300 disabled:opacity-50"
              disabled={params.page === 1}
              onClick={() =>
                setParams((prev) => ({
                  ...prev,
                  page: Math.max(1, prev.page - 1),
                }))
              }
            >
              قبلی
            </button>
            <span className="px-4 py-2">صفحه {params.page}</span>
            <button
              className="px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded hover:bg-gray-300 disabled:opacity-50"
              disabled={!hasMore}
              onClick={() =>
                setParams((prev) => ({ ...prev, page: prev.page + 1 }))
              }
            >
              بعدی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
