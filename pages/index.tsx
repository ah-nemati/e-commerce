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
  { label: "پربازدیدترین", value: "visited" },
  { label: "ارزان‌ترین", value: "price_asc" },
  { label: "گران‌ترین", value: "price_desc" },
  { label: "محبوب‌ترین", value: "rating" },
];

const INITIAL_PARAMS: Params = {
  sort: "visited",
  search: "",
  category: "",
  brand: "",
  minPrice: "",
  maxPrice: "",
  page: 1,
  limit: 12,
};

const Home: NextPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [params, setParams] = useState<Params>(INITIAL_PARAMS);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).map(([k, v]) => [k, String(v)]),
        ),
      ).toString();

      const res = await fetch(`/api/products?${query}`);
      const data = await res.json();

      setProducts(data.products || []);
      setHasMore(data.hasMore || false);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const handleSearch = (e: CustomEvent<string>) => {
      setParams((prev) => ({ ...prev, search: e.detail, page: 1 }));
    };
    window.addEventListener("product-search", handleSearch as EventListener);
    return () =>
      window.removeEventListener(
        "product-search",
        handleSearch as EventListener,
      );
  }, []);

  const setSort = (value: string) =>
    setParams((prev) => ({ ...prev, sort: value, page: 1 }));

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="flex gap-5 px-4 md:px-8 py-6 max-w-screen-2xl mx-auto">
        {/* Sidebar Filter */}
        <aside className="xl:flex hidden w-72 shrink-0 h-fit sticky top-24">
          <Filter params={params} setParams={setParams} />
        </aside>

        {/* Main Content */}
        <div className="flex flex-col flex-1 gap-4 min-w-0">
          {/* Sort Bar */}
          <div
            dir="rtl"
            className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 px-5 py-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-orange-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
            <span className="text-xs text-gray-400 dark:text-slate-500 ml-1 shrink-0">
              مرتب‌سازی:
            </span>
            <div className="flex items-center gap-1 flex-wrap">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    params.sort === opt.value
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {total > 0 && !loading && (
              <span className="mr-auto text-xs text-gray-400 dark:text-slate-500 shrink-0">
                {total} محصول
              </span>
            )}
          </div>

          {/* Search result banner */}
          {params.search && (
            <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/30 rounded-xl px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-sm text-orange-700 dark:text-orange-300">
                نتایج جستجو برای: <strong>&laquo;{params.search}&raquo;</strong>
              </span>
              <button
                onClick={() =>
                  setParams((p) => ({ ...p, search: "", page: 1 }))
                }
                className="mr-auto text-xs text-orange-500 hover:text-orange-700 underline underline-offset-2"
              >
                پاک کردن
              </button>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex flex-row flex-wrap -m-1.5">
            {loading ? (
              <ProductLoad />
            ) : products.length > 0 ? (
              products.map((item) => (
                <ProductItem product={item} key={item.id} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center w-full py-24 gap-4 text-gray-400 dark:text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 opacity-30"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <p className="text-base font-medium">محصولی یافت نشد</p>
                <button
                  onClick={() => setParams(INITIAL_PARAMS)}
                  className="text-sm text-orange-500 hover:text-orange-600 underline underline-offset-4"
                >
                  پاک کردن فیلترها
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {!loading && products.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <button
                disabled={params.page === 1}
                onClick={() =>
                  setParams((p) => ({ ...p, page: Math.max(1, p.page - 1) }))
                }
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-orange-300 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
                قبلی
              </button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: Math.min(5, Math.ceil(total / params.limit) || 1) },
                  (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setParams((p) => ({ ...p, page }))}
                        className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                          params.page === page
                            ? "bg-orange-500 text-white shadow-sm"
                            : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-orange-300 hover:text-orange-500"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  },
                )}
              </div>

              <button
                disabled={!hasMore}
                onClick={() => setParams((p) => ({ ...p, page: p.page + 1 }))}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-orange-300 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all"
              >
                بعدی
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
