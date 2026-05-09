import { Color } from "@/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Notify } from "../../Store/Actions";

const BRANDS = ["سامسونگ", "ایسوس", "اپل", "شیائومی", "لنوو", "متفرقه"];
const CATEGORIES = ["قطعات کامپیوتر", "گوشی موبایل", "لپ تاپ", "هدفون"];

const initialForm = {
  title: "",
  link: "",
  price: "",
  brand: BRANDS[0],
  category: CATEGORIES[0],
};

type FormErrors = Partial<Record<keyof typeof initialForm | "colors", string>>;

const inputClass =
  "w-full border border-gray-200 dark:border-slate-600 bg-transparent p-3 rounded-lg outline-none focus:border-orange-400 dark:focus:border-orange-400 text-gray-800 dark:text-white transition-colors text-sm placeholder:text-gray-400 dark:placeholder:text-slate-500";

const labelClass =
  "text-sm font-medium text-gray-600 dark:text-slate-300 mb-1.5 block";

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;

const testImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      new URL(url); // basic format check first
    } catch {
      resolve(false);
      return;
    }
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

interface CreateProductProps {
  onBack: () => void;
}

const CreateProduct: React.FC<CreateProductProps> = ({ onBack }) => {
  const dispatch = useDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const colorHexRef = useRef<HTMLInputElement>(null);
  const colorTitleRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState(initialForm);
  const [colors, setColors] = useState<Color[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleChange = (key: keyof typeof initialForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validateForm = async (): Promise<boolean> => {
    const newErrors: FormErrors = {};

    if (form.title.length < 10)
      newErrors.title = "نام محصول حداقل ۱۰ کاراکتر باشد";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "قیمت معتبر وارد کنید";

    if (!form.link) {
      newErrors.link = "لینک تصویر الزامی است";
    } else {
      const isValid = await testImageUrl(form.link);
      if (!isValid) newErrors.link = "لینک تصویر معتبر نیست";
    }

    if (!colors.length) newErrors.colors = "حداقل یک رنگ اضافه کنید";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addColor = (e: React.FormEvent) => {
    e.preventDefault();
    const hex = colorHexRef.current?.value;
    const title = colorTitleRef.current?.value?.trim();

    if (!hex || !title) {
      setErrors((p) => ({ ...p, colors: "فیلدها را کامل کنید" }));
      return;
    }

    if (colors.some((c) => c.hex_code === hex || c.title === title)) {
      setErrors((p) => ({ ...p, colors: "رنگ تکراری است" }));
      return;
    }

    setColors((prev) => [
      ...prev,
      { id: Date.now().toString(), hex_code: hex, title },
    ]);
    setErrors((p) => ({ ...p, colors: undefined }));
    if (colorTitleRef.current) colorTitleRef.current.value = "";
  };

  const removeColor = (id: string) =>
    setColors((prev) => prev.filter((c) => c.id !== id));

  const handleSubmit = async () => {
    setSubmitting(true);
    const isValid = await validateForm();

    if (!isValid) {
      setSubmitting(false);
      return;
    }

    try {
      await axios.post("/api/createProduct", {
        ...form,
        price: Number(form.price),
        color: colors,
      });
      dispatch(Notify("success", "محصول اضافه شد"));
      onBack();
    } catch {
      dispatch(Notify("error", "خطا در ایجاد محصول"));
      setSubmitting(false);
    }
  };

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
          ایجاد محصول جدید
        </h2>
      </div>

      <div className="p-6 flex flex-col gap-5">
        <div>
          <label className={labelClass}>نام محصول</label>
          <input
            ref={titleRef}
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={inputClass}
            placeholder="نام محصول را وارد کنید"
          />
          <FieldError msg={errors.title} />
        </div>

        <div>
          <label className={labelClass}>لینک تصویر</label>
          <input
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
                <option
                  key={b}
                  value={b}
                  className="bg-white text-gray-900 dark:bg-slate-800 dark:text-white"
                >
                  {b}
                </option>
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
                <option
                  key={c}
                  value={c}
                  className="bg-white text-gray-900 dark:bg-slate-800 dark:text-white"
                >
                  {c}
                </option>
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
          <label className={labelClass}>افزودن رنگ</label>
          <form onSubmit={addColor} className="flex items-center gap-2">
            <input
              type="color"
              ref={colorHexRef}
              defaultValue="#3b82f6"
              className="w-10 h-10 rounded cursor-pointer border border-gray-200 dark:border-slate-600 p-0.5 shrink-0"
            />
            <input
              ref={colorTitleRef}
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

          {colors.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {colors.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm text-gray-700 dark:text-slate-300"
                >
                  <span
                    className="w-4 h-4 rounded-full border border-gray-200 dark:border-slate-600 shrink-0"
                    style={{ background: c.hex_code }}
                  />
                  <span>{c.title}</span>
                  <button
                    type="button"
                    onClick={() => removeColor(c.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors mr-1 leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-slate-700">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            {submitting ? "در حال ذخیره..." : "ایجاد محصول"}
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

export default CreateProduct;
