import axios from "axios";
import { useEffect, useState } from "react";
import { ProductType } from "@/types";
import { useDispatch } from "react-redux";
import { Notify } from "../../Store/Actions";

interface AdminPanelProps {
  onCreateClick: () => void;
  onEditClick: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  onCreateClick,
  onEditClick,
}) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get<{ products: ProductType[] }>("/api/products")
      .then((res) => setProducts(res.data.products ?? []))
      .catch(() => dispatch(Notify("error", "خطا در دریافت محصولات")))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete("/api/deleteProduct", { data: { id } });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      dispatch(Notify("success", "محصول حذف شد"));
    } catch {
      dispatch(Notify("error", "خطا در حذف محصول"));
    }
  };

  return (
    <div className="flex flex-col rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 w-full overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          مدیریت محصولات
        </h2>
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          محصول جدید
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400 dark:text-slate-500">
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
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <span className="text-sm">هیچ محصولی موجود نیست.</span>
        </div>
      ) : (
        <div className="divide-y divide-gray-50 dark:divide-slate-700">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 px-4 sm:px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors min-w-0"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700 shrink-0">
                {product.image?.url?.[0] && (
                  <img
                    src={product.image.url[0]}
                    alt={product.title_fa}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).style.display = "none")
                    }
                  />
                )}
              </div>

              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                  {product.title_fa}
                </p>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5 truncate">
                  {product.data_layer?.brand} · {product.data_layer?.category}
                </p>
              </div>

              <span className="hidden sm:block text-sm font-medium text-orange-500 shrink-0">
                {product.price?.toLocaleString("fa-IR")} تومان
              </span>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onEditClick(product.id)}
                  className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                  title="ویرایش"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="حذف"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
