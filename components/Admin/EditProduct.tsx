import { Color, ProductType } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Notify } from "../../Store/Actions";

const BRANDS = [
  "سامسونگ",
  "ایسوس",
  "اپل",
  "شیائومی",
  "لنوو",
  "میشن",
  "مافی",
  "لیتو",
  "تیولف",
  "متفرقه",
];
const CATEGORIES = [
  "قطعات کامپیوتر",
  "گوشی موبایل",
  "لپ تاپ و الترابوک",
  "هدفون و هندزفری",
];

type FormState = {
  title: string;
  link: string;
  price: string;
  brand: string;
  category: string;
};

type FormErrors = Partial<Record<keyof FormState | "colors", string>>;

const inputClass =
  "w-full border border-gray-200 dark:border-slate-600 bg-transparent p-3 rounded-lg outline-none focus:border-orange-400 dark:focus:border-orange-400 text-gray-800 dark:text-white transition-colors text-sm placeholder:text-gray-400 dark:placeholder:text-slate-500";

const labelClass =
  "text-sm font-medium text-gray-600 dark:text-slate-300 mb-1.5 block";

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;

interface EditProductProps {
  productId: string;
  onBack: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ productId, onBack }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState<FormState>({
    title: "",
    link: "",
    price: "",
    brand: BRANDS[0],
    category: CATEGORIES[0],
  });
  const [colors, setColors] = useState<Color[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [colorHex, setColorHex] = useState("#3b82f6");
  const [colorTitle, setColorTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    axios
      .post<{ product: ProductType[] }>("/api/productDetail", {
        id: productId,
      })
      .then((res) => {
        const p = res.data.product[0];
        if (!p) return;
        setForm({
          title: p.title_fa ?? "",
          link: p.image?.url[0] ?? "",
          price: String(p.price ?? ""),
          brand: p.data_layer?.brand ?? BRANDS[0],
          category: p.data_layer?.category ?? CATEGORIES[0],
        });
        setColors(p.colors ?? []);
      })
      .catch(() => dispatch(Notify("error", "خطا در دریافت محصول")))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleChange = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = async (): Promise<boolean> => {
    const newErrors: FormErrors = {};

    if (form.title.length < 10)
      newErrors.title = "نام محصول باید حداقل ۱۰ کاراکتر باشد";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "قیمت معتبر وارد کنید";

    if (!form.link) {
      newErrors.link = "لینک تصویر الزامی است";
    } else {
      try {
        await axios.get(form.link);
      } catch {
        newErrors.link = "لینک تصویر معتبر نیست";
      }
    }

    if (!colors.length) newErrors.colors = "حداقل یک رنگ وجود داشته باشد";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addColor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!colorTitle.trim()) {
      setErrors((p) => ({ ...p, colors: "نام رنگ را وارد کنید" }));
      return;
    }
    if (colors.some((c) => c.hex_code === colorHex || c.title === colorTitle)) {
      setErrors((p) => ({ ...p, colors: "رنگ تکراری است" }));
      return;
    }
    setColors((prev) => [
      ...prev,
      { id: Date.now().toString(), hex_code: colorHex, title: colorTitle },
    ]);
    setColorTitle("");
    setErrors((p) => ({ ...p, colors: undefined }));
  };

  const removeColor = (colorId: string) =>
    setColors((prev) => prev.filter((c) => c.id !== colorId));

  const handleSubmit = async () => {
    setSubmitting(true);
    const isValid = await validate();

    if (!isValid) {
      setSubmitting(false);
      return;
    }

    try {
      const product: Partial<ProductType> = {
        id: productId,
        title_fa: form.title,
        image: { url: [form.link] },
        price: Number(form.price),
        data_layer: { brand: form.brand, category: form.category },
        colors,
      };
      await axios.post("/api/editProduct/", { product });
      dispatch(Notify("success", "تغییرات روی محصول اعمال شد"));
      onBack();
    } catch {
      dispatch(Notify("error", "خطا در ذخیره تغییرات"));
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-64 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 w-full">
      <div className="flex items-center gap-3 p-6 border-b border-gray-100 dark:border-slate-700">
        <button
          onClick={onBack}
          className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          ویرایش محصول
        </h2>
      </div>

      <div className="p-6 flex flex-col gap-5">
        <div>
          <label className={labelClass}>نام محصول</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={inputClass}
            placeholder="نام محصول را وارد کنید"
            autoFocus
          />
          <FieldError msg={errors.title} />
        </div>

        <div>
          <label className={labelClass}>لینک تصویر</label>
          <input
            type="url"
            value={form.link}
            onChange={(e) => handleChange("link", e.target.value)}
            className={inputClass}
            placeholder="https://..."
          />
          <FieldError msg={errors.link} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>برند</label>
            <select
              value={form.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
              className={inputClass}
            >
              {BRANDS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>دسته‌بندی</label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>قیمت (تومان)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className={`${inputClass} w-1/2`}
            placeholder="۰"
          />
          <FieldError msg={errors.price} />
        </div>

        <div>
          <label className={labelClass}>مدیریت رنگ‌ها</label>
          <form onSubmit={addColor} className="flex items-center gap-2">
            <input
              type="color"
              value={colorHex}
              onChange={(e) => setColorHex(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-gray-200 dark:border-slate-600 p-0.5 shrink-0"
            />
            <input
              type="text"
              value={colorTitle}
              onChange={(e) => setColorTitle(e.target.value)}
              placeholder="نام رنگ"
              className={`${inputClass} flex-1`}
            />
            <button
              type="submit"
              className="px-4 h-10 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors shrink-0"
            >
              افزودن
            </button>
          </form>
          <FieldError msg={errors.colors} />

          <div className="flex flex-wrap gap-2 mt-3">
            {colors.length > 0 ? (
              colors.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm text-gray-700 dark:text-slate-300"
                >
                  <span
                    className="w-4 h-4 rounded-full border border-gray-200 dark:border-slate-500 shrink-0"
                    style={{ background: c.hex_code }}
                  />
                  <span>{c.title}</span>
                  <button
                    type="button"
                    onClick={() => removeColor(c.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors mr-1 text-base leading-none"
                  >
                    ×
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 dark:text-slate-500">
                رنگی اضافه نشده است.
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-slate-700">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            {submitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
          <button
            onClick={onBack}
            className="flex-1 sm:flex-none border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 px-8 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
